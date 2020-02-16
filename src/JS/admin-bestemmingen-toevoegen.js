// Bestemming Informatie
$("#content").append("<div class='box'></div>")
var box = $(".box");

box.append("<div class=\"onderwerp\">Bestemming Informatie</div>");
box.append("<div class=\"onderwerpbox\"></div>");
var lastbox = $(".onderwerpbox:last-child");

lastbox.append("<div class=\"itemleft\">Land:</div>");
lastbox.append("<div class=\"itemleft\"><select id='Land'></select></div>");
var lastitem = $(".itemleft select:last-child");

databaseManager
    .query("SELECT * FROM landenlist")
    .done(function (data) {
        console.log("Landen:", data);
        for (var i = 0; i < data.length; i++) {
            lastitem.append("<option>" + data[i].Landen + "</option>");
        }
    })
lastbox.append("<div class=\"itemleft\">Plaats:</div>");
lastbox.append("<div class=\"itemleft\"><input type=\"text\" id='Plaats'></div>");

lastbox.append("<div class=\"itemleft\">Biografie:</div>");
lastbox.append("<div class=\"itemall\"><textarea id='Bio' rows=\"8\" cols=\"60\"></textarea></div>");

lastbox.append("<div class=\"itemleft\">Prijs:</div>");
lastbox.append("<div class=\"itemright\">&euro; <input id='Prijs' type=\"text\" name=\"prijs\" value=\"0\"></div>")

lastbox.append("<div class='itemall'><a class=\"addbtn\" onclick='toevoegen()'>Voeg een bestemming toe</a></div>");

function toevoegen() {
    var land = $("#Land").val();
    var plaats = $("#Plaats").val();
    var bio = $("#Bio").val();
    var prijs = $("#Prijs").val();
    var beoordeling = 3;
    var populariteit = 3;
    var foto = "parijs.jpg";


    console.log("Uitslag:", land, plaats, bio, prijs, beoordeling, populariteit, foto)
    databaseManager
        .query("INSERT INTO bestemmingen " +
            "(Land, Plaats, Beoordeling, Populariteit, Prijs, Foto, Bio) " +
            "VALUES (?,?,?,?,?,?,?)",
            [land, plaats, beoordeling, populariteit, prijs, foto, bio])
        .done(function (data3) {
            console.log(data3);
            if (data3.affectedRows > 0) {
                console.log("nieuwe id", data3.insertId)
                localStorage.setItem("BestemmingID", data3.insertId);
                window.location.href = "admin-bestemmingen-details.html";
            }
        });
}