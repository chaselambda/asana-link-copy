# Asana Link Copier Chrome Extension

A simple Chrome extension that allows you to copy Asana task links in HTML format with a keyboard shortcut.

## Features

- Press `Command+Shift+7` (Mac) or `Ctrl+Shift+7` (Windows/Linux) to copy the current Asana task as an HTML link
- The task name is extracted from the task input field
- The copied HTML link can be pasted into HTML-compatible editors

## Troubleshooting

Make sure you're on an Asana task page. Search for `taskNameElement` in the code to see how the task name is retrieved. This may be brittle.

## License

MIT
