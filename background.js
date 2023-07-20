```javascript
let savedPages = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'savePage') {
    handleSavePage(request.data);
  }
});

function handleSavePage(pageData) {
  savedPages[pageData.url] = pageData;
  postToApi(pageData);
  chrome.runtime.sendMessage({message: 'pageSaved', data: pageData});
}

function postToApi(pageData) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(pageData));
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    let storageChange = changes[key];
    if (key === 'savedPages' && namespace === 'local') {
      savedPages = storageChange.newValue;
    }
  }
});

chrome.storage.local.get('savedPages', (result) => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    savedPages = result.savedPages || {};
  }
});
```