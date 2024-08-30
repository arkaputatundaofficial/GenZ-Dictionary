let btnBackToTop = document.getElementById("btn-back-to-top");
// Function to display terms
function displayTerms(terms) {
  const container = document.getElementById("terms-container");
  container.innerHTML = ""; // Clear previous results

  terms.forEach((term) => {
    const termCard = document.createElement("div");
    termCard.className = "term-card";
    // Title -> term.title
    // Definition -> term.definition
    // Origin -> term.origin
    // Examples -> term.example
    // Variations -> term.variations
    const title = document.createElement("h2");
    title.innerText = term.title;

    const definition = document.createElement("p");
    definition.innerHTML = `<strong>Definition:</strong> ${term.definition}`;

    const origin = document.createElement("p");
    origin.className = "origin";
    origin.innerHTML = `<strong>Origin:</strong> ${term.origin}`;

    const example = document.createElement("p");
    example.innerHTML = `<strong>Example:</strong> ${term.example}`;

    const variations = document.createElement("p");
    variations.innerHTML = `<strong>Variations:</strong> ${term.variations}`;

    termCard.appendChild(title);
    termCard.appendChild(definition);
    termCard.appendChild(origin);
    termCard.appendChild(example);
    termCard.appendChild(variations);

    container.appendChild(termCard);
  });
}

// Function to filter terms based on search input
function filterTerms(terms, query) {
  return terms.filter((term) => {
    return (
      term.title.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      term.origin.toLowerCase().includes(query) ||
      term.example.toLowerCase().includes(query) ||
      term.variations.toLowerCase().includes(query)
    );
  });
}

// Fetch the data from an external JSON file
fetch("assets/database.json")
  .then((response) => response.json())
  .then((data) => {
    displayTerms(data); // Display all terms initially

    // Add event listener for search button onClick
    document
      .getElementById("search-clear-button")
      .addEventListener("click", () => {
        if (
          document.getElementById("search-clear-button").innerHTML == "Search"
        ) {
          const query = document
            .getElementById("search-input")
            .value.toLowerCase();
          const filteredTerms = filterTerms(data, query);
          displayTerms(filteredTerms); // Display filtered terms
        } else {
          document.getElementById("search-input").value = "";
          const query = document
            .getElementById("search-input")
            .value.toLowerCase();
          const filteredTerms = filterTerms(data, query);
          displayTerms(filteredTerms); // Display filtered terms
          document.getElementById("search-clear-button").innerHTML = "Search";
        }
      });

    // Add evnt listener for search input field onChange
    document.getElementById("search-input").addEventListener("input", () => {
      if (document.getElementById("search-input").value != "") {
        document.getElementById("search-clear-button").innerHTML = "&#10005;";
      } else {
        document.getElementById("search-clear-button").innerHTML = "Search";
      }
      const query = document.getElementById("search-input").value.toLowerCase();
      const filteredTerms = filterTerms(data, query);
      displayTerms(filteredTerms); // Display filtered terms
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnBackToTop.style.display = "block";
  } else {
    btnBackToTop.style.display = "none";
  }
}
btnBackToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelector(".fa-circle-info").addEventListener("click", () => {
    alert("GenZ Dictionary\n\nDev: Arka Putatunda.");
})