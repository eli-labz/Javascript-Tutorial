const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'tutorial');
const HOST = '127.0.0.1';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.yaml': 'text/plain; charset=utf-8',
  '.yml': 'text/plain; charset=utf-8',
};

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return '';
  }
}

function exists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function parseScalar(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return match ? match[1].trim() : '';
}

function parseList(text, key) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let inSection = false;

  for (const line of lines) {
    if (!inSection) {
      if (line.trim().startsWith(`${key}:`)) {
        inSection = true;
      }
      continue;
    }

    const itemMatch = line.match(/^\s*-\s+(.*)$/);
    if (itemMatch) {
      items.push(itemMatch[1].trim());
      continue;
    }

    if (items.length > 0 && line.trim() && !/^\s/.test(line)) {
      break;
    }
  }

  return items;
}

function cleanSummary(summaryText) {
  return summaryText
    .replace(/^summary:\s*/m, '')
    .replace(/^["']/, '')
    .replace(/["']$/, '')
    .replace(/\\n/g, ' ')
    .replace(/\\/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCourseInfo() {
  const text = readText(path.join(ROOT, 'course-info.yaml'));
  const title = parseScalar(text, 'title') || 'JavaScript Course';
  const language = parseScalar(text, 'language') || 'English';
  const summary = cleanSummary(text.split(/\r?\n/).slice(3, 11).join(' ')) || 'Interactive tutorial for the JavaScript Course.';
  const sections = parseList(text, 'content');
  return { title, language, summary, sections };
}

function parseLessonInfo(lessonDir) {
  const text = readText(path.join(lessonDir, 'lesson-info.yaml'));
  return {
    tasks: parseList(text, 'content'),
  };
}

function firstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function firstParagraph(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let started = false;
  const result = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (started) {
        break;
      }
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      continue;
    }

    started = true;
    result.push(trimmed);
    if (result.join(' ').length > 220) {
      break;
    }
  }

  return result.join(' ').replace(/\s+/g, ' ').trim();
}

function parseTaskInfo(taskDir) {
  const text = readText(path.join(taskDir, 'task-info.yaml'));
  return {
    type: parseScalar(text, 'type') || 'practice',
    status: parseScalar(text, 'status') || 'Unknown',
  };
}

function collectFiles(dir, baseDir, result = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    return result;
  }

  entries
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath).split(path.sep).join('/');

      if (entry.isDirectory()) {
        collectFiles(fullPath, baseDir, result);
        return;
      }

      if (entry.isFile() && !entry.name.startsWith('.')) {
        if (entry.name === 'task-remote-info.yaml') {
          return;
        }

        result.push({
          name: entry.name,
          relativePath,
          content: readText(fullPath),
          extension: path.extname(entry.name).toLowerCase(),
        });
      }
    });

  return result;
}

function discoverLessons() {
  const course = parseCourseInfo();
  const lessonNames = course.sections.length > 0 ? course.sections : [];
  const lessons = [];

  for (const lessonName of lessonNames) {
    const lessonDir = path.join(ROOT, lessonName);
    const lessonInfoPath = path.join(lessonDir, 'lesson-info.yaml');

    if (!exists(lessonInfoPath)) {
      continue;
    }

    const lessonInfo = parseLessonInfo(lessonDir);
    const tasks = [];

    for (const taskName of lessonInfo.tasks) {
      const taskDir = path.join(lessonDir, taskName);
      const taskMarkdownPath = path.join(taskDir, 'task.md');
      const taskMarkdown = readText(taskMarkdownPath);
      const taskInfo = parseTaskInfo(taskDir);
      const title = firstHeading(taskMarkdown) || taskName;
      const excerpt = firstParagraph(taskMarkdown) || 'Open the task to read the lesson material and supporting files.';
      const hasTask = exists(taskDir);

      tasks.push({
        name: taskName,
        title,
        excerpt,
        type: taskInfo.type,
        status: taskInfo.status,
        path: `${lessonName}/${taskName}`,
        available: hasTask,
      });
    }

    lessons.push({
      name: lessonName,
      title: lessonName,
      taskCount: tasks.length,
      tasks,
    });
  }

  return {
    course,
    lessons,
    totalTasks: lessons.reduce((sum, lesson) => sum + lesson.taskCount, 0),
  };
}

const catalog = discoverLessons();

function safeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function sanitizeRequestedPath(requestPath) {
  const normalized = path.normalize(requestPath).replace(/^\.(?:[\/]|$)/, '');
  const resolved = path.resolve(ROOT, normalized);
  if (!resolved.startsWith(path.resolve(ROOT))) {
    return null;
  }
  return resolved;
}

function serveStatic(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

function getTaskDir(lessonName, taskName) {
  const lessonDir = path.join(ROOT, lessonName);
  const taskDir = path.join(lessonDir, taskName);
  const resolved = path.resolve(taskDir);
  if (!resolved.startsWith(path.resolve(ROOT))) {
    return null;
  }
  if (!exists(taskDir) || !fs.statSync(taskDir).isDirectory()) {
    return null;
  }
  return taskDir;
}

function getTaskPayload(lessonName, taskName) {
  const taskDir = getTaskDir(lessonName, taskName);
  if (!taskDir) {
    return null;
  }

  const taskInfo = parseTaskInfo(taskDir);
  const files = collectFiles(taskDir, taskDir)
    .filter((file) => file.name !== 'task-info.yaml')
    .sort((a, b) => {
      const priority = (fileName) => {
        if (fileName === 'task.md') return 0;
        if (fileName === 'task.js') return 1;
        if (fileName.endsWith('.md')) return 2;
        if (fileName.endsWith('.js')) return 3;
        return 4;
      };
      const diff = priority(a.name) - priority(b.name);
      return diff !== 0 ? diff : a.relativePath.localeCompare(b.relativePath);
    });

  const markdown = files.find((file) => file.name === 'task.md');
  const title = markdown ? firstHeading(markdown.content) || taskName : taskName;

  return {
    lessonName,
    taskName,
    title,
    type: taskInfo.type,
    status: taskInfo.status,
    files,
  };
}

const server = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url, true);
  const pathname = requestUrl.pathname || '/';

  if (pathname === '/api/course') {
    safeJson(res, 200, catalog);
    return;
  }

  if (pathname === '/api/task') {
    const lessonName = requestUrl.query.lesson;
    const taskName = requestUrl.query.task;

    if (!lessonName || !taskName) {
      safeJson(res, 400, { error: 'Missing lesson or task query parameter.' });
      return;
    }

    const payload = getTaskPayload(lessonName, taskName);
    if (!payload) {
      safeJson(res, 404, { error: 'Task not found.' });
      return;
    }

    safeJson(res, 200, payload);
    return;
  }

  const publicPath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : sanitizeRequestedPath(path.join(PUBLIC_DIR, pathname));
  if (publicPath && publicPath.startsWith(PUBLIC_DIR) && exists(publicPath) && fs.statSync(publicPath).isFile()) {
    serveStatic(res, publicPath);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

let activePort = PORT;

function listen(port) {
  activePort = port;
  server.listen(port, HOST, () => {
    console.log(`Interactive tutorial available at http://${HOST}:${port}`);
  });
}

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && !process.env.PORT) {
    const nextPort = activePort + 1;
    console.log(`Port ${activePort} is busy, trying ${nextPort}...`);
    setTimeout(() => listen(nextPort), 0);
    return;
  }

  console.error(error);
  process.exit(1);
});

listen(PORT);

