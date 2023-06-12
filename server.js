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

server.get("/", (request, response) => {
    response.render("index");
});

// Maak een route voor de sign-up pagina
// server.get("/sign-up", function (req, res) {
//     res.render("sign-up");
// });

// Route voor de overview pagina
server.get("/overview", function (req, res) {
    res.render("overview");
});

// definieer de fetchJson functie
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
}

// Start met luisteren
server.listen(server.get("port"), () => {
    console.log(`Application started on http://localhost:${server.get("port")}`);
});
