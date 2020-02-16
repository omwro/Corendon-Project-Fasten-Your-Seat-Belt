if (sessionStorage.length === 0) {
    document.getElementsByClassName("profile-button")[0].style.display = "none";
}

databaseManager
    .query("SELECT Titel FROM notificatie WHERE AfzenderID = ? AND GebruikerID = ? AND Titel = 'Vriendschapverzoek'", [gebruikerIDInlog, gebruikerID])
    .done(function (veroekVerstuurd) {
        console.log(veroekVerstuurd);
        if (veroekVerstuurd.length > 0) {
            document.getElementsByClassName("profile-button")[0].innerHTML = "";
            $(".profile-button").append(
                "<h3 style='font-style: italic'>In afwachting...</h3>");
        }
    })
    .fail(function (nietVerstuurd) {
        console.log(nietVerstuurd);
    });

databaseManager
    .query("SELECT GebruikerID, VriendID FROM vrienden WHERE VriendID = ? AND GebruikerID = ?", [gebruikerID, gebruikerIDInlog])
    .done(function (data) {
        if (data.length > 0) {
            document.getElementsByClassName("profile-button")[0].innerHTML = "";
        }
    });
