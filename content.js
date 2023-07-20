```javascript
// content.js

// Function to capture key points of the page
function capturePageDetails() {
    let pageData = {};
    pageData.url = window.location.href;
    pageData.title = document.title;
    pageData.keyPoints = Array.from(document.querySelectorAll('h1, h2, h3')).map(elem => elem.innerText);
    return pageData;
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'savePage') {
        let pageData = capturePageDetails();
        sendResponse({pageData: pageData});
    }
});
```