$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});


var plaats;
var Land;
databaseManager
    .query("SELECT Land, Plaats, Prijs, Foto, Bio, BestemmingID FROM bestemmingen WHERE BestemmingId = ?", localStorage.getItem("BestemmingID"))
    .done(function (data) {
        console.log("data:", data);
        console.log("Succes");
        plaats = data[0].Plaats;
        Land = data[0].Land;
        var Prijs = data[0].Prijs;
        var Foto = data[0].Foto;
        var bio = data[0].Bio;
        document.getElementsByClassName("Prijs")[0].innerHTML = "€" + Prijs + ",-";
        document.getElementsByClassName("detailed-image")[0].setAttribute("src", "../Resources/Bestemmingsfoto/" + Foto)
        document.getElementById("plaats").innerHTML = plaats;
        document.getElementsByClassName("description")[0].innerHTML = Land;
        document.getElementsByClassName("information")[0].innerHTML = bio;

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month
        }
        var day = d.getDate();
        if (day < 10) {
            day = '0' + day
        }
        var today = year + "-" + month + "-" + day;
        console.log("Datum van vandaag:", today)

        databaseManager
            .query("SELECT * FROM statistieken WHERE Soort = ? AND Bestemming = ? AND Datum = ?",
                ["Plaats", plaats, today])
            .done(function (data) {
                console.log("stats", data);
                if (data.length == 0) {
                    databaseManager
                        .query("INSERT INTO statistieken (Soort, Bestemming, Datum, Bekeken) VALUES (?,?,?,?)",
                            ["Plaats", plaats, today, 1])
                        .done(function (data) {
                            console.log(data);
                        });
                } else {
                    databaseManager
                        .query("UPDATE statistieken SET Bekeken = ? WHERE Soort = ? AND Bestemming = ? AND Datum = ?",
                            [(data[0].Bekeken + 1), "Plaats", plaats, today])
                        .done(function (data) {
                            console.log("Added + 1 to Bekeken");
                            ///////////////////////////////////
                            databaseManager
                                .query("SELECT * FROM statistieken WHERE Soort = ? AND Bestemming = ? AND Datum = ?",
                                    ["Land", Land, today])
                                .done(function (data) {
                                    console.log("stats", data);
                                    if (data.length == 0) {
                                        databaseManager
                                            .query("INSERT INTO statistieken (Soort, Bestemming, Datum, Bekeken) VALUES (?,?,?,?)",
                                                ["Land", Land, today, 1])
                                            .done(function (data) {
                                                console.log(data);
                                            });
                                    } else {
                                        databaseManager
                                            .query("UPDATE statistieken SET Bekeken = ? WHERE Soort = ? AND Bestemming = ? AND Datum = ?",
                                                [(data[0].Bekeken + 1), "Land", Land, today])
                                            .done(function (data) {
                                                console.log("Added + 1 to Bekeken");
                                            });
                                    }
                                });
                        });
                }
            });
    });

function toevoegen() {
    databaseManager
        .query("INSERT INTO reizen (GebruikerID, Land, Plaats) VALUES (?,?,?)", [sessionStorage.getItem("GebruikerID"),Land, plaats])
        .done(function () {
            location.reload();
        });

    /*databaseManager
        .query("SELECT GeboekteReisID FROM profielen WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
        .done(function (reisID) {
            databaseManager
                .query("DELETE FROM reizen WHERE GeboekteReisID = ?", reisID[0].GeboekteReisID)
                .done(function () {

                });
            databaseManager
                .query("UPDATE profielen SET GeboekteReisID = ? WHERE GebruikerID = ?", [null, sessionStorage.getItem("GebruikerID")])
                .done(function () {

                });

        });
    databaseManager
        .query("INSERT INTO reizen (Land, Plaats) VALUES (?,?)", [Land, plaats])
        .done(function (yeet) {
            console.log(yeet);
            databaseManager
                .query("SELECT r.GeboekteReisID FROM reizen AS r INNER JOIN profielen AS p ON r.GeboekteReisID = p.GeboekteReisID WHERE p.GebruikerID = ?;"
                    , sessionStorage.getItem("GebruikerID"))
                .done(function (bestemmingProfiel) {
                    console.log(bestemmingProfiel);
                    databaseManager
                        .query("UPDATE profielen SET GeboekteReisID = ? WHERE GebruikerID = ?", [bestemmingProfiel[0].GeboekteReisID, sessionStorage.getItem("GebruikerID")])
                        .done(function () {

                        });
                });
        })
        .fail(function (gefaald) {
            console.log(gefaald)
        })*/
}