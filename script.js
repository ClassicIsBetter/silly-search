async function search() {

    let query = document.getElementById("searchBox").value;
    let results = document.getElementById("results");

    results.innerHTML = "Searching...";

    let response = await fetch(
        "https://silly-search.dexterbooth3.workers.dev/?q=" + encodeURIComponent(query)
    );

    let data = await response.json();

    results.innerHTML = "";

results.innerHTML = `
    <h2>${data.Heading || "No title"}</h2>
    <p>${data.AbstractText || "No description found."}</p>
`;
}
