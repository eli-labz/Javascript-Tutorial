const state = {
  course: null,
  lessons: [],
  flatTasks: [],
  cache: new Map(),
  completion: {},
  playground: {},
  mode: 'read',
  query: '',
  selectedLesson: '',
  selectedTask: '',
  selectedFile: '',
  quiz: { questions: [], answers: {}, submitted: false, score: null },
};

const STORAGE = {
  completion: 'js-course-tutorial-completion',
  playground: 'js-course-tutorial-playground',
  lastOpened: 'js-course-tutorial-last-opened',
  mode: 'js-course-tutorial-mode',
};

const COMMON_OPTIONS = [
  'function', 'variable', 'object', 'array', 'promise', 'async', 'await', 'callback',
  'closure', 'json', 'regex', 'error', 'number', 'string', 'boolean', 'operator',
  'return', 'setTimeout', 'setInterval', 'console', 'strict mode', 'currying',
  'arrow function', 'module', 'stream'
];

const els = {};
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

document.addEventListener('DOMContentLoaded', init);

async function init() {
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
  els.recommendationsPanel = document.getElementById('recommendationsPanel');
  els.recommendationSummary = document.getElementById('recommendationSummary');
  els.recommendationsList = document.getElementById('recommendationsList');
  els.welcomePanel = document.getElementById('welcomePanel');
  els.taskPanel = document.getElementById('taskPanel');
  els.breadcrumbs = document.getElementById('breadcrumbs');
  els.taskTitle = document.getElementById('taskTitle');
  els.taskMeta = document.getElementById('taskMeta');
  els.modeHint = document.getElementById('modeHint');
  els.modeButtons = Array.from(document.querySelectorAll('[data-mode]'));
  els.studyView = document.getElementById('studyView');
  els.quizView = document.getElementById('quizView');
  els.playgroundView = document.getElementById('playgroundView');
  els.fileTabs = document.getElementById('fileTabs');
  els.fileViewer = document.getElementById('fileViewer');
  els.quizQuestions = document.getElementById('quizQuestions');
  els.quizStatus = document.getElementById('quizStatus');
  els.quizSubmit = document.getElementById('quizSubmit');
  els.quizReset = document.getElementById('quizReset');
  els.playgroundEditor = document.getElementById('playgroundEditor');
  els.playgroundRun = document.getElementById('playgroundRun');
  els.playgroundReset = document.getElementById('playgroundReset');
  els.playgroundOutput = document.getElementById('playgroundOutput');
  els.playgroundHint = document.getElementById('playgroundHint');
  els.prevButton = document.getElementById('prevButton');
  els.nextButton = document.getElementById('nextButton');
  els.completeButton = document.getElementById('completeButton');
  els.copyButton = document.getElementById('copyButton');
}

function bindEvents() {
  els.searchInput.addEventListener('input', () => {
	state.query = els.searchInput.value.trim().toLowerCase();
	renderSidebar();
  });

  els.resetButton.addEventListener('click', () => {
	state.completion = {};
	saveJson(STORAGE.completion, state.completion);
	renderAll();
  });

  els.prevButton.addEventListener('click', () => navigate(-1));
  els.nextButton.addEventListener('click', () => navigate(1));
  els.completeButton.addEventListener('click', toggleCompletion);
  els.copyButton.addEventListener('click', copyCurrentFile);
  els.quizSubmit.addEventListener('click', submitQuiz);
  els.quizReset.addEventListener('click', resetQuiz);
  els.playgroundRun.addEventListener('click', runPlayground);
  els.playgroundReset.addEventListener('click', resetPlayground);

  els.modeButtons.forEach((button) => {
	button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  els.sidebarContent.addEventListener('click', (event) => {
	const taskButton = event.target.closest('[data-task]');
	const lessonButton = event.target.closest('[data-lesson]');

	if (taskButton) {
	  selectTask(taskButton.dataset.lesson, taskButton.dataset.task);
	  return;
	}

	if (lessonButton) {
	  const lesson = state.lessons.find((item) => item.name === lessonButton.dataset.lesson);
	  const task = visibleTasks(lesson)[0] || lesson?.tasks?.[0];
	  if (lesson && task) {
		selectTask(lesson.name, task.name);
	  }
	}
  });

  els.fileTabs.addEventListener('click', (event) => {
	const tab = event.target.closest('[data-file]');
	if (tab) {
	  state.selectedFile = tab.dataset.file;
	  renderReadView();
	}
  });

  els.recommendationsList.addEventListener('click', (event) => {
	const button = event.target.closest('[data-recommendation]');
	if (button) {
	  selectTask(button.dataset.lesson, button.dataset.task);
	}
  });

  els.quizQuestions.addEventListener('change', syncQuizAnswers);
  els.playgroundEditor.addEventListener('input', () => savePlaygroundSource(els.playgroundEditor.value));
}

function restoreState() {
  state.completion = readJson(STORAGE.completion, {});
  state.playground = readJson(STORAGE.playground, {});
  state.mode = localStorage.getItem(STORAGE.mode) || 'read';
}

async function loadCourse() {
  const response = await fetch('/api/course');
  const data = await response.json();
  state.course = data.course;
  state.lessons = data.lessons || [];
  state.flatTasks = flattenTasks(state.lessons);
  els.courseTitle.textContent = state.course?.title || 'JavaScript Course';
  els.courseSummary.textContent = state.course?.summary || '';

  const last = localStorage.getItem(STORAGE.lastOpened);
  const initial = last ? state.flatTasks.find((task) => task.key === last) : state.flatTasks[0];

  renderAll();
  if (initial) {
	await selectTask(initial.lessonName, initial.taskName, { preserveMode: true });
  } else {
	showWelcome();
  }
}

function flattenTasks(lessons) {
  const flat = [];
  lessons.forEach((lesson, lessonIndex) => {
	(lesson.tasks || []).forEach((task, taskIndex) => {
	  flat.push({ ...task, lessonName: lesson.name, lessonTitle: lesson.title, lessonIndex, taskIndex, key: `${lesson.name} / ${task.name}` });
	});
  });
  return flat;
}

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}

function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function currentKey() { return state.selectedLesson && state.selectedTask ? `${state.selectedLesson} / ${state.selectedTask}` : ''; }
function isCompleted(lessonName, taskName) { return Boolean(state.completion[`${lessonName} / ${taskName}`]); }

function renderAll() {
  renderProgress();
  renderSidebar();
  renderRecommendations();
  renderTaskControls();
  if (!state.selectedLesson || !state.selectedTask) showWelcome();
}

function renderProgress() {
  const completed = state.flatTasks.filter((task) => isCompleted(task.lessonName, task.taskName)).length;
  const total = state.flatTasks.length;
  els.progressText.textContent = `${completed} / ${total} tasks`;
  els.progressFill.style.width = total ? `${Math.round((completed / total) * 100)}%` : '0%';

  const current = state.flatTasks.find((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  els.currentLessonText.textContent = current ? current.lessonTitle : '—';
  els.currentTaskText.textContent = current ? current.title : 'Select a task to begin';
}

function visibleTasks(lesson) {
  const q = state.query;
  if (!q) return lesson?.tasks || [];
  return (lesson?.tasks || []).filter((task) => [lesson.name, lesson.title, task.name, task.title, task.excerpt, task.type].join(' ').toLowerCase().includes(q));
}

function renderSidebar() {
  const html = [];
  state.lessons.forEach((lesson) => {
	const tasks = visibleTasks(lesson);
	if (!tasks.length) return;
	const done = tasks.filter((task) => isCompleted(lesson.name, task.name)).length;
	const recommended = isRecommendedLesson(lesson.name);
	html.push(`
	  <section class="lesson ${recommended ? 'lesson-recommended' : ''}">
		<button class="lesson-header" type="button" data-lesson="${escapeHtml(lesson.name)}">
		  <span class="lesson-title"><strong>${escapeHtml(lesson.title)}</strong><span>${tasks.length} task${tasks.length === 1 ? '' : 's'}</span></span>
		  <span class="lesson-badge">${done}/${tasks.length} complete${recommended ? ' · Recommended' : ''}</span>
		</button>
		<ul class="task-list">${tasks.map((task) => renderTaskButton(lesson, task)).join('')}</ul>
	  </section>
	`);
  });
  els.sidebarContent.innerHTML = html.join('') || '<div class="empty-state">No lessons matched your search.</div>';
  syncTaskButtonState();
}

function renderTaskButton(lesson, task) {
  const active = lesson.name === state.selectedLesson && task.name === state.selectedTask;
  const done = isCompleted(lesson.name, task.name);
  return `
	<li>
	  <button class="task-button ${active ? 'active' : ''} ${done ? 'done' : ''}" type="button" data-lesson="${escapeHtml(lesson.name)}" data-task="${escapeHtml(task.name)}">
		<span class="task-name">${escapeHtml(task.title)}</span>
		<span class="task-subline"><span class="pill ${escapeHtml(task.type || 'practice')}">${escapeHtml(capitalize(task.type || 'practice'))}</span><span class="pill">${escapeHtml(task.status || 'Unknown')}</span></span>
	  </button>
	</li>`;
}

function syncTaskButtonState() {
  document.querySelectorAll('.task-button').forEach((button) => {
	button.classList.toggle('active', button.dataset.lesson === state.selectedLesson && button.dataset.task === state.selectedTask);
	button.classList.toggle('done', isCompleted(button.dataset.lesson, button.dataset.task));
  });
}

async function selectTask(lessonName, taskName, options = {}) {
  state.selectedLesson = lessonName;
  state.selectedTask = taskName;
  state.selectedFile = '';
  localStorage.setItem(STORAGE.lastOpened, currentKey());

  const payload = await loadTaskPayload(lessonName, taskName);
  state.quiz = buildQuiz(payload);
  state.mode = options.preserveMode ? state.mode : defaultMode(payload);
  localStorage.setItem(STORAGE.mode, state.mode);

  renderAll();
  showTaskPanel();
  updateModeButtons();
  renderTaskDetails(payload);
  renderMode();
}

async function loadTaskPayload(lessonName, taskName) {
  const key = `${lessonName} / ${taskName}`;
  if (!state.cache.has(key)) {
	const response = await fetch(`/api/task?lesson=${encodeURIComponent(lessonName)}&task=${encodeURIComponent(taskName)}`);
	const payload = await response.json();
	const markdown = (payload.files || []).find((file) => file.name === 'task.md')?.content || '';
	const jsFile = (payload.files || []).find((file) => file.extension === '.js') || null;
	payload.hasPlayground = Boolean(jsFile || firstCodeBlock(markdown));
	payload.playgroundSource = jsFile ? jsFile.content : (firstCodeBlock(markdown) || '');
	state.cache.set(key, payload);
  }
  return state.cache.get(key);
}

function showWelcome() { els.welcomePanel.classList.remove('hidden'); els.taskPanel.classList.add('hidden'); }
function showTaskPanel() { els.welcomePanel.classList.add('hidden'); els.taskPanel.classList.remove('hidden'); }

function renderTaskDetails(payload) {
  els.breadcrumbs.textContent = `${payload.lessonName} / ${payload.taskName}`;
  els.taskTitle.textContent = payload.title || payload.taskName;
  const fileCount = (payload.files || []).length;
  els.taskMeta.innerHTML = [
	`Type: ${capitalize(payload.type || 'practice')}`,
	`Status: ${payload.status || 'Unknown'}`,
	`${fileCount} file${fileCount === 1 ? '' : 's'}`,
	payload.hasPlayground ? 'Runnable example available' : 'No runnable example',
  ].map((chip) => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('');
  els.modeHint.textContent = payload.type === 'theory'
	? 'Theory tasks include a quiz mode. Use Read for the lesson text and Playground for runnable snippets.'
	: 'Use Read to browse files and Playground to run the example code.';
}

function defaultMode(payload) {
  if (payload?.type === 'theory' && state.quiz.questions.length) return 'quiz';
  return 'read';
}

function updateModeButtons() {
  const payload = currentPayload();
  const quizAvailable = payload?.type === 'theory' && state.quiz.questions.length > 0;
  const playgroundAvailable = Boolean(payload?.hasPlayground);
  els.modeButtons.forEach((button) => {
	const mode = button.dataset.mode;
	const available = mode === 'read' || (mode === 'quiz' && quizAvailable) || (mode === 'playground' && playgroundAvailable);
	button.classList.toggle('hidden', !available);
	button.classList.toggle('active', available && state.mode === mode);
	button.disabled = !available;
  });
  if (state.mode === 'quiz' && !quizAvailable) state.mode = 'read';
  if (state.mode === 'playground' && !playgroundAvailable) state.mode = 'read';
}

function setMode(mode) {
  const payload = currentPayload();
  const allowed = mode === 'read' || (mode === 'quiz' && payload?.type === 'theory' && state.quiz.questions.length) || (mode === 'playground' && payload?.hasPlayground);
  if (!allowed) return;
  state.mode = mode;
  localStorage.setItem(STORAGE.mode, mode);
  renderMode();
  updateModeButtons();
}

function renderMode() {
  const payload = currentPayload();
  if (!payload) return;
  els.studyView.classList.toggle('hidden', state.mode !== 'read');
  els.quizView.classList.toggle('hidden', state.mode !== 'quiz');
  els.playgroundView.classList.toggle('hidden', state.mode !== 'playground');
  if (state.mode === 'read') renderReadView(payload);
  if (state.mode === 'quiz') renderQuizView();
  if (state.mode === 'playground') renderPlaygroundView(payload);
}

function currentPayload() {
  return state.cache.get(currentKey()) || null;
}

function renderReadView(payload = currentPayload()) {
  if (!payload) return;
  const files = payload.files || [];
  if (!files.length) {
	els.fileTabs.innerHTML = '';
	els.fileViewer.innerHTML = '<div class="empty-state">No visible files in this task.</div>';
	return;
  }
  if (!state.selectedFile || !files.some((file) => file.relativePath === state.selectedFile)) {
	state.selectedFile = (files.find((file) => file.name === 'task.md') || files[0]).relativePath;
  }
  els.fileTabs.innerHTML = files.map((file) => `<button class="file-tab ${file.relativePath === state.selectedFile ? 'active' : ''}" type="button" data-file="${escapeHtml(file.relativePath)}">${escapeHtml(file.relativePath)}</button>`).join('');
  const file = files.find((item) => item.relativePath === state.selectedFile) || files[0];
  const body = file.extension === '.md' ? renderMarkdown(file.content) : `<pre><code>${escapeHtml(file.content)}</code></pre>`;
  els.fileViewer.innerHTML = `<p class="file-path">${escapeHtml(file.relativePath)}</p>${body}`;
  syncFileTabs();
}

function syncFileTabs() { els.fileTabs.querySelectorAll('.file-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.file === state.selectedFile)); }

function buildQuiz(payload) {
  if (!payload || payload.type !== 'theory') return { questions: [], answers: {}, submitted: false, score: null };
  const markdown = (payload.files || []).find((file) => file.name === 'task.md')?.content || '';
  const title = payload.title || payload.taskName;
  const summary = firstSentence(markdown) || `Study ${title}.`;
  const keywords = extractKeywords(markdown, title);
  const titles = state.flatTasks.map((task) => task.title).filter(Boolean).filter((item) => item !== title);
  const excerpts = state.flatTasks.map((task) => task.excerpt).filter(Boolean).filter((item) => item !== summary);
  return {
	questions: [
	  makeQuestion('q1', 'What is the main topic of this lesson?', title, titles, 'Topic'),
	  keywords.length
		? makeQuestion('q2', 'Which keyword is highlighted in the lesson?', keywords[0], [...keywords.slice(1), ...COMMON_OPTIONS, ...titles], 'Keyword')
		: makeQuestion('q2', 'Which summary best matches this lesson?', summary, excerpts, 'Summary'),
	  makeQuestion('q3', 'Which summary best matches the lesson content?', summary, excerpts, 'Summary'),
	],
	answers: {},
	submitted: false,
	score: null,
  };
}

function makeQuestion(id, prompt, answer, pool, category) {
  return { id, prompt, answer, category, options: buildOptions(answer, pool) };
}

function buildOptions(answer, pool) {
  const options = [answer];
  pool.forEach((item) => {
	if (options.length < 4 && item && item !== answer && !options.includes(item)) options.push(item);
  });
  COMMON_OPTIONS.forEach((item) => {
	if (options.length < 4 && item && item !== answer && !options.includes(item)) options.push(item);
  });
  return shuffleDeterministic(options, answer).slice(0, 4);
}

function shuffleDeterministic(values, seed) {
  const result = values.slice();
  let hash = hashString(seed);
  for (let i = result.length - 1; i > 0; i -= 1) {
	hash = (hash * 1664525 + 1013904223) >>> 0;
	const j = hash % (i + 1);
	[result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function hashString(text) {
  let hash = 0;
  for (const ch of String(text || 'seed')) hash = ((hash << 5) - hash + ch.charCodeAt(0)) >>> 0;
  return hash || 1;
}

function extractKeywords(markdown, title) {
  const set = new Set(tokenize(title));
  String(markdown || '').replace(/```[\s\S]*?```/g, '').split(/\r?\n/).forEach((line) => {
	const code = line.match(/`([^`]+)`/g) || [];
	code.forEach((token) => set.add(token.replace(/`/g, '').trim()));
	const bold = line.match(/\*\*([^*]+)\*\*/g) || [];
	bold.forEach((token) => set.add(token.replace(/\*\*/g, '').trim()));
  });
  return Array.from(set).filter(Boolean).slice(0, 6);
}

function firstSentence(markdown) {
  const text = String(markdown || '').replace(/\r\n/g, '\n').replace(/```[\s\S]*?```/g, ' ');
  const paragraph = text.split(/\n\n+/).map((part) => part.replace(/^#+\s+/gm, '').replace(/\s+/g, ' ').trim()).find((part) => part.length > 20);
  return (paragraph || '').replace(/([.!?]).*$/, '$1').trim() || paragraph || '';
}

function tokenize(text) {
  return String(text || '').toLowerCase().split(/[^a-z0-9+]+/i).filter((word) => word.length >= 3);
}

function renderQuizView() {
  if (!state.quiz.questions.length) {
	els.quizQuestions.innerHTML = '<div class="empty-state">Quiz mode is available for theory tasks only.</div>';
	els.quizStatus.textContent = '';
	return;
  }
  const html = state.quiz.questions.map((question, index) => {
	const selected = state.quiz.answers[question.id] || '';
	const resolved = state.quiz.submitted ? (selected === question.answer ? 'correct' : 'incorrect') : '';
	return `
	  <section class="quiz-card ${resolved}">
		<div class="quiz-card-head"><h3>${index + 1}. ${escapeHtml(question.prompt)}</h3><span class="quiz-answer-pill">${escapeHtml(question.category)}</span></div>
		<div class="quiz-options">${question.options.map((option) => `<label class="quiz-option ${selected === option ? 'checked' : ''}"><input type="radio" name="${escapeHtml(question.id)}" value="${escapeHtml(option)}" ${selected === option ? 'checked' : ''} /><span>${escapeHtml(option)}</span></label>`).join('')}</div>
		<div class="quiz-feedback">${state.quiz.submitted ? quizFeedback(question, selected) : ''}</div>
	  </section>`;
  }).join('');
  els.quizQuestions.innerHTML = html;
  els.quizStatus.textContent = state.quiz.submitted ? `Score: ${state.quiz.score}/${state.quiz.questions.length}` : `${Object.keys(state.quiz.answers).length}/${state.quiz.questions.length} answered`;
}

function quizFeedback(question, selected) {
  if (!selected) return `<span class="feedback neutral">No answer selected. Correct answer: ${escapeHtml(question.answer)}</span>`;
  return selected === question.answer
	? '<span class="feedback correct">Correct!</span>'
	: `<span class="feedback incorrect">Your answer: ${escapeHtml(selected)} · Correct answer: ${escapeHtml(question.answer)}</span>`;
}

function syncQuizAnswers() {
  const answers = {};
  state.quiz.questions.forEach((question) => {
	const checked = els.quizQuestions.querySelector(`input[name="${cssSafe(question.id)}"]:checked`);
	if (checked) answers[question.id] = checked.value;
  });
  state.quiz.answers = answers;
  if (!state.quiz.submitted) {
	els.quizStatus.textContent = `${Object.keys(answers).length}/${state.quiz.questions.length} answered`;
  }
}

function submitQuiz() {
  if (!state.quiz.questions.length) return;
  syncQuizAnswers();
  state.quiz.score = state.quiz.questions.reduce((score, question) => score + (state.quiz.answers[question.id] === question.answer ? 1 : 0), 0);
  state.quiz.submitted = true;
  renderQuizView();
}

function resetQuiz() {
  state.quiz.answers = {};
  state.quiz.submitted = false;
  state.quiz.score = null;
  renderQuizView();
}

function renderPlaygroundView(payload = currentPayload()) {
  if (!payload) return;
  const key = currentKey();
  if (typeof state.playground[key] !== 'string') state.playground[key] = payload.playgroundSource || '';
  els.playgroundEditor.value = state.playground[key];
  els.playgroundHint.textContent = payload.hasPlayground ? 'Edit the runnable example and click Run code.' : 'This task does not include a JS example, but you can still try your own snippets here.';
  els.playgroundOutput.textContent = els.playgroundOutput.dataset.ready === key ? els.playgroundOutput.textContent : 'Run the code to see console output here.';
  els.playgroundOutput.dataset.ready = key;
}

function savePlaygroundSource(source) {
  const key = currentKey();
  if (!key) return;
  state.playground[key] = source;
  saveJson(STORAGE.playground, state.playground);
}

function resetPlayground() {
  const payload = currentPayload();
  if (!payload) return;
  state.playground[currentKey()] = payload.playgroundSource || '';
  saveJson(STORAGE.playground, state.playground);
  els.playgroundEditor.value = state.playground[currentKey()];
  els.playgroundOutput.textContent = 'Run the code to see console output here.';
}

async function runPlayground() {
  const code = els.playgroundEditor.value;
  const lines = [];
  const logger = (level, args) => lines.push({ level, text: args.map(formatValue).join(' ') });
  const consoleProxy = { log: (...args) => logger('log', args), info: (...args) => logger('info', args), warn: (...args) => logger('warn', args), error: (...args) => logger('error', args) };

  try {
	els.playgroundOutput.innerHTML = '<div class="playground-running">Running…</div>';
	const fn = new AsyncFunction('console', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Promise', 'Math', 'Date', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Map', 'Set', 'queueMicrotask', 'fetch', 'alert', `${code}\n`);
	const result = await fn(consoleProxy, setTimeout, clearTimeout, setInterval, clearInterval, Promise, Math, Date, JSON, Array, Object, String, Number, Boolean, RegExp, Map, Set, queueMicrotask, fetch, (message) => logger('log', [message]));
	if (typeof result !== 'undefined') logger('log', ['Result:', result]);
	renderPlaygroundOutput(lines, null);
  } catch (error) {
	renderPlaygroundOutput(lines, error);
  }
}

function renderPlaygroundOutput(lines, error) {
  const html = lines.map((line) => `<div class="console-line ${line.level}">${escapeHtml(line.text)}</div>`);
  if (error) html.push(`<div class="console-line error">${escapeHtml(error.stack || error.message || String(error))}</div>`);
  if (!html.length) html.push('<div class="console-line muted">No output.</div>');
  els.playgroundOutput.innerHTML = html.join('');
}

function renderRecommendations() {
  const recs = computeRecommendations();
  if (!recs.length) {
	els.recommendationSummary.textContent = 'Complete some tasks to generate a recommendation.';
	els.recommendationsList.innerHTML = '<div class="empty-state">No recommendations yet.</div>';
	els.recommendationsPanel.classList.remove('hidden');
	return;
  }
  const done = state.flatTasks.filter((task) => isCompleted(task.lessonName, task.taskName)).length;
  els.recommendationSummary.textContent = `Based on your progress (${done}/${state.flatTasks.length} complete), here are the next best lessons.`;
  els.recommendationsList.innerHTML = recs.map(renderRecommendation).join('');
  els.recommendationsPanel.classList.remove('hidden');
}

function computeRecommendations() {
  const recommendations = [];
  const seen = new Set();
  const currentIndex = state.lessons.findIndex((lesson) => lesson.name === state.selectedLesson);

  const pushLesson = (lesson, badge, reason) => {
	if (!lesson || seen.has(lesson.name)) return;
	const nextTask = (lesson.tasks || []).find((task) => !isCompleted(lesson.name, task.name));
	if (!nextTask) return;
	seen.add(lesson.name);
	const completed = (lesson.tasks || []).filter((task) => isCompleted(lesson.name, task.name)).length;
	recommendations.push({ lessonName: lesson.name, lessonTitle: lesson.title, taskName: nextTask.name, taskTitle: nextTask.title, badge, reason, completed, total: (lesson.tasks || []).length });
  };

  if (currentIndex >= 0) pushLesson(state.lessons[currentIndex], 'Continue now', 'Finish the current lesson before moving on.');
  for (let index = currentIndex + 1; index < state.lessons.length && recommendations.length < 3; index += 1) pushLesson(state.lessons[index], index === currentIndex + 1 ? 'Next lesson' : 'Upcoming', 'This is the next unfinished lesson in course order.');
  for (const lesson of state.lessons) { if (recommendations.length >= 3) break; pushLesson(lesson, 'Review next', 'A useful follow-up lesson to keep momentum.'); }
  return recommendations.slice(0, 3);
}

function renderRecommendation(item) {
  return `
	<button class="recommendation-card" type="button" data-recommendation data-lesson="${escapeHtml(item.lessonName)}" data-task="${escapeHtml(item.taskName)}">
	  <div class="recommendation-card-head"><strong>${escapeHtml(item.lessonTitle)}</strong><span class="recommendation-pill">${escapeHtml(item.badge)}</span></div>
	  <p>${escapeHtml(item.reason)}</p>
	  <div class="recommendation-foot"><span>${escapeHtml(item.completed)}/${escapeHtml(item.total)} completed</span><span>${escapeHtml(item.taskTitle)}</span></div>
	</button>`;
}

function isRecommendedLesson(name) { return computeRecommendations().some((item) => item.lessonName === name); }

function renderTaskControls() {
  const index = state.flatTasks.findIndex((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  els.prevButton.disabled = index <= 0;
  els.nextButton.disabled = index < 0 || index >= state.flatTasks.length - 1;
  els.completeButton.textContent = isCompleted(state.selectedLesson, state.selectedTask) ? 'Mark incomplete' : 'Mark complete';
}

function toggleCompletion() {
  const key = currentKey();
  if (!key) return;
  state.completion[key] = !state.completion[key];
  if (!state.completion[key]) delete state.completion[key];
  saveJson(STORAGE.completion, state.completion);
  renderAll();
}

function navigate(step) {
  const index = state.flatTasks.findIndex((task) => task.lessonName === state.selectedLesson && task.taskName === state.selectedTask);
  const next = state.flatTasks[index + step];
  if (next) selectTask(next.lessonName, next.taskName);
}

function copyCurrentFile() {
  const payload = currentPayload();
  if (!payload?.files?.length) return;
  const file = payload.files.find((item) => item.relativePath === state.selectedFile) || payload.files[0];
  navigator.clipboard.writeText(file.content).then(() => { els.copyButton.textContent = 'Copied!'; setTimeout(() => { els.copyButton.textContent = 'Copy file'; }, 1200); }).catch(() => {
	els.copyButton.textContent = 'Copy failed';
	setTimeout(() => { els.copyButton.textContent = 'Copy file'; }, 1200);
  });
}

function renderMode() {
  if (state.mode === 'read') renderReadView();
  if (state.mode === 'quiz') renderQuizView();
  if (state.mode === 'playground') renderPlaygroundView();
  els.studyView.classList.toggle('hidden', state.mode !== 'read');
  els.quizView.classList.toggle('hidden', state.mode !== 'quiz');
  els.playgroundView.classList.toggle('hidden', state.mode !== 'playground');
}

function setMode(mode) {
  const payload = currentPayload();
  const allowed = mode === 'read' || (mode === 'quiz' && payload?.type === 'theory' && state.quiz.questions.length) || (mode === 'playground' && payload?.hasPlayground);
  if (!allowed) return;
  state.mode = mode;
  localStorage.setItem(STORAGE.mode, mode);
  updateModeButtons();
  renderMode();
}

function updateModeButtons() {
  const payload = currentPayload();
  const quizAvailable = payload?.type === 'theory' && state.quiz.questions.length > 0;
  const playgroundAvailable = Boolean(payload?.hasPlayground);
  els.modeButtons.forEach((button) => {
	const mode = button.dataset.mode;
	const available = mode === 'read' || (mode === 'quiz' && quizAvailable) || (mode === 'playground' && playgroundAvailable);
	button.classList.toggle('hidden', !available);
	button.disabled = !available;
	button.classList.toggle('active', available && state.mode === mode);
  });
  if (state.mode === 'quiz' && !quizAvailable) state.mode = 'read';
  if (state.mode === 'playground' && !playgroundAvailable) state.mode = 'read';
}

function currentPayload() { return state.cache.get(currentKey()) || null; }

function escapeHtml(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function capitalize(value) { const text = String(value || ''); return text ? text.charAt(0).toUpperCase() + text.slice(1) : text; }
function cssSafe(value) { return String(value).replace(/"/g, '\\"'); }

function renderMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let listType = '';
  let listItems = [];
  let code = null;
  let quote = [];

  const flushParagraph = () => { if (paragraph.length) { blocks.push(`<p>${renderInline(paragraph.join(' ').trim())}</p>`); paragraph = []; } };
  const flushList = () => { if (listItems.length) { blocks.push(listType === 'ol' ? `<ol>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>` : `<ul>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`); listItems = []; listType = ''; } };
  const flushQuote = () => { if (quote.length) { blocks.push(`<blockquote>${quote.map((line) => `<p>${renderInline(line)}</p>`).join('')}</blockquote>`); quote = []; } };

  for (const line of lines) {
	const trimmed = line.trimEnd();
	if (code) {
	  if (/^```/.test(trimmed)) { blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = null; } else { code.push(line); }
	  continue;
	}
	if (/^```/.test(trimmed)) { flushParagraph(); flushList(); flushQuote(); code = []; continue; }
	if (!trimmed.trim()) { flushParagraph(); flushList(); flushQuote(); continue; }
	const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
	if (heading) { flushParagraph(); flushList(); flushQuote(); blocks.push(`<h${heading[1].length}>${renderInline(heading[2].trim())}</h${heading[1].length}>`); continue; }
	if (/^>\s?/.test(trimmed)) { flushParagraph(); flushList(); quote.push(trimmed.replace(/^>\s?/, '')); continue; }
	const unordered = trimmed.match(/^[-*]\s+(.+)$/);
	if (unordered) { flushParagraph(); flushQuote(); if (listType && listType !== 'ul') flushList(); listType = 'ul'; listItems.push(unordered[1]); continue; }
	const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
	if (ordered) { flushParagraph(); flushQuote(); if (listType && listType !== 'ol') flushList(); listType = 'ol'; listItems.push(ordered[1]); continue; }
	paragraph.push(trimmed);
  }
  if (code) blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  flushParagraph(); flushList(); flushQuote();
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

function firstCodeBlock(markdown) { const match = String(markdown || '').match(/```(?:[a-zA-Z]+)?\n([\s\S]*?)```/); return match ? match[1].trim() : ''; }
function formatValue(value) { if (typeof value === 'string') return value; if (typeof value === 'number' || typeof value === 'boolean' || value == null) return String(value); if (value instanceof Error) return value.stack || value.message || String(value); try { return JSON.stringify(value, null, 2); } catch { return String(value); } }
function renderAllAfterSelect() { renderAll(); updateModeButtons(); renderMode(); }

function renderTaskViewer() { renderTaskDetails(currentPayload()); updateModeButtons(); renderMode(); }

function renderTaskDetails(payload) {
  if (!payload) return;
  els.breadcrumbs.textContent = `${payload.lessonName} / ${payload.taskName}`;
  els.taskTitle.textContent = payload.title || payload.taskName;
  const fileCount = (payload.files || []).length;
  els.taskMeta.innerHTML = [
	`Type: ${capitalize(payload.type || 'practice')}`,
	`Status: ${payload.status || 'Unknown'}`,
	`${fileCount} file${fileCount === 1 ? '' : 's'}`,
	payload.hasPlayground ? 'Runnable example available' : 'No runnable example',
  ].map((chip) => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('');
  els.modeHint.textContent = payload.type === 'theory'
	? 'Theory tasks include a quiz mode. Use Read for the lesson text and Playground for runnable snippets.'
	: 'Use Read to browse files and Playground to run the example code.';
}

function renderTaskViewer(payload = currentPayload()) { renderTaskDetails(payload); updateModeButtons(); renderMode(); }

function currentTaskButtonSelected() {
  return Boolean(state.selectedLesson && state.selectedTask);
}

function isRecommendedLesson(name) { return computeRecommendations().some((item) => item.lessonName === name); }

function syncTaskButtonsAfterRender() { syncTaskButtonState(); }

function renderTaskDetailsAndMode(payload) { renderTaskDetails(payload); updateModeButtons(); renderMode(); }


