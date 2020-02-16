var naam;
var geslacht = sessionStorage.getItem("Geslacht");
var achternaam = sessionStorage.getItem("Achternaam");
if (geslacht === "Man"){
    naam = "hr. " + achternaam;
} else if(geslacht === "Vrouw"){
    naam = "mw. " + achternaam;
}else{
    naam = "Oeps!";
}
var docx = document.getElementsByClassName("naam");
docx[0].innerHTML = naam;

function logout() {
    sessionStorage.clear();
}
if(sessionStorage.length === 0){
    docx[0].innerHTML = null;
    var icons = document.getElementsByTagName("i");
    for(var i = 0; i < 2 ; i++){
        icons[i].style.display = "none";
    }
    document.getElementsByClassName("dropdown-content")[0].style.display = "none";
    var link = "<a href = 'logIn.html'>Log In</a>";
    $(".naam").append(link);
}
//console.log(window.location.pathname);

switch(window.location.pathname){
    case '/team-3/FYS/index.html':
        document.getElementsByClassName("pagina")[0].style.backgroundColor = "#B81A04";
        console.log("gelukt");
        break;
    case '/team-3/FYS/bestemmingen.html':
        document.getElementsByClassName("pagina")[1].style.backgroundColor = "#B81A04";
        break;
    case '/team-3/FYS/potential-partners.html':
        document.getElementsByClassName("pagina")[2].style.backgroundColor = "#B81A04";
        break;
    case '/team-3/FYS/contact.html':
        document.getElementsByClassName("pagina")[3].style.backgroundColor = "#B81A04";
        break;
    case '/team-3/FYS/help.html':
        document.getElementsByClassName("pagina")[4].style.backgroundColor = "#B81A04";
        break;

}

//Executed after
databaseManager
    .query("SELECT COUNT(*) as AantalBerichten FROM notificatie WHERE GebruikerID = ? AND Gelezen = ?",
        [sessionStorage.getItem("GebruikerID"), "Ongelezen"])
    .done(function (berichtenGevonden) {
        if(berichtenGevonden[0].AantalBerichten <= 0){
            document.getElementsByClassName("berichten-counter")[0].style.display = "none";
        }else{
            document.getElementsByClassName("berichten-counter")[0].innerHTML = berichtenGevonden[0].AantalBerichten;
            document.getElementsByClassName("dropdown-opties")[1].style.marginLeft = "50px"
        }
    });
