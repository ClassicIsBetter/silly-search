const WORKER_URL = "https://silly-search.silly-search-api.workers.dev//?q=";

const addons = [
    "wikipedia",
    "animal",
    "video game",
    "youtube",
    "youtuber",
    "game",
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

async function websiteSearch(query) {

    const results = document.getElementById("results");

    try {

        const response = await fetch("websites.json");
        const websites = await response.json();

        const search = query.toLowerCase();

        let matches = websites.filter(site => {

            if (site.name.toLowerCase().includes(search))
                return true;

            return site.keywords.some(keyword =>
                keyword.toLowerCase().includes(search) ||
                search.includes(keyword.toLowerCase())
            );

        });

        if (matches.length === 0) {

            results.innerHTML = `
                <h2>No websites found</h2>
                <p>No websites matched "<b>${query}</b>"</p>
            `;

            return;

        }

        let html = "<h2>Websites</h2>";

        matches.forEach(site => {

            html += `
                <div style="margin-bottom:15px;">
                    <b>${site.name}</b><br>

                    <a href="${site.url}" target="_blank">
                        ${site.url}
                    </a>
                </div>
            `;

        });

        results.innerHTML = html;

    } catch (err) {

        results.innerHTML = "Couldn't load website database.";

    }

}

async function search() {

    const mode = document.getElementById("searchMode").value;

if (mode === "website") {
    websiteSearch(document.getElementById("searchBox").value);
    return;
}

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

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    // Save preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
