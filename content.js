// Function to replace occurrences of 'oldString' with 'newString' in a given node
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.nodeValue = node.nodeValue.replace(/Darmanin/g, 'L\'abject Darmanin');
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      replaceText(childNode);
    }
  }
}

// Function to observe changes in the DOM and replace text when necessary
function observeDOMChanges(mutations) {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        replaceText(node);
      });
    }
  });
}

// Create a MutationObserver to observe changes in the entire document
const observer = new MutationObserver(observeDOMChanges);

// Start observing the entire document
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial replacement for existing content on the page
replaceText(document.body);

