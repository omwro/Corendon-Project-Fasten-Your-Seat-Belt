$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});

var lijstHobbies;
var hobbiesChecked = [];

databaseManager
    .query("SELECT GebruikerID, Hobby FROM hobbies WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
    .done(function (gevonden) {
        for (var i = 0; i < gevonden.length; i++) {
            hobbiesChecked[i] = gevonden[i].Hobby;
            console.log(hobbiesChecked[i]);
        }


        databaseManager
            .query("SELECT hobbynaam FROM hobbylist")
            .done(function (hobbielijst) {
                lijstHobbies = hobbielijst;
                console.log(hobbielijst);
                console.log(hobbiesChecked);

                for (var i = 0; i < hobbielijst.length; i++) {
                    $("#hobbylist").append("<input id='"+hobbielijst[i].hobbynaam+"' class='hobbieCheck' type='checkbox' value='" + hobbielijst[i].hobbynaam + "' >" + hobbielijst[i].hobbynaam + "");
                    console.log(hobbiesChecked.length);
                    for (var j = 0; j < hobbiesChecked.length; j++) {
                        if (hobbiesChecked[j] === hobbielijst[i].hobbynaam) {
                            $("#"+hobbielijst[i].hobbynaam).prop("checked", true);
                        }
                    }
                }
            });
    });

function verwijderReis(){
    document.getElementById("reis").innerHTML = "Verwijderd!";

}
databaseManager
    .query("SELECT g.Voornaam, g.Achternaam, p.Leeftijd, g.Geslacht, p.Woonplaats, p.Bio ,p.Land , p.Privacy FROM profielen as p INNER JOIN gebruikers as g ON g.GebruikerID = ? AND p.GebruikerID = ?", [sessionStorage.getItem('GebruikerID'), sessionStorage.getItem('GebruikerID')])
    .done(function (data) {
        console.log(data);
        var inputs = document.getElementsByClassName("inputs");
        var bio = document.getElementsByClassName("bio");
        var geslacht = document.getElementById("geslacht");
        var privacy = document.getElementById("privacy");
        databaseManager
            .query("SELECT Land, Plaats FROM reizen WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
            .done(function (data2) {
                $("#bestemming").append(data2[0].Plaats, ", ", data2[0].Land);
                /*if(data2.length <= 0){
                    document.getElementById("verwiiderKnop").style.display = "none";
                    document.getElementById("bestemming").innerHTML = "U heeft nog geen reis toegevoegd";

                }*/
            })
            .fail(function (gefaald) {
                console.log(gefaald);
            });

        console.log("data[0].privacy:", data[0].Privacy);
        var nieuwPrivacy;
        if(data[0].Privacy === null){
            nieuwPrivacy = "empty";
        }else {
            nieuwPrivacy = data[0].Privacy;
        }

        console.log("privacy.value:", privacy.value);

        inputs[0].value = data[0].Voornaam;
        inputs[1].value = data[0].Achternaam;
        //inputs[2].value = data[0].Leeftijd ;
        inputs[2].value = data[0].Woonplaats;
        inputs[3].value = data[0].Land;
        // inputs[4].value = data[0].Telefoon;
        geslacht.value = data[0].Geslacht;
        bio[0].value = data[0].Bio;
        privacy.value = nieuwPrivacy;
        console.log(privacy.value);


    })
    .fail(function (reason) {
        console.log(reason);
    });



function update() {
    databaseManager
        .query("DELETE FROM hobbies WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
        .done(function () {
        });
    var geslacht = $("#geslacht option:selected").val();
    var inputs = document.getElementsByClassName("inputs");
    var bio = document.getElementsByClassName("bio");
    var privacy = $("#privacy option:selected").val();


    if (inputs[0].value === "" ||
        inputs[1].value === "" ||
        //inputs[2].value === "" ||
        inputs[2].value === "" ||
        inputs[3].value === "" ||
        //inputs[4].value === "" ||
        geslacht === "Geslacht" ||
        bio[0].value === "" ||
        privacy === "Kies hoe openbaar uw pagina mag zijn..."

    ) {
        document.getElementsByClassName("outer-box error")[0].innerHTML = "U bent wat vergeten! Check of alles is ingevuld en ook geldig is!";
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.border = "2px solid #D81E05";
            bio[0].style.border = "2px solid #D81E05";
            document.getElementById("privacy").style.border = "2px solid #D81E05";
            document.getElementById("geslacht").style.border = "2px solid #D81E05";

            if (inputs[i].value !== "") {
                inputs[i].style.border = "2px solid lightgray";
            }
        }
        if (bio[0].value !== "") {
            bio[0].style.border = "2px solid lightgray";
        }
        if (privacy !== "Kies hoe openbaar uw pagina mag zijn...") {
            document.getElementById("privacy").style.border = "2px solid lightgray";
        }

        if (geslacht !== "Geslacht") {
            document.getElementById("geslacht").style.border = "2px solid lightgray";
        }

    } else {
        databaseManager
            .query("UPDATE profielen AS p, gebruikers AS g SET p.Woonplaats = ?, p.Bio = ?, g.Voornaam = ?,g.Achternaam = ?, g.Geslacht = ? ,p.Privacy = ?, p.Land = ? WHERE p.GebruikerID = ? AND g.GebruikerID = ?;"
                , [inputs[2].value, bio[0].value, inputs[0].value, inputs[1].value, geslacht, privacy, inputs[3].value, sessionStorage.getItem('GebruikerID'), sessionStorage.getItem('GebruikerID')])
            .done(function (data) {
                console.log(data);
                console.log("Succes");
                window.location.href = "profiel.html";
            })
            .fail(function (reason) {
                console.log(reason);
                console.log("Fail");
            });
    }


    for (var i = 0; i < lijstHobbies.length; i++) {
        if (document.getElementsByClassName("hobbieCheck")[i].checked) {
            databaseManager
                .query("INSERT INTO hobbies (GebruikerID, Hobby) VALUES (?,?)", [sessionStorage.getItem("GebruikerID"), document.getElementsByClassName("hobbieCheck")[i].value])
                .done(function (data2) {
                    //console.log(data2)
                });
        } else {
            databaseManager
                .query("DELETE FROM hobbies WHERE Hobby = ? AND GebruikerID = ?", [document.getElementsByClassName("hobbieCheck")[i].value, sessionStorage.getItem("GebruikerID")])
                .done(function (data3) {
                    //console.log(data3)
                });
        }
    }
    if(document.getElementById("reis").innerHTML === "Verwijderd!") {
        databaseManager
            .query("DELETE FROM reizen WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
            .done(function () {
                console.log("verwijderd");
            });
    }

}

databaseManager
    .query("SELECT * FROM reizen WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
    .done(function (gefixed) {
        if(gefixed.length <= 0){
            document.getElementById("verwijderKnop").style.display = "none";
            document.getElementById("bestemming").innerHTML = "U heeft nog geen reis toegevoegd";
        }
    });