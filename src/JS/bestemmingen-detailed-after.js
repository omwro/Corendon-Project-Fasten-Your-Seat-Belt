if (sessionStorage.length <= 0) {
    document.getElementsByClassName("button")[0].style.display = "none";
} else {
    databaseManager
        .query("SELECT GebruikerID FROM reizen WHERE GebruikerID = ?", sessionStorage.getItem("GebruikerID"))
        .done(function (gevonden) {
            if (gevonden.length > 0) {
                document.getElementsByClassName("button")[0].style.display = "none";
            }
        });
}