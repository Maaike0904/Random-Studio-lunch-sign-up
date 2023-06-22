import express from "express";

// de basis url van de api
const url = "https://docs.google.com/spreadsheets/d/1iFTrwoSoFcn8Jwm-MX63H3bw-nFHBzIzYn2Ygz7INYo/edit#gid=722704947";

// maak een nieuwe express app
const server = express();

// Stel het poortnummer in
server.set("port", process.env.PORT || 8000);

// Stel de view engine in
server.set("view engine", "ejs");
server.set("views", "./views");

// Stel de public map in
server.use(express.static("public"));

// Route voor de index pagina
server.get("/", (request, response) => {
    response.render("index");
});

// Route voor de index pagina
server.get("/index", (request, response) => {
    response.render("index");
});

// Route voor de overview pagina
server.get("/overview", function (req, res) {
    res.render("overview");
});

// Route voor de dagplanning
server.get("/day-schedule", function (req, res) {
    res.render("day-schedule");
});

// Route voor de weekplanning
server.get("/week-schedule", function (req, res) {
    res.render("week-schedule");
});

// Route voor de maandplanning
server.get("/month-schedule", function (req, res) {
    res.render("month-schedule");
});

// Route voor de sign up
server.get("/sign-up", function (req, res) {
    res.render("sign-up");
});

// Route voor login
server.get("/login", function (req, res) {
    res.render("login");
});

// Definieer de fetchJson functie
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
}

// Start met luisteren
server.listen(server.get("port"), () => {
    console.log(`Application started on http://localhost:${server.get("port")}`);
});

// POST the data in the Google Spreadsheet
const form = document.getElementById("sheetdb-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("sheetdb-form"));
    const selectedValues = {};

    // Loop over de checkboxen en voeg de geselecteerde waarden toe aan een object
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        const name = checkbox.name;
        const value = checkbox.value;
        if (!selectedValues[name]) {
            selectedValues[name] = [];
        }
        selectedValues[name].push(value);
    });

    // Loop over het object met geselecteerde waarden en voeg ze toe aan de FormData
    for (const name in selectedValues) {
        formData.append(name, selectedValues[name].join(","));
    }

    fetch(form.action, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Verwerk de response van SheetDB hier
            console.log(data);
            window.open("/overview.ejs", "_blank");
        });
});
