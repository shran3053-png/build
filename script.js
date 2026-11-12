const STORAGE_KEY = 'build-board-items';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const doneCount = document.getElementById('done-count');
const progressValue = document.getElementById('progress-value');
const clearCompletedBtn = document.getElementById('clear-completed');
const tip = document.getElementById('tip');

const tips = [
  'Small wins stack up.',
  'Ship one useful thing.',
  'Momentum beats waiting.',
  'Finish the next visible step.',
  'Keep your board light.'
];

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTip() {
  tip.textContent = tips[Math.floor(Math.random() * tips.length)];
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty-state">No tasks yet. Add your first win.</li>';
  } else {
    tasks.forEach((task) => {
      const item = document.createElement('li');
      item.className = `task-item${task.done ? ' done' : ''}`;

      const label = document.createElement('label');
      label.className = 'task-label';

      const checkbox = document.createElement('button');
      checkbox.type = 'button';
      checkbox.className = 'checkbox';
      checkbox.setAttribute('aria-label', task.done ? 'Mark task incomplete' : 'Mark task complete');
      checkbox.addEventListener('click', () => toggleTask(task.id));

      const text = document.createElement('span');
      text.className = 'task-text';
      text.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('aria-label', `Delete task ${task.text}`);
      deleteBtn.addEventListener('click', () => removeTask(task.id));

      label.appendChild(checkbox);
      label.appendChild(text);
      item.appendChild(label);
      item.appendChild(deleteBtn);
      taskList.appendChild(item);
    });
  }

  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  taskCount.textContent = String(total);
  doneCount.textContent = String(completed);
  progressValue.textContent = `${progress}%`;
}

function addTask(text) {
  const cleaned = text.trim();
  if (!cleaned) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text: cleaned,
    done: false
  });

  saveTasks();
  renderTasks();
  renderTip();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, done: !task.done } : task
  ));

  saveTasks();
  renderTasks();
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
  taskForm.reset();
  taskInput.focus();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

renderTasks();
renderTip();
