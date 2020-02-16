$(document).ready(function() { $('#header').load('header.html'); });
$(document).ready(function() { $('#footer').load('footer.html'); });

function f() {

    var input = document.getElementById("input");
    var errorMessage2 = document.getElementById("error-message2");

    databaseManager
        .query("SELECT Email FROM gebruikers WHERE Email = ?", input.value)
        .done(function (data) {
            if (data.length === 1) {
                console.log("SUCCEEDED");
                document.getElementById("content").innerHTML = "";
                $("#content").append("<div class=\"outer-box\">\n" +
                    "<h3 class=\"wachtwoord-vergeten\">Wachtwoord vergeten</h3>\n" +
                    "</div>" +
                    "<div class=\"outer-box\" style='margin-bottom: 60px'>\n" +
                    "<p class=\"login-zin\">Wachtwoord is naar uw ingevoerde e-mail succesvol adres verzonden.</p>\n" +
                    "</div>" +
                    "<a href=\"logIn.html\"><p class=\"go-back\" >< Ga terug naar de login pagina</p></a>\n")
            } else {
                document.getElementById("input").style.fontStyle = "italic";
                document.getElementById("input").style.color = "dimgray";
                console.log("FOUTE INLOG");
                input.value = "E-mail";
                input.style.border = "2px solid #D81E05";
                errorMessage2.innerHTML = "Geef een geldige e-mail!";
            }
        })

}

function error(){
    document.getElementById("input").style.fontStyle = "normal";
    if(document.getElementById("input").value === "E-mail" ){
        document.getElementById("input").value = "";
    }
    document.getElementById("input").style.color = "black";
    document.getElementById("error-message2").innerHTML = "";

}

