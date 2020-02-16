$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});

var gebruikerID = sessionStorage.getItem('GebruikerID');

databaseManager
    .query("SELECT * FROM profielen WHERE GebruikerID = ?", gebruikerID)
    .done(function (data) {
        console.log(data);
        console.log("Boven");
        if(data[0].Bio == null){
            document.getElementById("content").innerHTML = "";
            $("#content").append(
                "<div class='outer-box'>"+
                "<h3 class='header3' style='color: #B81A04'>Hey! Jij daar</h3>"+
                "<p class='login-zin' style='color: grey; font-style: italic;'>Zo te zien ben je nieuw op onze website. Je profiel pagina is echter nog niet helemaal klaar. We missen nog een paar dingen. Wil je die nu aanpassen of later?</p>"+
                "<a href='profiel-edit.html'><button style='background-color: limegreen'>Ja, nu aanpassen</button></a>"+
                "<a href='index.html'><button>Nee, doe maar later</button></a>"+
                "</div>"
            );
        }
    })
    .fail(function (reason) {
        console.log(reason);
    });

databaseManager
    .query("SELECT g.Voornaam, g.Achternaam, p.Leeftijd, p.Woonplaats, p.Land, p.Status, p.Bio, p.Foto FROM fys_is107_3.gebruikers AS g INNER JOIN fys_is107_3.profielen AS p ON g.GebruikerID = ? AND p.GebruikerID = ?"
        , [gebruikerID, gebruikerID])
    .done(function (data) {
        console.log(data);
        console.log("Succes");

        var naam = document.getElementById("naam");
        var leeftijd = document.getElementById("leeftijd");
        var woonplaats = document.getElementById("woonplaats");
        //var telefoon = document.getElementById("telefoon");
        //var status = document.getElementById("status");
        var bio = document.getElementById("bio");
        var foto = document.getElementById("profiel-foto");

        naam.innerHTML = data[0].Voornaam + " " + data[0].Achternaam;
        leeftijd.innerHTML = data[0].Leeftijd;
        woonplaats.innerHTML = data[0].Woonplaats + ", " + data[0].Land;
        //telefoon.innerHTML = data[0].Telefoon;
        //status.innerHTML = data[0].Status;
        bio.innerHTML = data[0].Bio;
        if(data[0].Foto === null){
            foto.setAttribute("src","https://cateringopmaat.nl/wp-content/uploads/2017/08/blank-profile-picture-973460_1280.png");
        }else {
            foto.setAttribute("src", "Resources/Klantenfoto/" + data[0].Foto);
        }

        databaseManager
            .query("SELECT * FROM reizen WHERE GebruikerID = ?", gebruikerID)
            .done(function (reis) {
                if(reis.length <= 0){
                    document.getElementById("reisGegevens").innerHTML = "U heeft nog geen genintereseerde reis toegevoegd";
                }
            });

        databaseManager
            .query("SELECT * FROM hobbies WHERE GebruikerID = ?", gebruikerID)
            .done(function (hobbie) {
                if (hobbie.length <= 0){
                    document.getElementsByClassName("hobbies")[0].append("U heeft nog geen hobbies aangegeven");
                }
            });

        databaseManager
            .query("SELECT Hobby FROM hobbies WHERE GebruikerID = ?", gebruikerID)
            .done(function(data) {
                console.log(data);
                var hobby = $(".hobbies");
                hobby.append("<ul>");
                for (var i = 0; i < data.length; i++){
                    hobby.append("<li>"+data[i].Hobby+"</li>");
                }
                hobby.append("</ul>");
                databaseManager
                    .query("SELECT r.Land, r.Plaats FROM reizen AS r INNER JOIN profielen AS p ON r.GebruikerID = p.GebruikerID WHERE p.GebruikerID = ?"
                        , gebruikerID)
                    .done(function(data) {
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
    })
    .fail(function (reason) {
        console.log(reason);
        console.log("Fail");
    });
