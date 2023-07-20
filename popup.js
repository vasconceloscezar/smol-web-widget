```javascript
let savedPages = {};

document.getElementById('savePageButton').addEventListener('click', savePage);

function savePage() {
  chrome.runtime.sendMessage({type: 'savePage'}, function(response) {
    if (response.success) {
      displayPageList();
    }
  });
}

function displayPageList() {
  chrome.storage.sync.get(['savedPages'], function(result) {
    savedPages = result.savedPages || {};
    let pageList = document.getElementById('pageList');
    pageList.innerHTML = '';
    for (let url in savedPages) {
      let listItem = document.createElement('li');
      listItem.textContent = savedPages[url].title;
      listItem.addEventListener('click', function() {
        displayPageDetails(url);
      });
      pageList.appendChild(listItem);
    }
  });
}

function displayPageDetails(url) {
  let pageDetails = document.getElementById('pageDetails');
  pageDetails.innerHTML = '';
  let title = document.createElement('h2');
  title.textContent = savedPages[url].title;
  pageDetails.appendChild(title);
  let keyPoints = document.createElement('ul');
  for (let point of savedPages[url].keyPoints) {
    let listItem = document.createElement('li');
    listItem.textContent = point;
    keyPoints.appendChild(listItem);
  }
  pageDetails.appendChild(keyPoints);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'pageSaved') {
    displayPageList();
    sendResponse({success: true});
  }
});

window.onload = displayPageList;
```