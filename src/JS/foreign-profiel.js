$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});

var gebruikerID = localStorage.getItem('GebruikerID');
var gebruikerIDInlog = sessionStorage.getItem("GebruikerID");

databaseManager
    .query("SELECT Privacy FROM profielen WHERE GebruikerID = ?", gebruikerID)
    .done(function (data) {
        databaseManager
            .query("SELECT GebruikerID, VriendID FROM vrienden WHERE GebruikerID = ? AND VriendID = ? ", [gebruikerIDInlog, gebruikerID])
            .done(function (data2) {
                if (data2.length > 0) {
                    data[0].Privacy = "low";
                    console.log("gelukt");
                }


                switch (data[0].Privacy) {

                    case "high":
                        var content = $("#content");
                        var button = $(".profile-button");
                        document.getElementById("content").innerHTML = "";
                        content.append("<div class='header3 outer-box'>Deze gebruiker wilt zijn of haar gegevens verbogen houden!" +
                            "<p class='zin'>Geintereseerd? Verstuur mij een matching verzoek!</p>" +
                            "</div>");
                        content.append(button);
                        break;

                    case "medium":
                        databaseManager
                            .query("SELECT g.Voornaam, g.Achternaam, p.Leeftijd, p.Woonplaats, p.Land, p.Telefoon, p.Bio, p.Foto FROM gebruikers AS g INNER JOIN profielen AS p ON g.GebruikerID = ? AND p.GebruikerID = ?"
                                , [gebruikerID, gebruikerID])
                            .done(function (data) {
                                console.log(data);
                                console.log("Succes");

                                var gebruikerID = localStorage.getItem('GebruikerID');
                                var naam = document.getElementById("naam");
                                var leeftijd = document.getElementById("leeftijd");
                                var woonplaats = document.getElementById("woonplaats");
                                //var telefoon = document.getElementById("telefoon");
                                //var status = document.getElementById("status");
                                var bio = document.getElementById("bio");
                                var foto = document.getElementById("foreign-profiel-foto");

                                if (data[0].Foto === null) {
                                    foto.setAttribute("src", "https://cateringopmaat.nl/wp-content/uploads/2017/08/blank-profile-picture-973460_1280.png");
                                } else {
                                    foto.setAttribute("src", "../Resources/Klantenfoto/" + data[0].Foto);
                                }

                                naam.innerHTML = data[0].Voornaam + " " + data[0].Achternaam;
                                leeftijd.innerHTML = data[0].Leeftijd;
                                woonplaats.innerHTML = data[0].Woonplaats + ", " + data[0].Land;
                                //telefoon.innerHTML = data[0].Telefoon;
                                //status.innerHTML = data[0].Status;
                                bio.innerHTML = data[0].Bio;
                                databaseManager
                                    .query("SELECT Hobby FROM hobbies WHERE GebruikerID = ?", gebruikerID)
                                    .done(function (data) {
                                        console.log(data);
                                        var hobby = $(".hobbies");
                                        hobby.append("<ul>");
                                        for (var i = 0; i < data.length; i++) {
                                            hobby.append("<li>" + data[i].Hobby + "</li>");
                                        }
                                        hobby.append("</ul>");
                                    });
                            })
                            .fail(function (reason) {
                                console.log(reason);
                                console.log("Fail");
                            });
                        /*document.getElementsByClassName("reisinformatie")[0].innerHTML = "";
                        document.getElementsByClassName("hobbies")[0].innerHTML = "";
                        document.getElementsByClassName("personalinformatie")[0].innerHTML = "";*/
                        break;
                    case "low":
                        databaseManager
                            .query("SELECT g.Voornaam, g.Achternaam, p.Leeftijd, p.Woonplaats, p.Land, p.Bio, p.Foto FROM gebruikers AS g INNER JOIN profielen AS p ON g.GebruikerID = ? AND p.GebruikerID = ?"
                                , [gebruikerID, gebruikerID])
                            .done(function (gegevens) {
                                console.log(gegevens);
                                console.log("Succes");

                                var gebruikerID = localStorage.getItem('GebruikerID');
                                var naam = document.getElementById("naam");
                                var leeftijd = document.getElementById("leeftijd");
                                var woonplaats = document.getElementById("woonplaats");
                                //var telefoon = document.getElementById("telefoon");
                                var bio = document.getElementById("bio");
                                var foto = document.getElementById("foreign-profiel-foto");

                                if (gegevens[0].Foto === null) {
                                    foto.setAttribute("src", "https://cateringopmaat.nl/wp-content/uploads/2017/08/blank-profile-picture-973460_1280.png");
                                } else {
                                    foto.setAttribute("src", "../Resources/Klantenfoto/" + gegevens[0].Foto);
                                }

                                databaseManager
                                    .query("SELECT * FROM reizen WHERE GebruikerID = ?", gebruikerID)
                                    .done(function (reis) {
                                        if (reis.length <= 0) {
                                            document.getElementById("reisGegevens").innerHTML = "Deze persoon heeft nog geen reis toegevoegd";
                                        }
                                    });

                                databaseManager
                                    .query("SELECT * FROM hobbies WHERE GebruikerID = ?", gebruikerID)
                                    .done(function (hobbie) {
                                        if (hobbie.length <= 0) {
                                            document.getElementsByClassName("hobbies")[0].append("Deze persoon heeft nog geen hobbies aangegeven");
                                        }
                                    });

                                naam.innerHTML = gegevens[0].Voornaam + " " + gegevens[0].Achternaam;
                                leeftijd.innerHTML = gegevens[0].Leeftijd;
                                woonplaats.innerHTML = gegevens[0].Woonplaats + ", " + gegevens[0].Land;
                                //telefoon.innerHTML = gegevens[0].Telefoon;
                                bio.innerHTML = gegevens[0].Bio;
                                databaseManager
                                    .query("SELECT Hobby FROM hobbies WHERE GebruikerID = ?", gebruikerID)
                                    .done(function (data) {
                                        console.log(data);
                                        var hobby = $(".hobbies");
                                        hobby.append("<ul>");
                                        for (var i = 0; i < data.length; i++) {
                                            hobby.append("<li>" + data[i].Hobby + "</li>");
                                        }
                                        hobby.append("</ul>");
                                        databaseManager
                                            .query("SELECT r.Land, r.Plaats " +
                                                "FROM reizen AS r " +
                                                "INNER JOIN profielen AS p " +
                                                "ON r.GebruikerID = p.GebruikerID " +
                                                "WHERE p.GebruikerID = ?;"
                                                , gebruikerID)
                                            .done(function (data) {
                                                console.log(data);

                                                /*var dataVanaf = data[0].Vanaf.split("T");
                                                var dataTot = data[0].Tot.split("T");*/

                                                var land = document.getElementById("land");
                                                var plaats = document.getElementById("plaats");
                                                /*var vanaf = document.getElementById("vanaf");
                                                var tot = document.getElementById("tot");*/

                                                land.innerHTML = data[0].Land;
                                                plaats.innerHTML = data[0].Plaats;
                                                /*vanaf.innerHTML = dataVanaf[0];
                                                 tot.innerHTML = dataTot[0];*/
                                            });
                                    });
                            });
                        break;
                }
            });
    })
    .fail(function (reason) {
        console.log(reason);
    });


function verstuurVerzoek() {
    databaseManager
        .query("INSERT INTO notificatie (GebruikerID, AfzenderID, Titel, Content, Datum, Gelezen) values (?,?,?,?,?,?)", [gebruikerID, gebruikerIDInlog, "Vriendschapverzoek", "U heeft een vriendschaps verzoek ontvangen", tijdVandaag(), "Ongelezen"])
        .done(function (veroekVerstuurd) {
            console.log(veroekVerstuurd);
            document.getElementsByClassName("profile-button")[0].innerHTML = "";
            $(".profile-button").append(
                "<h3 style='color: limegreen; font-weight: normal'>Verstuurd!</h3>");
        })
        .fail(function (nietVerstuurd) {
            console.log(nietVerstuurd);
        });
}

