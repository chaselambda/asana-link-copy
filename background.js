console.log("load background");
// Listen for the keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  console.log("got command", command);
  if (command === "copy-asana-link") {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "copyAsanaLink" });
    });
  }
});
