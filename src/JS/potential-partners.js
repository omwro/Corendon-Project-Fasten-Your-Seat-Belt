$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});


var gebruikerID = sessionStorage.getItem("GebruikerID");
if (sessionStorage.length === 0) {
    gebruikerID = 0;
}
databaseManager
    .query("SELECT  g.GebruikerID, g.Voornaam, g.Achternaam, p.Foto " +
        "FROM gebruikers AS g " +
        "INNER JOIN profielen AS p ON g.GebruikerID = p.GebruikerID " +
        "WHERE g.GebruikerID != ?", gebruikerID)
    .done(function (gebruikers) {
        console.log("Gebruikers:", gebruikers);
        databaseManager
            .query("SELECT GebruikerID, Hobby FROM hobbies WHERE GebruikerID != ?", gebruikerID)
            .done(function (hobbies) {
                console.log("Hobbies:", hobbies);
                databaseManager
                    .query("SELECT Hobby FROM hobbies WHERE GebruikerID = ?", gebruikerID)
                    .done(function (myHobbies) {
                        console.log("MyHobbies:", myHobbies)
                        appendUser(gebruikers, hobbies, myHobbies);
                    });
            });
    });

function appendUser(gebruikers, hobbies, myHobbies) {
    var gebruikerRanking = [];
    for (var i = 0; i < gebruikers.length; i++) {
        gebruikerRanking.push({
            GebruikerID: gebruikers[i].GebruikerID,
            Voornaam: gebruikers[i].Voornaam,
            Achternaam: gebruikers[i].Achternaam,
            Foto: gebruikers[i].Foto,
            Aantal: 0
        });
    }
    for (var j = 0; j < hobbies.length; j++) {
        for (var k = 0; k < myHobbies.length; k++) {
            if (hobbies[j].Hobby == myHobbies[k].Hobby) {
                function getIndex(index) {
                    return index.GebruikerID == hobbies[j].GebruikerID;
                }

                var index = gebruikerRanking.find(getIndex);
                index.Aantal++;
            }
        }
    }
    gebruikerRanking.sort(function (a, b) {
        return b.Aantal - a.Aantal;
    });
    console.log("Gebruikers Rank: ", gebruikerRanking);

    for (var i = 0; i < gebruikerRanking.length; i++) {
        $("#potential").append(
            "<a href='foreign-profiel.html' onclick='f(" + gebruikerRanking[i].GebruikerID + ")'>" +
            "<div class='card'>" +
            "<img class='image' id='picture" + gebruikerRanking[i].GebruikerID + "'>" +
            "<h2 class='name' id='name" + gebruikerRanking[i].GebruikerID + "'></h2>" +
            "<p class='interest' id='interest" + gebruikerRanking[i].GebruikerID + "'></p>" +
            "</div>" +
            "</a>");

        function zoekGebruikerID(row) {
            return row.GebruikerID === gebruikerRanking[i].GebruikerID;
        }

        var x = gebruikerRanking.find(zoekGebruikerID);
        $("#picture" + gebruikerRanking[i].GebruikerID).attr("src", "Resources/Klantenfoto/" + x.Foto);
        $("#name" + gebruikerRanking[i].GebruikerID).append(x.Voornaam, " ", x.Achternaam);
        if (gebruikerRanking[i].Aantal > 0) {
            $("#interest" + gebruikerRanking[i].GebruikerID).append(gebruikerRanking[i].Aantal, " Gezamelijke Interesses");
        }
    }
}

function f(x) {
    localStorage.setItem("GebruikerID", x);
}
