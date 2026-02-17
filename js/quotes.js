// quotes.js - not a module, runs automatically when loaded

// Path to your text file with quotes (one line per quote)
const QUOTES_FILE = './Quotes.DD';

// Function to load quotes from the file
function loadQuotes() {
  return fetch(QUOTES_FILE)
    .then(response => {
      if (!response.ok) throw new Error('Failed to load quotes file.');
      return response.text();
    })
    .then(text => text.split(/\r?\n/).filter(line => line.trim() !== ''));
}

// Function to select a random line
function getRandomQuote(quotes) {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Function to display the quote on the page
function displayRandomQuote(quote) {
  // Create or reuse an element with id="quote-display"
  let quoteElement = document.getElementById('quote-display');
  if (!quoteElement) {
    quoteElement = document.createElement('div');
    quoteElement.id = 'quote-display';
    quoteElement.style.margin = '1em';
    quoteElement.style.fontStyle = 'italic';
    document.body.appendChild(quoteElement);
  }
  quoteElement.textContent = quote;
}

// Load, pick, and display once the page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes()
    .then(quotes => displayRandomQuote(getRandomQuote(quotes)))
    .catch(err => console.error(err));
});
