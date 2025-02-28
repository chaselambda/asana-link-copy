console.log("content script loaded!");
// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyAsanaLink") {
    copyAsanaLink();
  }
  return true;
});

// Function to copy the Asana link in HTML format
function copyAsanaLink() {
  try {
    // Get the current URL (the link)
    const url = window.location.href;

    // Get the task name from the textarea
    const taskNameElement = document.querySelector(
      'textarea[placeholder="Write a task name" i]'
    );

    if (!taskNameElement) {
      console.error("Task name element not found");
      showNotification("Error: Task name element not found");
      return;
    }

    const taskName = taskNameElement.value.trim();

    if (!taskName) {
      console.error("Task name is empty");
      showNotification("Error: Task name is empty");
      return;
    }

    // Create the HTML link
    const htmlLink = `<a href="${url}">${taskName}</a>`;

    // Copy to clipboard
    copyToClipboard(htmlLink);

    // Show a success notification
    showNotification("Asana link copied to clipboard!");
  } catch (error) {
    console.error("Error copying Asana link:", error);
    showNotification("Error copying Asana link");
  }
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand("copy");

  // Clean up
  document.body.removeChild(textarea);
}

// Function to show a notification
function showNotification(message) {
  // Create a notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "10px 20px";
  notification.style.backgroundColor = "#4CAF50";
  notification.style.color = "white";
  notification.style.borderRadius = "4px";
  notification.style.zIndex = "9999";
  notification.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

  // Add the notification to the page
  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}
