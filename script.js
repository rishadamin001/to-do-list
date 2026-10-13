'use strict';

const STORAGE_KEY = 'simple-todo.tasks.v1';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const feedback = document.querySelector('#feedback');
let tasks = [];

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!Array.isArray(saved) || !saved.every(task =>
    task && typeof task.id === 'string' && typeof task.text === 'string' &&
    typeof task.completed === 'boolean')) throw new Error('Invalid saved tasks');
  tasks = saved;
} catch {
  feedback.textContent = 'Saved tasks could not be loaded. You can still use the list.';
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    feedback.textContent = '';
  } catch {
    feedback.textContent = 'Browser storage is unavailable. Changes will last only for this session.';
  }
}

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement('li');
    item.className = `task${task.completed ? ' completed' : ''}`;
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      item.classList.toggle('completed', task.completed);
      save();
      updateCount();
    });
    const text = document.createElement('span');
    text.textContent = task.text;
    label.append(checkbox, text);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete task: ${task.text}`);
    remove.addEventListener('click', () => {
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      save();
      render();
      const nextButton = list.children[Math.min(index, tasks.length - 1)]?.querySelector('button');
      (nextButton || input).focus();
    });
    item.append(label, remove);
    list.append(item);
  }
  document.querySelector('#empty-state').hidden = tasks.length > 0;
  updateCount();
}

function updateCount() {
  const remaining = tasks.filter(task => !task.completed).length;
  document.querySelector('#task-count').textContent = `${remaining} remaining · ${tasks.length} total`;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    feedback.textContent = 'Please enter a task.';
    input.focus();
    return;
  }
  tasks.push({ id: crypto.randomUUID(), text, completed: false });
  save();
  render();
  form.reset();
  input.focus();
});

render();
