$(document).ready(function() { $('#header').load('header.html'); });
$(document).ready(function() { $('#footer').load('footer.html'); });

databaseManager
    .query("SELECT Vraag, Antwoord FROM vragen")
    .done(function (data) {
        console.log("data:",data);
        console.log("Succes");


    })
    .fail(function (reason) {
        console.log(reason);
        console.log("Fail");
    });

    function searchQuestion() {
        var searchBarInput = document.getElementById("searchBar1").value;
        searchBarInput = "%" + searchBarInput + "%";
        console.log(searchBarInput);
        databaseManager
            .query("SELECT Vraag, Antwoord FROM vragen WHERE Vraag LIKE ? ", searchBarInput)
            .done(function (data){
                console.log("succes", data);
                $("#questions").empty();
                for (var i = 0; i < data.length; i++) {
                    $("#questions").append(
                        "<div class='accordion-center' id='accordion'>" +
                        "<button class='accordion'>"+data[i].Vraag+"</button>" +
                        "<div class='panel'>" +
                        "<p class='antwoorden'>"+data[i].Antwoord+"</p>" +
                        "</div>" +
                        "</div>");

                    var acc = $(".accordion");
                        acc[i].addEventListener("click", function() {
                            var panel = this.nextElementSibling;
                            if (panel.style.display == "block") {
                                $(this).removeClass("active");
                                panel.style.display = "none";
                            } else {
                                $(acc).removeClass("active");
                                $(this).addClass("active");
                                $(".panel").css("display", "none");
                                panel.style.display = "block";
                            }
                        });
                    }

        }).fail(function (reason){
          console.log("fail")
            console.log(reason);
        })
    }
