$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});

databaseManager
    .query("SELECT Land, Plaats, Prijs, Foto, BestemmingID, Beoordeling FROM bestemmingen")
    .done(function (data) {
        console.log("Bestemmingen:", data);
        $("#Bestemmingen").append("<h1 class=\"header3\">Bestemmingen</h1>");

        for (var i = 0; i < data.length; i++) {

            $("#Bestemmingen")
                .append("<a href='bestemmingen-detailed.html' onclick='f(" + data[i].BestemmingID + ")'>" +
                    "<div class='card'>" +
                    "<img class='location-image' src='../Resources/Bestemmingsfoto/" + data[i].Foto + "'>" +
                    "<h3 class='location-title'>" + data[i].Plaats + " / " + data[i].Land + "</h3>" +
                    "<p class='location-rating' id="+i+"></p>" +
                    "<h1 class='location-price'>€" + data[i].Prijs + ",-</h1>" +
                    "</div>" +
                    "</a>");
            var beoordeling = data[i].Beoordeling;
            var emptyBeoordeling = 5 - beoordeling;
            for (var j = 0; j < beoordeling; j++){
                $("#" + i + ".location-rating").append("<i class='fas fa-star'></i>");
            }
            for (var j = 0; j < emptyBeoordeling; j++){
                $("#" + i + ".location-rating").append("<i class='far fa-star'></i>");
            }
        }
    });


function f(x) {
    localStorage.setItem("BestemmingID", x);
}

databaseManager
    .query("SELECT DISTINCT Land FROM bestemmingen")
    .done(function (data) {
        console.log("Landen:", data);
        var filter = $(".left");

        filter.append("<h3>Bestemmingen</h3>");
        for (var i = 0; i < data.length; i++) {
            filter.append("<input type=\"checkbox\" class=\"location\" value=" + data[i].Land + ">" + data[i].Land + "<br>");
        }

        filter.append("<h3>Populariteit</h3>");
        for (var i = 0; i < 5; i++) {
            var val = i + 1;
            filter.append("<input type=\"checkbox\" class=\"popularity\" value=" + val + ">");
            for (var j = 0; j < val; j++) {
                filter.append("<i class=\"fas fa-star\"></i>");
            }
            var reverseVal = 5 - val;
            for (var j = 0; j < reverseVal; j++) {
                filter.append("<i class=\"far fa-star\"></i>");
            }
            filter.append("<br>");
        }

        filter.append("<h3>Prijsklassen</h3>");
        for (var i = 1; i <= 5; i++) {
            var x = i * 150;
            filter.append("<input type=\"radio\" class=\"price\" name=\"price\" value="+x+">Tot €"+x+",-<br>");
        }
        filter.append("<input type=\"radio\" class=\"price\" name=\"price\" value=\"10000\">Meer dan €750,-<br>");

        filter.append("<input type=\"button\" value=\"Filters toepassen\" class=\"filter-button\" onclick=\"setFilter();\"/>");

        filter.append("<br><br><br>");
    });

function setFilter() {
    var landen = new Array();
    $(".location:checkbox:checked").each(function(){
        landen.push($(this).val());
        console.log(landen)
    });
    // Gecopied van https://stackoverflow.com/questions/43166013/javascript-array-to-mysql-in-list-of-values
    var landenInString = landen.map(function (a) { return "'" + a.replace("'", "''") + "'"; }).join();

    var sterren = new Array();
    $(".popularity:checkbox:checked").each(function(){
        sterren.push($(this).val());
        console.log(sterren)
    });
    // Gecopied van https://stackoverflow.com/questions/43166013/javascript-array-to-mysql-in-list-of-values
    var sterrenInString = sterren.map(function (a) { return "'" + a.replace("'", "''") + "'"; }).join();

    var price = $(".price:radio:checked").val();
    console.log(price);

    if(landenInString !== "") {
        databaseManager
            .query("SELECT Land, Plaats, Prijs, Foto, BestemmingID, Beoordeling " +
                "FROM bestemmingen " +
                "WHERE Land IN (" + landenInString + ")")
            .done(function (data) {
                console.log("Nieuwe Bestemmingen:", data);
                $("#Bestemmingen").empty();
                $("#Bestemmingen").append("<h1 class=\"header3\">Bestemmingen</h1>");
                for (var i = 0; i < data.length; i++) {
                    $("#Bestemmingen").append(
                        "<a href='bestemmingen-detailed.html' onclick='f(" + data[i].BestemmingID + ")'>" +
                        "<div class='card'>" +
                        "<img class='location-image' src='../Resources/Bestemmingsfoto/" + data[i].Foto + "'>" +
                        "<h3 class='location-title'>" + data[i].Plaats + " / " + data[i].Land + "</h3>" +
                        "<p class='location-rating' id=" + i + "></p>" +
                        "<h1 class='location-price'>€" + data[i].Prijs + ",-</h1>" +
                        "</div>" +
                        "</a>");
                    var beoordeling = data[i].Beoordeling;
                    var emptyBeoordeling = 5 - beoordeling;
                    for (var j = 0; j < beoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='fas fa-star'></i>");
                    }
                    for (var j = 0; j < emptyBeoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='far fa-star'></i>");
                    }
                }
            });
    }
    if(sterrenInString !== "") {
        databaseManager
            .query("SELECT Land, Plaats, Prijs, Foto, BestemmingID, Beoordeling " +
                "FROM bestemmingen " +
                "WHERE Beoordeling IN (" + sterrenInString + ")")
            .done(function (data) {
                console.log("Nieuwe Bestemmingen:", data);
                $("#Bestemmingen").empty();
                $("#Bestemmingen").append("<h1 class=\"header3\">Bestemmingen</h1>");
                for (var i = 0; i < data.length; i++) {
                    $("#Bestemmingen").append(
                        "<a href='bestemmingen-detailed.html' onclick='f(" + data[i].BestemmingID + ")'>" +
                        "<div class='card'>" +
                        "<img class='location-image' src='../Resources/Bestemmingsfoto/" + data[i].Foto + "'>" +
                        "<h3 class='location-title'>" + data[i].Plaats + " / " + data[i].Land + "</h3>" +
                        "<p class='location-rating' id=" + i + "></p>" +
                        "<h1 class='location-price'>€" + data[i].Prijs + ",-</h1>" +
                        "</div>" +
                        "</a>");
                    var beoordeling = data[i].Beoordeling;
                    var emptyBeoordeling = 5 - beoordeling;
                    for (var j = 0; j < beoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='fas fa-star'></i>");
                    }
                    for (var j = 0; j < emptyBeoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='far fa-star'></i>");
                    }
                }
            });
    }
    if(price !== "") {
        databaseManager
            .query("SELECT Land, Plaats, Prijs, Foto, BestemmingID, Beoordeling " +
                "FROM bestemmingen " +
                "WHERE Prijs <= " + price)
            .done(function (data) {
                console.log("Nieuwe Bestemmingen:", data);
                $("#Bestemmingen").empty();
                $("#Bestemmingen").append("<h1 class=\"header3\">Bestemmingen</h1>");
                for (var i = 0; i < data.length; i++) {
                    $("#Bestemmingen").append(
                        "<a href='bestemmingen-detailed.html' onclick='f(" + data[i].BestemmingID + ")'>" +
                        "<div class='card'>" +
                        "<img class='location-image' src='../Resources/Bestemmingsfoto/" + data[i].Foto + "'>" +
                        "<h3 class='location-title'>" + data[i].Plaats + " / " + data[i].Land + "</h3>" +
                        "<p class='location-rating' id=" + i + "></p>" +
                        "<h1 class='location-price'>€" + data[i].Prijs + ",-</h1>" +
                        "</div>" +
                        "</a>");
                    var beoordeling = data[i].Beoordeling;
                    var emptyBeoordeling = 5 - beoordeling;
                    for (var j = 0; j < beoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='fas fa-star'></i>");
                    }
                    for (var j = 0; j < emptyBeoordeling; j++) {
                        $("#" + i + ".location-rating").append("<i class='far fa-star'></i>");
                    }
                }
            });
    }
}
