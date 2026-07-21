async function search() {
//hi!
    let query = document.getElementById("searchBox").value;
    let results = document.getElementById("results");

    results.innerHTML = "Searching...";

    let url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
    + encodeURIComponent(query)
    + "&format=json&origin=*";

    try {

        let response = await fetch(url);
        let data = await response.json();

        results.innerHTML = "";

        if (data.query.search.length === 0) {
            results.innerHTML = "No results found.";
            return;
        }

        data.query.search.forEach(item => {

            results.innerHTML += `
                <h2>${item.title}</h2>
                <p>${item.snippet}...</p>
                <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">
                Read more
                </a>
                <hr>
            `;

        });

    } catch(error) {

        console.log(error);
        results.innerHTML = "Error loading search.";

    }
}
