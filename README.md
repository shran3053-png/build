# Build Board

A lightweight productivity dashboard built as a static web app. It lets you add small tasks, mark them complete, and track momentum throughout the day.

## Features
- Add tasks with a single click
- Mark tasks complete or incomplete
- See total tasks and completed count
- Keeps your board saved in the browser via localStorage
- Clean, responsive layout for desktop and mobile

## Run locally
Open `index.html` directly in a browser, or serve the folder with a simple static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project structure
- `index.html` – app layout
- `style.css` – styling
- `script.js` – task logic and persistence
