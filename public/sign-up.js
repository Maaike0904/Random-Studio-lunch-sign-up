const btn = document.getElementsById("btn");
btn.addEventListener("click", (e) => {
    console.log(e);
    btn.classList.toggle("loading");
    btn.innerHTML === "SEND" ? (btn.innerHTML = "LOADING") : (btn.innerHTML = "SEND");
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
            window.open("page2.html", "_blank");
        });
});
