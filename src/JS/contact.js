$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});


var inputs = document.getElementsByClassName("input");
var dropdown = document.getElementsByClassName("dropdown");
var textarea = document.getElementsByTagName("textarea");
var welIngelod = sessionStorage.length > 0;

function verstuur() {
    console.log(inputs[0].value);
    console.log(!(isNaN(inputs[0].value)));
    if(welIngelod){
        for(var k = 0; k < inputs.length ; k++){
            inputs[k].value = "noNeed";
        }
    }

    if (inputs[0].value !== "" &&
        inputs[1].value !== "" &&
        inputs[2].value !== "" &&
        dropdown[0].value !== "niks"&&
        textarea[0].value !== "") {
        document.getElementById("finished").style.display = "block";
        document.getElementById("content2").style.display = "none";
        console.log("Succes");

        if (welIngelod) {

            databaseManager
                .query("SELECT Voornaam, Achternaam, Email FROM gebruikers WHERE GebruikerID = ?",
                    sessionStorage.getItem("GebruikerID"))
                .done(function (gegevens) {
                    console.log("Succes");
                    databaseManager
                        .query("INSERT INTO contact (Voornaam, Achternaam, Email, Onderwerp, Bericht) VALUES(?,?,?,?,?)",
                            [gegevens[0].Voornaam, gegevens[0].Achternaam, gegevens[0].Email, dropdown[0].value, textarea[0].value])
                        .done(function (data) {
                            console.log(data);
                            console.log("Succes");
                        })
                        .fail(function (reason) {
                            console.log(reason);
                            console.log("FOUT");
                        })
                })
                .fail(function (reason) {
                    console.log(reason);
                    console.log("FOUT");
                })
        }
        else {

            databaseManager
                .query("INSERT INTO contact (Voornaam, Achternaam, Email, Onderwerp, Bericht) VALUES(?,?,?,?,?)",
                    [inputs[0].value, inputs[1].value, inputs[2].value, dropdown[0].value, textarea[0].value])
                .done(function (data) {
                    console.log(data);
                    console.log("Succes");
                })
                .fail(function (reason) {
                    console.log(reason);
                    console.log("FOUT");

                })
        }

    }
    else
    {
        console.log("FOUT");
        for (var i = 0; i < inputs.length ; i++) {

            if (inputs[i].value === "") {

                inputs[i].style.border = "2px solid #D81E05";
                document.getElementsByTagName("textarea")[0].style.border = "2px solid #D81E05";
                document.getElementsByClassName("error")[i].innerHTML = "U bent wat vergeten!";
            }
        }
        if(inputs[0].value !== "") {
            if (isNaN(inputs[0].value)) {
                inputs[0].style.border = "2px solid lightgray";
                document.getElementsByClassName("error")[0].innerHTML = "";
            } else {
                inputs[0].style.border = "2px solid #D81E05";
                document.getElementsByClassName("error")[0].innerHTML = "Geef een geldige naam!";
            }
        }

        if(inputs[1].value !== "") {
            if (isNaN(inputs[1].value)) {
                inputs[1].style.border = "2px solid lightgray";
                document.getElementsByClassName("error")[1].innerHTML = "";
            } else {
                inputs[1].style.border = "2px solid #D81E05";
                document.getElementsByClassName("error")[1].innerHTML = "Geef een geldige naam!";
            }
        }
        if(inputs[2].value !== "") {
            if (inputs[2].value.includes("@") && (inputs[2].value.includes(".nl") || inputs[2].value.includes(".com"))) {
                inputs[2].style.border = "2px solid lightgray";
                document.getElementsByClassName("error")[2].innerHTML = "";
            } else {
                inputs[2].style.border = "2px solid #D81E05";
                document.getElementsByClassName("error")[2].innerHTML = "Geef een geldige e-mail!";
            }
        }
        if (document.getElementsByTagName("textarea")[0].value !== "") {
            document.getElementsByTagName("textarea")[0].style.border = "2px solid lightgray";
            document.getElementsByClassName("error")[4].innerHTML = "";

        }else{
            document.getElementsByTagName("textarea")[0].style.border = "2px solid #D81E05";
            document.getElementsByClassName("error")[4].innerHTML = "U bent wat vergeten!";
        }
        if($(".dropdown")[0].value === "niks"){
            document.getElementsByClassName("error")[3].innerHTML = "U bent wat vergeten!";
            document.getElementsByClassName("dropdown")[0].style.border = "2px solid #D81E05";
        }else{
            document.getElementsByClassName("error")[3].innerHTML = "";
            document.getElementsByClassName("dropdown")[0].style.border = "2px solid lightgray";
        }

    }
}

