async function search() {

    let query = document.getElementById("searchBox").value;

    let results = document.getElementById("results");

    results.innerHTML = "Searching...";

    let url = 
    "https://api.duckduckgo.com/?q=" 
    + encodeURIComponent(query)
    + "&format=json";

    try {

        let response = await fetch(url);

        let data = await response.json();

        results.innerHTML = "";

        if(data.AbstractText) {

            results.innerHTML += `
                <h2>${data.Heading}</h2>
                <p>${data.AbstractText}</p>
                <a href="${data.AbstractURL}">
                ${data.AbstractURL}
                </a>
            `;

        } else {

            results.innerHTML = "No results found.";

        }

    } catch(error) {

        results.innerHTML = "Error loading search.";

    }
}
