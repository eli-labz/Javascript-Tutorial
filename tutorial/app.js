const state = {
  course: null,
  lessons: [],
  flatTasks: [],
  selectedLesson: '',
  selectedTask: '',
  selectedFile: '',
  query: '',
  completion: {},
  cache: new Map(),
};

const STORAGE_KEYS = {
  completion: 'js-course-tutorial-completion',
  lastOpened: 'js-course-tutorial-last-opened',
};

const els = {};

document.addEventListener('DOMContentLoaded', bootstrap);

async function bootstrap() {
  bindElements();
  bindEvents();
  restoreState();
  await loadCourse();
}

function bindElements() {
  els.courseTitle = document.getElementById('courseTitle');
  els.courseSummary = document.getElementById('courseSummary');
  els.progressText = document.getElementById('progressText');
  els.progressFill = document.getElementById('progressFill');
  els.currentLessonText = document.getElementById('currentLessonText');
  els.currentTaskText = document.getElementById('currentTaskText');
  els.searchInput = document.getElementById('searchInput');
  els.resetButton = document.getElementById('resetButton');
  els.sidebarContent = document.getElementById('sidebarContent');
  els.welcomePanel = document.getElementById('welcomePanel');
  els.taskPanel = document.getElementById('taskPanel');
  els.breadcrumbs = document.getElementById('breadcrumbs');
  els.taskTitle = document.getElementById('taskTitle');
  els.taskMeta = document.getElementById('taskMeta');
  els.fileTabs = document.getElementById('fileTabs');
  els.fileViewer = document.getElementById('fileViewer');
  els.prevButton = document.getElementById('prevButton');
  els.nextButton = document.getElementById('nextButton');
  els.completeButton = document.getElementById('completeButton');
  els.copyButton = document.getElementById('copyButton');
}

function bindEvents() {
  els.searchInput.addEventListener('input', () => {
    state.query = els.searchInput.value.trim();
    renderSidebar();
  });

  els.resetButton.addEventListener('click', () => {
    state.completion = {};
    persistCompletion();
    renderSidebar();
    renderProgress();
    if (state.selectedLesson && state.selectedTask) {
      renderTaskControls();
    }
  });

  els.prevButton.addEventListener('click', () => navigate(-1));
  els.nextButton.addEventListener('click', () => navigate(1));
  els.completeButton.addEventListener('click', toggleCompletion);
  els.copyButton.addEventListener('click', copyCurrentFile);

  els.sidebarContent.addEventListener('click', (event) => {
    const lessonButton = event.target.closest('[data-lesson]');
    const taskButton = event.target.closest('[data-task]');

    if (taskButton) {
      const lessonName = taskButton.dataset.lesson;
      const taskName = taskButton.dataset.task;
      selectTask(lessonName, taskName);
      return;
    }

    if (lessonButton) {
      const lessonName = lessonButton.dataset.lesson;
      const lesson = state.lessons.find((item) => item.name === lessonName);
      if (!lesson) {
        return;
      }
      const firstTask = visibleTasksForLesson(lesson)[0] || lesson.tasks[0];
      if (firstTask) {
        selectTask(lesson.name, firstTask.name);
      }
    }
  });

  els.fileTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-file]');
    if (!tab) {
      return;
    }
    state.selectedFile = tab.dataset.file;
    renderTaskViewer();
  });
}

function restoreState() {
  try {
    state.completion = JSON.parse(localStorage.getItem(STORAGE_KEYS.completion) || '{}');
  } catch (error) {
    state.completion = {};
  }
}

async function loadCourse() {
  const response = await fetch('/api/course');
  const data = await response.json();

  state.course = data.course;
  state.lessons = data.lessons || [];
  state.flatTasks = flattenTasks(state.lessons);

  els.courseTitle.textContent = state.course?.title || 'JavaScript Course';
  els.courseSummary.textContent = state.course?.summary || 'Interactive tutorial for the JavaScript Course.';

  renderProgress();
  renderSidebar();

  const lastOpened = localStorage.getItem(STORAGE_KEYS.lastOpened);
  const firstTask = lastOpened && state.flatTasks.find((task) => task.key === lastOpened)
    ? state.flatTasks.find((task) => task.key === lastOpened)
    : state.flatTasks[0];

  if (firstTask) {
    await selectTask(firstTask.lessonName, firstTask.taskName);
  } else {
    showWelcome();
  }
}

function flattenTasks(lessons) {
  const flat = [];
  lessons.forEach((lesson, lessonIndex) => {
    (lesson.tasks || []).forEach((task, taskIndex) => {
      flat.push({
        ...task,
        lessonName: lesson.name,
        lessonTitle: lesson.title,
        lessonIndex,
        taskIndex,
        key: keyFor(lesson.name, task.name),
      });
    });
  });
  return flat;
}

function keyFor(lessonName, taskName) {
  return `${lessonName} / ${taskName}`;
}

function isCompleted(task) {
  return Boolean(state.completion[keyFor(task.lessonName, task.taskName)]);
}

function persistCompletion() {
  localStorage.setItem(STORAGE_KEYS.completion, JSON.stringify(state.completion));
}

function renderProgress() {
  const completed = state.flatTasks.filter(isCompleted).length;
  const total = state.flatTasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  els.progressText.textContent = `${completed} / ${total} tasks`;
  els.progressFill.style.width = `${percent}%`;

  const selected = state.flatTasks.find((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  els.currentLessonText.textContent = selected ? selected.lessonTitle : '—';
  els.currentTaskText.textContent = selected ? selected.title : 'Select a task to begin';
}

function visibleTasksForLesson(lesson) {
  const query = state.query.toLowerCase();
  if (!query) {
    return lesson.tasks || [];
  }

  return (lesson.tasks || []).filter((task) => matchesQuery(lesson, task, query));
}

function matchesQuery(lesson, task, query) {
  const haystack = [
    lesson.name,
    lesson.title,
    task.name,
    task.title,
    task.excerpt,
    task.type,
    task.status,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

function renderSidebar() {
  const html = [];
  const query = state.query.toLowerCase();

  state.lessons.forEach((lesson) => {
    const tasks = visibleTasksForLesson(lesson);
    if (!tasks.length) {
      return;
    }

    const completed = tasks.filter((task) => isCompleted({ lessonName: lesson.name, taskName: task.name })).length;
    const total = tasks.length;

    html.push(`
      <section class="lesson">
        <button class="lesson-header" type="button" data-lesson="${escapeHtml(lesson.name)}">
          <span class="lesson-title">
            <strong>${escapeHtml(lesson.title)}</strong>
            <span>${total} task${total === 1 ? '' : 's'}${query ? ' match your search' : ''}</span>
          </span>
          <span class="lesson-badge">${completed}/${total} complete</span>
        </button>
        <ul class="task-list">
          ${tasks.map((task) => renderTaskButton(lesson, task)).join('')}
        </ul>
      </section>
    `);
  });

  els.sidebarContent.innerHTML = html.join('') || '<div class="empty-state">No lessons matched your search.</div>';
  updateSelectionHighlights();
  renderProgress();
}

function renderTaskButton(lesson, task) {
  const active = lesson.name === state.selectedLesson && task.name === state.selectedTask;
  const done = isCompleted({ lessonName: lesson.name, taskName: task.name });

  return `
    <li>
      <button
        class="task-button ${active ? 'active' : ''} ${done ? 'done' : ''}"
        type="button"
        data-lesson="${escapeHtml(lesson.name)}"
        data-task="${escapeHtml(task.name)}"
      >
        <span class="task-name">${escapeHtml(task.title)}</span>
        <span class="task-subline">
          <span class="pill ${escapeHtml(task.type || 'practice')}">${escapeHtml(capitalize(task.type || 'practice'))}</span>
          <span class="pill">${escapeHtml(task.status || 'Unknown')}</span>
        </span>
      </button>
    </li>
  `;
}

function updateSelectionHighlights() {
  document.querySelectorAll('.task-button').forEach((button) => {
    const isSelected = button.dataset.lesson === state.selectedLesson && button.dataset.task === state.selectedTask;
    button.classList.toggle('active', isSelected);
    button.classList.toggle('done', Boolean(state.completion[keyFor(button.dataset.lesson, button.dataset.task)]));
  });
}

async function selectTask(lessonName, taskName) {
  state.selectedLesson = lessonName;
  state.selectedTask = taskName;
  state.selectedFile = '';
  localStorage.setItem(STORAGE_KEYS.lastOpened, keyFor(lessonName, taskName));

  renderProgress();
  renderSidebar();
  showTaskPanel();
  els.fileViewer.innerHTML = '<div class="empty-state">Loading task…</div>';

  const key = keyFor(lessonName, taskName);
  if (!state.cache.has(key)) {
    const response = await fetch(`/api/task?lesson=${encodeURIComponent(lessonName)}&task=${encodeURIComponent(taskName)}`);
    const payload = await response.json();
    state.cache.set(key, payload);
  }

  renderTaskViewer();
}

function showWelcome() {
  els.welcomePanel.classList.remove('hidden');
  els.taskPanel.classList.add('hidden');
}

function showTaskPanel() {
  els.welcomePanel.classList.add('hidden');
  els.taskPanel.classList.remove('hidden');
}

function currentTaskPayload() {
  return state.cache.get(keyFor(state.selectedLesson, state.selectedTask)) || null;
}

function renderTaskViewer() {
  const payload = currentTaskPayload();
  if (!payload) {
    return;
  }

  showTaskPanel();
  els.breadcrumbs.textContent = `${payload.lessonName} / ${payload.taskName}`;
  els.taskTitle.textContent = payload.title || payload.taskName;

  const fileCount = payload.files?.length || 0;
  const chips = [
    `Type: ${capitalize(payload.type || 'practice')}`,
    `Status: ${payload.status || 'Unknown'}`,
    `${fileCount} file${fileCount === 1 ? '' : 's'}`,
    isCurrentTaskCompleted() ? 'Completed' : 'In progress',
  ];
  els.taskMeta.innerHTML = chips.map((chip) => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('');

  renderFileTabs(payload.files || []);
  renderFileContent(payload.files || []);
  renderTaskControls();
}

function renderFileTabs(files) {
  if (!files.length) {
    els.fileTabs.innerHTML = '';
    return;
  }

  if (!state.selectedFile || !files.some((file) => file.relativePath === state.selectedFile)) {
    const preferred = files.find((file) => file.name === 'task.md') || files[0];
    state.selectedFile = preferred ? preferred.relativePath : '';
  }

  els.fileTabs.innerHTML = files
    .map((file) => {
      const active = file.relativePath === state.selectedFile;
      return `<button class="file-tab ${active ? 'active' : ''}" type="button" data-file="${escapeHtml(file.relativePath)}">${escapeHtml(file.relativePath)}</button>`;
    })
    .join('');
}

function renderFileContent(files) {
  if (!files.length) {
    els.fileViewer.innerHTML = '<div class="empty-state">This task does not have any visible files yet.</div>';
    return;
  }

  const file = files.find((item) => item.relativePath === state.selectedFile) || files[0];
  state.selectedFile = file.relativePath;

  const isMarkdown = file.extension === '.md' || file.extension === '.markdown';
  const title = file.relativePath;
  const body = isMarkdown ? renderMarkdown(file.content) : `<pre><code>${escapeHtml(file.content)}</code></pre>`;

  els.fileViewer.innerHTML = `
    <p class="file-path">${escapeHtml(title)}</p>
    ${body}
  `;

  updateFileTabs(files);
}

function updateFileTabs(files) {
  els.fileTabs.querySelectorAll('.file-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.file === state.selectedFile);
  });
}

function renderTaskControls() {
  const currentIndex = state.flatTasks.findIndex((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  els.prevButton.disabled = currentIndex <= 0;
  els.nextButton.disabled = currentIndex < 0 || currentIndex >= state.flatTasks.length - 1;
  els.completeButton.textContent = isCurrentTaskCompleted() ? 'Mark incomplete' : 'Mark complete';
}

function isCurrentTaskCompleted() {
  return Boolean(state.completion[keyFor(state.selectedLesson, state.selectedTask)]);
}

function toggleCompletion() {
  if (!state.selectedLesson || !state.selectedTask) {
    return;
  }

  const key = keyFor(state.selectedLesson, state.selectedTask);
  state.completion[key] = !state.completion[key];
  if (!state.completion[key]) {
    delete state.completion[key];
  }

  persistCompletion();
  renderSidebar();
  renderProgress();
  renderTaskControls();
}

function navigate(step) {
  const currentIndex = state.flatTasks.findIndex((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  const nextTask = state.flatTasks[currentIndex + step];
  if (!nextTask) {
    return;
  }
  selectTask(nextTask.lessonName, nextTask.taskName);
}

async function copyCurrentFile() {
  const payload = currentTaskPayload();
  if (!payload || !payload.files || !payload.files.length) {
    return;
  }

  const file = payload.files.find((item) => item.relativePath === state.selectedFile) || payload.files[0];
  try {
    await navigator.clipboard.writeText(file.content);
    els.copyButton.textContent = 'Copied!';
    window.setTimeout(() => {
      els.copyButton.textContent = 'Copy file';
    }, 1200);
  } catch (error) {
    els.copyButton.textContent = 'Copy failed';
    window.setTimeout(() => {
      els.copyButton.textContent = 'Copy file';
    }, 1200);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function capitalize(value) {
  const text = String(value || '');
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function renderMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let listType = '';
  let listItems = [];
  let codeLines = null;
  let quoteLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }
    blocks.push(`<p>${renderInline(paragraph.join(' ').trim())}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) {
      return;
    }
    const items = listItems.map((item) => `<li>${renderInline(item)}</li>`).join('');
    blocks.push(listType === 'ol' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`);
    listItems = [];
    listType = '';
  };

  const flushQuote = () => {
    if (!quoteLines.length) {
      return;
    }
    blocks.push(`<blockquote>${quoteLines.map((line) => `<p>${renderInline(line)}</p>`).join('')}</blockquote>`);
    quoteLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trimEnd();

    if (codeLines) {
      if (/^```/.test(trimmed)) {
        blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = null;
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (/^```/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      codeLines = [];
      continue;
    }

    if (!trimmed.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInline(headingMatch[2].trim())}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push('<hr />');
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      quoteLines.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== 'ul') {
        flushList();
      }
      listType = 'ul';
      listItems.push(unorderedMatch[1]);
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== 'ol') {
        flushList();
      }
      listType = 'ol';
      listItems.push(orderedMatch[1]);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(trimmed);
  }

  if (codeLines) {
    blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return blocks.join('');
}

function renderInline(text) {
  let output = escapeHtml(text);
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  output = output.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
  return output;
}

