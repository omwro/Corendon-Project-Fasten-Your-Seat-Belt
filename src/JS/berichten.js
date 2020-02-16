$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});


var contentlist = [];
databaseManager
    .query("SELECT * FROM notificatie WHERE GebruikerID = ? ", sessionStorage.getItem("GebruikerID"))
    .done(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var AfzenderID = data[i].AfzenderID;
            contentlist[i] = data[i].Content;
            var notificatieID = data[i].NotificatieID;
            databaseManager
                .query("SELECT g.Voornaam FROM gebruikers AS g INNER JOIN notificatie AS n ON n.AfzenderID = ? AND g.GebruikerID = ?"
                    , [AfzenderID, AfzenderID])
                /*.done(function (data) {
                    $("#content .sidebar").append("<h3><a href='#'>" + data[0].Voornaam + "</a></h3><br>");*/
                .done(function (data2) {
                    console.log(data);
                    //$("#content .sidebar").append("<h3><a href='foreign-profiel.html' onclick='goToForeignProfile("+AfzenderID+")'>" + data2[0].Voornaam + "</a></h3><br>");
                    $("#content .sidebar").append("<h3><a class='checkGelezen' href='foreign-profiel.html' onclick='goToForeignProfile("+AfzenderID+")'>" + data2[0].Voornaam + "</a></h3><br>");

                });
            //zet in de array 'contentlist' in de 1e regel de string "content1"

            /*$("#content .sidebar2").append("<h3><a href='#" + i + "' onclick=getContent(" + i + ");>" + data[i].Titel + "</a></h3><br>");

            contentlist[0] = "content";

            $("#content .sidebar2").append("<h3><a href='#" + i + "' onclick=getContent("+ i +","+AfzenderID+");>" + data[i].Titel + "</a></h3><br>");*/
            $("#content .sidebar2").append("<h3><a class='checkGelezen2' href='#" + i + "' onclick=getContent("+ i +","+AfzenderID+","+notificatieID+");>" + data[i].Titel + "</a></h3><br>");
            databaseManager
                .query("SELECT * FROM notificatie WHERE GebruikerID = ? ", sessionStorage.getItem("GebruikerID"))
                .done(function (data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].Gelezen === "Gelezen"){
                            document.getElementsByClassName("checkGelezen")[i].style.fontWeight = "normal";
                            document.getElementsByClassName("checkGelezen2")[i].style.fontWeight = "normal";
                        }
                    }
                });
        }
    })
    .fail(function (reason) {
        console.log(reason);
    });
function getContent(index, afzender, noteID) {
    databaseManager
        .query("UPDATE notificatie SET Gelezen = ? WHERE GebruikerID = ? AND NotificatieID = ?",["Gelezen",sessionStorage.getItem("GebruikerID"), noteID] )
        .done(function () {
            console.log("updated");
        });

    $("#content .messagebox").html(contentlist[index]);
    if(contentlist[index] === 'U heeft een vriendschaps verzoek ontvangen'){
        $("#content .messagebox").append(
            "<br><button onclick = 'vriendToegevoegd("+afzender+")' style='background-color: limegreen'>Accepteren</button>"+
            "<br><button onclick='verwijderBericht("+afzender+")'>Weigeren</button>"
        );
    }

}

function goToForeignProfile(afzender) {
    localStorage.setItem("GebruikerID", afzender);
}

function verwijderBericht(afzender) {
    databaseManager
        .query("DELETE FROM notificatie WHERE GebruikerId = ? AND Titel = 'Vriendschapverzoek' AND AfzenderID = ?", [sessionStorage.getItem("GebruikerID"),afzender])
        .done(function () {
            location.reload();
        });
}
function vriendToegevoegd(afzender) {
    console.log(afzender);
    databaseManager
        .query("INSERT INTO vrienden (GebruikerID, VriendID) VALUES (?,?)", [sessionStorage.getItem("GebruikerID"),afzender])
        .done(function () {
            databaseManager
                .query("INSERT INTO vrienden (GebruikerID, VriendID) VALUES (?,?)", [afzender, sessionStorage.getItem("GebruikerID")])
                .done(function () {
                    verwijderBericht(afzender);
                });
        });
}

databaseManager
    .query("SELECT * FROM notificatie WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
    .done(function (gelukt) {
        if(gelukt.length <= 0){
            document.getElementsByClassName("messagebox")[0].innerHTML = "Zo te zien heeft u geen berichten."
        }
    });