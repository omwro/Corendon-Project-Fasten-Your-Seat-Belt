var bestemmingID = localStorage.getItem("BestemmingID");
databaseManager
    .query("SELECT * FROM bestemmingen WHERE BestemmingID = ?", [bestemmingID])
    .done(function (data) {
        console.log(data);

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
            .done(function (data2) {
                for (var i = 0; i < data2.length; i++) {
                    lastitem.append("<option value='"+data2[i].Landen+"'>" + data2[i].Landen + "</option>");
                }
                console.log(data[0].Land)
                $("#Land").val(data[0].Land);
            });
        lastbox.append("<div class=\"itemleft\">Plaats:</div>");
        lastbox.append("<div class=\"itemleft\"><input type=\"text\" id='Plaats' value='"+data[0].Plaats+"'></div>");

        lastbox.append("<div class=\"itemleft\">Biografie:</div>");
        lastbox.append("<div class=\"itemall\"><textarea id='Bio' rows=\"8\" cols=\"60\">"+data[0].Bio+"</textarea></div>");

        lastbox.append("<div class=\"itemleft\">Prijs:</div>");
        lastbox.append("<div class=\"itemright\">&euro; <input id='Prijs' type=\"text\" name=\"prijs\" value='"+data[0].Prijs+"'></div>")

        lastbox.append("<div class='itemall'><a class=\"addbtn\" id='updaten'>De bestemming bijwerken</a></div>");

        $( "#updaten" ).click(function() {
            var land = $("#Land").val();
            var plaats = $("#Plaats").val();
            var bio = $("#Bio").val();
            var prijs = $("#Prijs").val();

            console.log("Uitslag:", land, plaats, bio, prijs)
            databaseManager
                .query("UPDATE bestemmingen " +
                    "SET Land = ?, Plaats = ?, Prijs = ?, Bio = ? " +
                    "WHERE BestemmingID = ?",
                    [land, plaats, prijs, bio, bestemmingID])
                .done(function (data) {
                    console.log(data);
                    if (data.affectedRows > 0) {
                        console.log("nieuwe id", data.insertId)
                        window.location.href = "admin-bestemmingen-details.html";
                    }
                });
        });
    });