# My to-do list

A small, responsive to-do app built with HTML, CSS, and vanilla JavaScript. Add tasks, check them off, and delete them. Tasks are saved in your browser's local storage and restored when you return. No account, backend, or build step is required.

## Run locally

From this repository, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000` in your browser. Stop the server with Ctrl+C.

## Files

- `index.html`: accessible task form, task list, and status messages.
- `styles.css`: responsive layout, task states, and keyboard focus indicators.
- `script.js`: task interactions, safe text rendering, and local storage persistence.

## Check behavior

Add a task, mark it complete, and reload to verify persistence. Delete it and reload to verify it stays deleted. Blank tasks are rejected. If browser storage is blocked or full, a message explains that changes only last for the current session.

Saved tasks are specific to this browser and site address. Clearing browser storage removes them; there is no cloud sync.
