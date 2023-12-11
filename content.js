// Define the replacements array
let replacements = [
  ['Gérald Darmanin', 'L\'abject Gérald Darmanin'],
  ['Darmanin', 'L\'abject Darmanin'],
];

// Function to replace occurrences of specified strings
function replaceText(node, replacements) {
  if (!replacements || !Array.isArray(replacements)) {
    console.error('Replacements array is not properly initialized.');
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    let content = node.nodeValue;

    // Replace each occurrence with placeholders
    const placeholders = [];
    replacements.forEach(([oldString, newString], index) => {
      const placeholder = `__REPLACE_${index}__`;
      placeholders.push(placeholder);
      const regex = new RegExp(`\\b${oldString}\\b`, 'g');
      content = content.replace(regex, placeholder);
    });

    // Replace placeholders with actual replacements
    placeholders.forEach((placeholder, index) => {
      const [oldString, newString] = replacements[index];
      const regex = new RegExp(placeholder, 'g');
      content = content.replace(regex, newString);
    });

    node.nodeValue = content;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      replaceText(childNode, replacements);
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
replaceText(document.body, replacements);
