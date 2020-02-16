$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function() { $('#footer').load('footer.html'); });


function login() {


    var input1 = $("#input1").val();
    var input2 = $("#input2").val();
    var errorMessage2 = document.getElementById("error-message2");

    databaseManager
        .query("SELECT gebruikers.GebruikerID, gebruikers.Email, gebruikers.Wachtwoord, gebruikers.Achternaam, gebruikers.Geslacht, profielen.Bio FROM gebruikers INNER JOIN profielen on profielen.GebruikerID = gebruikers.GebruikerID WHERE Email = ? AND Wachtwoord = ?", [input1, input2])
        .done(function (data) {
            if (data.length == 1){
                sessionStorage.setItem("GebruikerID", data[0].GebruikerID);
                sessionStorage.setItem("Achternaam", data[0].Achternaam);
                sessionStorage.setItem("Geslacht", data[0].Geslacht);
                console.log("SUCCEEDED",data);
                if(data[0].Bio === null){
                    window.location.href = "profiel.html";
                }else{
                    window.location.href = "index.html";

                }

            } else{
                document.getElementById("input1").style.color = "dimgray";
                document.getElementById("input2").style.color = "dimgray";
                document.getElementById("input1").style.fontStyle = "italic";
                document.getElementById("input2").style.fontStyle = "italic";
                document.getElementById("input2").setAttribute("type","text");
                console.log("FOUTE INLOG");
                document.getElementById("input1").value = "E-mail";
                document.getElementById("input2").value = "Wachtwoord";
                document.getElementById("input1").style.border = "2px solid #D81E05";
                document.getElementById("input2").style.border = "2px solid #D81E05";
                errorMessage2.innerHTML = "Onjuiste e-mail en/of wachtwoord!";
            }
        });
}
function adminlogin() {
    var input1 = $("#input1").val();
    var input2 = $("#input2").val();
    var errorMessage2 = document.getElementById("error-message2");

    databaseManager
        .query("SELECT GebruikerID, Email, Wachtwoord, Achternaam, Geslacht FROM gebruikers WHERE Email = ? AND Wachtwoord = ? AND Rechten = 'Admin'", [input1, input2])
        .done(function (data) {
            if (data.length == 1){
                console.log("SUCCEEDED",data);
                window.location.href = "admin-home.html";
                sessionStorage.setItem("GebruikerID", data[0].GebruikerID);
                sessionStorage.setItem("Achternaam", data[0].Achternaam);
                sessionStorage.setItem("Geslacht", data[0].Geslacht);
            } else{
                console.log("FOUTE INLOG");
                $("#input1").val = "E-mail";
                $("#input2").val = "Wachtwoord";
                document.getElementById("input1").style.border = "2px solid #D81E05";
                document.getElementById("input2").style.border = "2px solid #D81E05";
                errorMessage2.innerHTML = "Onjuiste e-mail en/of wachtwoord!";
            }
        });
}

function reset1() {
    document.getElementById("input1").style.color = "black";
    if(document.getElementById("input1").value === "E-mail" ){
        document.getElementById("input1").value = "";
    }
    document.getElementById("input1").style.fontStyle = "normal";
}
function reset2() {
    document.getElementById("input2").style.color = "black";
    document.getElementById("input2").setAttribute("type","password");
    if(document.getElementById("input2").value === "Wachtwoord" ){
        document.getElementById("input2").value = "";
    }            document.getElementById("error-message2").innerHTML = "";
}