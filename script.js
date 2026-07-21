const WORKER_URL = "https://silly-search.dexterbooth3.workers.dev/?q=";

const addons = [
    "wikipedia",
    "animal",
    "video game",
    "youtube",
    "youtuber",
    "game",
    "breed",
    "food",
    "history",
    "definition",
    "meaning"
];


async function trySearch(term) {

    try {
        let response = await fetch(
            WORKER_URL + encodeURIComponent(term)
        );

        let data = await response.json();

        if (data.AbstractText) {
            return data;
        }

    } catch (error) {
        console.log(error);
    }

    return null;
}


async function search() {

    let original = document.getElementById("searchBox").value;
    let results = document.getElementById("results");

    results.innerHTML = "Searching...";

    // Try the original search first
    let data = await trySearch(original);


    // If it fails, try adding words
    if (!data) {

        for (let word of addons) {

            let newTerm = original + " " + word;

            results.innerHTML = `
                <p>No results for "<b>${original}</b>"</p>
                <p>Searching instead for "<b>${newTerm}</b>"...</p>
            `;


            data = await trySearch(newTerm);


            if (data) {
                results.innerHTML = `
                    <p>Showing results for:
                    <b>${newTerm}</b></p>
                    
                    <h2>${data.Heading}</h2>
                    <p>${data.AbstractText}</p>
                    
                    <a href="${data.AbstractURL}" target="_blank">
                    Open result
                    </a>
                `;

                return;
            }
        }
    }


    // If original worked
    if (data) {

        results.innerHTML = `
            <h2>${data.Heading}</h2>
            <p>${data.AbstractText}</p>

            <a href="${data.AbstractURL}" target="_blank">
            Open result
            </a>
        `;

    } else {

        results.innerHTML = `
            No results found for:
            <b>${original}</b>
        `;

    }

}
