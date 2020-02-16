$("#deletebtn").click(function() {
    if (confirm("Je staat op het punt om een bestemming te verwijderen!\nWeet je dat zeker?")) {
        databaseManager
            .query("DELETE FROM bestemmingen WHERE BestemmingID = ?", bestemmingID)
            .done(function (data) {
                console.log(data);
                if (data.affectedRows > 0) {
                    window.location.href = "admin-bestemmingen.html";
                }
            });
    }
});