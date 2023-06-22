// Send button for the form
const btn = document.getElementById("btn");
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

    // Loop over de office-days checkboxes en voeg de geselecteerde waarden toe aan een object
    document.querySelectorAll('input[name="data[office-days]"]:checked').forEach((checkbox) => {
        const valueOffice = checkbox.value;
        if (!selectedValues["office-days"]) {
            selectedValues["office-days"] = [];
        }
        selectedValues["office-days"].push(valueOffice);
    });

    // Loop over de allergy checkboxes en voeg de geselecteerde waarden toe aan hetzelfde object
    document.querySelectorAll('input[name="data[allergy]"]:checked').forEach((checkbox) => {
        const valueAllergy = checkbox.value;
        if (!selectedValues["allergy"]) {
            selectedValues["allergy"] = [];
        }
        selectedValues["allergy"].push(valueAllergy);
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
            window.open("", "_blank");
        });
});
