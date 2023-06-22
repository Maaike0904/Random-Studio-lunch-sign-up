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

    // Loop over the office-days checkboxes and add the selected values to the object
    document.querySelectorAll('input[name="data[office-days]"]:checked').forEach((checkbox) => {
        const valueOffice = checkbox.value;
        if (!selectedValues["office-days"]) {
            selectedValues["office-days"] = [];
        }
        selectedValues["office-days"].push(valueOffice);
    });

    // Loop over the allergy checkboxes and add the selected values to the object
    document.querySelectorAll('input[name="data[allergy]"]:checked').forEach((checkbox) => {
        const valueAllergy = checkbox.value;
        if (!selectedValues["allergy"]) {
            selectedValues["allergy"] = [];
        }
        selectedValues["allergy"].push(valueAllergy);
    });

    // Loop over the object with selected values and add them to the FormData
    for (const name in selectedValues) {
        formData.append(name, selectedValues[name].join(","));
    }

    fetch(form.action, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Process the response of the SheetDB here
            console.log(data);
            window.open("week-schedule.ejs", "_blank");
        });
});
