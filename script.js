async function search() {

    let query = document.getElementById("searchBox").value;
    let results = document.getElementById("results");

    results.innerHTML = "Searching...";

    let response = await fetch(
        "silly-search.dexterbooth3.workers.dev/?q=" + encodeURIComponent(query)
    );

    let data = await response.json();

    results.innerHTML = "";

    if (data.AbstractText) {

        results.innerHTML = `
            <h2>${data.Heading}</h2>
            <p>${data.AbstractText}</p>
            <a href="${data.AbstractURL}" target="_blank">
            Open result
            </a>
        `;

    } else {

        results.innerHTML = "No results found.";

    }
}
