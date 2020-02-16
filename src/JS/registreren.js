$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});


function button() {
    var inputs = document.getElementsByClassName("input");
    var select = document.getElementsByClassName("select");
    var date = document.getElementsByClassName("date");
    var leeftijd;

    var one_day = 1000 * 60 * 60 * 24;
    leeftijd = Math.round((-1 * (date[0].valueAsDate - Date.now()) / one_day) / 365);
    console.log(leeftijd);

    var errorMessage = document.getElementsByClassName("error-message");
    var errorMessageInputs = document.getElementsByClassName("error-message inputs");
    console.log(errorMessage.length);


    if ((inputs[0].value !== "" && isNaN(inputs[0].value)) &&
        (inputs[1].value !== "" && isNaN(inputs[1].value)) &&
        (inputs[2].value !== "" && (inputs[2].value.includes("@") && (inputs[2].value.includes(".nl") || inputs[2].value.includes(".com")))) &&
        inputs[3].value !== "" &&
        inputs[4].value === inputs[3].value && inputs[4].value !== "" &&
        select[0].value !== "Aanhef" &&
        leeftijd >= 18) {

        var x = document.getElementById("content2");
        var y = document.getElementById("finished");
        x.style.display = "none";
        y.style.display = "block";

        var voornaam = document.getElementById("voornaam").value;
        var achternaam = document.getElementById("achternaam").value;
        var email = document.getElementById("email").value;
        var wachtwoord = document.getElementById("wachtwoord").value;
        var aanhef = document.getElementById("aanhef").value;


        databaseManager
            .query("INSERT INTO gebruikers (Voornaam, Achternaam, Email, Wachtwoord, Geslacht, Rechten) VALUES (?, ?, ?, ?, ?, ?)",
                [voornaam, achternaam, email, wachtwoord, aanhef, "User"])
            .done(function (data) {
                console.log(data);
                console.log("Succes");
                databaseManager
                    .query("INSERT INTO profielen (GebruikerID, Leeftijd) VALUES (?, ?) ", [data.insertId, leeftijd])
                    .done(function (data) {
                        console.log(data);
                        console.log("Succes");
                    })
                    .fail(function (reason) {
                        console.log(reason);
                        console.log("Fail");
                    });
            })
            .fail(function (reason) {
                console.log(reason);
                console.log("Fail");
            });
    }
    else {
        errorMessage[0].innerHTML = "U bent wat vergeten!";

        if (!isNaN(inputs[0].value) || inputs[0].value === "") {
            if (inputs[0].value === "") {
                errorMessageInputs[0].innerHTML = "U bent wat vergeten!";
                inputs[0].style.border = "2px solid #D81E05";
            } else if (!isNaN(inputs[0].value)) {
                errorMessageInputs[0].innerHTML = "Geef een geldige voornaam!!";
                inputs[0].style.border = "2px solid #D81E05";
            }
        } else {
            errorMessageInputs[0].innerHTML = "";
            inputs[0].style.border = "2px solid lightgray";
        }
        if (!isNaN(inputs[1].value) || inputs[1].value === "") {
            if (inputs[1].value === "") {
                errorMessageInputs[1].innerHTML = "U bent wat vergeten!";
                inputs[1].style.border = "2px solid #D81E05";
            } else if (!isNaN(inputs[1].value)) {
                errorMessageInputs[1].innerHTML = "Geef een geldige voornaam!!";
                inputs[1].style.border = "2px solid #D81E05";
            }
        } else {
            errorMessageInputs[1].innerHTML = "";
            inputs[1].style.border = "2px solid lightgray";
        }


        if (inputs[2].value === "") {
            errorMessageInputs[2].innerHTML = "U bent wat vergeten!";
            inputs[2].style.border = "2px solid #D81E05";
        }
        else {
            if (!(inputs[2].value.includes("@")) && (!(inputs[2].value.includes(".nl")) || !(inputs[2].value.includes(".com")))) {
                errorMessageInputs[2].innerHTML = "Geef een geldige e-mail!";
                inputs[2].style.border = "2px solid #D81E05";
            }
            else {
                databaseManager
                    .query("SELECT Email FROM gebruikers WHERE Email = ?", inputs[2].value)
                    .done(function (gegevens2) {
                        if (gegevens2.length === 0) {
                            errorMessageInputs[2].innerHTML = "";
                            inputs[2].style.border = "2px solid lightgray";
                        } else {
                            errorMessageInputs[2].innerHTML = "Deze email is al in gebruik!";
                            inputs[2].style.border = "2px solid #D81E05";
                        }
                    });
            }
        }
        if (inputs[3].value !== inputs[4].value || (inputs[3].value === inputs[4].value && inputs[3].value === "")) {
            inputs[3].style.border = "2px solid #D81E05";
            inputs[4].style.border = "2px solid #D81E05";
            errorMessageInputs[3].innerHTML = "U bent wat vergeten!";
            errorMessageInputs[4].innerHTML = "U bent wat vergeten!";
            if (inputs[3].value !== inputs[4].value) {
                errorMessageInputs[4].innerHTML = "Wachtwoord komt niet overeen";
            }
            if (inputs[3].value !== "") {
                errorMessageInputs[3].innerHTML = "";
                inputs[3].style.border = "2px solid lightgray";
            }
        } else {
            inputs[3].style.border = "2px solid lightgray";
            inputs[4].style.border = "2px solid lightgray";
            errorMessageInputs[3].innerHTML = "";
            errorMessageInputs[4].innerHTML = "";
        }
        if (select[0].value !== "Aanhef") {
            select[0].style.border = "2px solid lightgray";
            errorMessage[0].innerHTML = "";
        } else {
            select[0].style.border = "2px solid #D81E05";
        }


        one_day = 1000 * 60 * 60 * 24;
        leeftijd = Math.round((-1 * (date[0].valueAsDate - Date.now()) / one_day) / 365);

        if (date[0].value !== "") {
            if (leeftijd <= 18) {
                date[0].style.border = "2px solid #D81E05";
                errorMessage[3].innerHTML = "Geef een geldige geboortedatum!";
            } else {
                date[0].style.border = "2px solid lightgray";
                errorMessage[3].innerHTML = "";
            }
        } else {
            date[0].style.border = "2px solid #D81E05";
            errorMessage[3].innerHTML = "U bent wat vergeten!";
        }

    }
}