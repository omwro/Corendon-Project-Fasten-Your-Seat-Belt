var bestemmingID = localStorage.getItem("BestemmingID");
databaseManager
    .query("SELECT * FROM bestemmingen WHERE BestemmingID = ?", [bestemmingID])
    .done(function (data) {
        console.log(data);
        $(".big-image img").attr('src', '../Resources/Bestemmingsfoto/' + data[0].Foto);
        $(".plaats").html(data[0].Plaats);
        if (data[0].Populariteit != 5) {
            $(".status").hide();
        }
        $(".land").html("> " + data[0].Land);
        for (var i = 0; i < data[0].Beoordeling; i++) {
            $(".rating").append("<img src=\"../Resources/star.png\">")
        }
        $(".price").html("&euro; "+data[0].Prijs+",-");
        $(".bio").append(data[0].Bio);
    });
