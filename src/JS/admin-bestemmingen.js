databaseManager
    .query("SELECT BestemmingID, Plaats, Foto FROM bestemmingen")
    .done(function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++){
            $("#bestemmingbox").append(
                "<div class=\"bestemming\">" +
                "<a onclick='saveBestemmingID("+data[i].BestemmingID+")' href=\"admin-bestemmingen-details.html\">" +
                "<img src=\"../Resources/Bestemmingsfoto/"+data[i].Foto+"\">" +
                "<div class=\"plaats\">"+data[i].Plaats+"</div></a>" +
                "</div>"
            );
        }
    });
function saveBestemmingID(x) {
    localStorage.setItem("BestemmingID", x);
}