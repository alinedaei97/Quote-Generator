const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

function removeLoadingSpinner() {
  quoteContainer.style.visibility = "visible";
  loader.style.visibility = "hidden";
}

//Generate new quotes and Show it
function newQuote() {
  //Pick a random quote from apiQuotes array
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  //Check if author field is blank and replace it with "unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
}

// Get quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
    // getQuotes();
    //Catch Error Here
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event listeaners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

//On load
getQuotes();

//*********************************************************************** */
//Local Quotes
// function newQuote() {
//   let quote = localQoutes[Math.floor(Math.random() * localQoutes.length)];
//   console.log(quote);
// }
// newQuote();
//*********************************************************************** */
