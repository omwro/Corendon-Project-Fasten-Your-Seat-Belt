var gebruiker1ID;
var gebruiker2ID;
var chatberichtID;
var sessionID = sessionStorage.getItem("GebruikerID");
$(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
});
//hier checkt hij wie jou vrienden zijn.
databaseManager
    .query("select  g.Voornaam, v.VriendID from gebruikers AS g " +
        "inner join vrienden as v on g.GebruikerID = v.VriendID " +
        "where v.GebruikerID = ? ", sessionID)
    .done(function (data) {
        console.log("Sessie ID:", sessionID);
        console.log("Vrienden:", data)
        for (var i = 0; i < data.length; i++) {
            $(".vriendenlijst").append("<a id='" + data[i].VriendID + "' onclick='checkChatBerichtenID(" + sessionID + "," + data[i].VriendID + ")'>" + data[i].Voornaam + "</a>")
        }
    })
    .fail(function (redenen) {
        console.log(redenen);
    });

function checkChatBerichtenID(eigenID, VriendID) {
    databaseManager
        .query("SELECT ChatBerichtID FROM chat WHERE Gebruiker1ID = ? AND Gebruiker2ID = ?", [eigenID, VriendID])
        .done(function (data) {
            console.log("Chat Bericht ID:", data[0].ChatBerichtID);
            if (data.length > 0) {
                chatberichtID = data[0].ChatBerichtID;
                gebruiker1ID = eigenID;
                gebruiker2ID = VriendID;
                reload(data[0].ChatBerichtID, eigenID, VriendID)
            } else {
                console.log("is no chatberichtid trigger")
                $(".chatlogs").empty();
                chatberichtID = 0;
                gebruiker1ID = eigenID;
                gebruiker2ID = VriendID;
            }
        });
    $(".active").removeClass("active");
    $("#"+VriendID).addClass("active");

}

function reload(ChatBerichtID, eigenID, VriendID) {
    var oldCount = 0;
    // Running for the first time
    databaseManager
        .query("SELECT COUNT(Message) AS c FROM chatberichten Where ChatBerichtenID = ?", ChatBerichtID)
        .done(function (data) {
            oldCount = data[0].c;
            loadChat(ChatBerichtID, eigenID, VriendID)
        });

    // the loop every second
    setInterval(function () {
        databaseManager
            .query("SELECT COUNT(Message) AS c FROM chatberichten Where ChatBerichtenID = ?", ChatBerichtID)
            .done(function (data) {
                if (data[0].c > oldCount) {
                    console.log("Found new message");
                    oldCount = data[0].c;
                    loadChat(ChatBerichtID, eigenID, VriendID)
                }
            });
    }, 1000);

}

function loadChat(ChatBerichtID, eigenID, VriendID) {
    $(".chatlogs").empty();
    document.getElementById("input").value = "";
    databaseManager
        .query("SELECT * FROM chatberichten WHERE ChatBerichtenID = ?", ChatBerichtID)
        .done(function (data) {
            console.log("chatberichtdata:", data);
            ////////////////////////////////////////////////////////////////////////
            for (var i = 0; i < data.length; i++) {
                if (data[i].GebruikerID === eigenID) {
                    $(".chatlogs").append("<div class='chat jezelf'>\n" +
                        "<div class='user-photo'><img src='https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg' alt='hier nog een foto plaatsen'></div>\n" +
                        "<p class='chat-message'>" + data[i].Message + "</p>\n" +
                        "</div>")
                }
                else if (data[i].GebruikerID === VriendID) {
                    $(".chatlogs").append("<div class='chat vriend'>\n" +
                        "<div class='user-photo'><img src='https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg' alt='hier nog een foto plaatsen'></div>\n" +
                        "<p class='chat-message'>" + data[i].Message + "</p>\n" +
                        "</div>")
                }


            }
            $(".chatlogs").scrollTop($(".chatlogs")[0].scrollHeight);
        })
}


function verstuur() {
    var input = $("#input").val();

    if (input != "") {
        if (chatberichtID > 0) {
            databaseManager
                .query("INSERT INTO chatberichten(ChatBerichtenID,GebruikerID,Message,Tijd) VALUES(?,?,?,?)", [chatberichtID, gebruiker1ID, input, tijdVandaag()])
                .done(function (data) {
                    console.log("data insert succes");
                    $("#input").val("");
                });
        } else {
            databaseManager
                .query("SELECT MAX(ChatBerichtenID) AS berichtID FROM chatberichten")
                .done(function (data) {
                    var hoogsteID = data[0].berichtID + 1;
                    databaseManager
                        .query("INSERT INTO chatberichten(ChatBerichtenID,GebruikerID,Message,Tijd) VALUES (?,?,?,?)", [hoogsteID, gebruiker1ID, input, tijdVandaag()])
                        .done(function () {
                            databaseManager
                                .query("INSERT INTO chat(Gebruiker1ID,Gebruiker2ID,ChatBerichtID) VALUES (?,?,?)", [gebruiker1ID, gebruiker2ID, hoogsteID])
                                .done(function () {
                                    databaseManager
                                        .query("INSERT INTO chat(Gebruiker1ID,Gebruiker2ID,ChatBerichtID) VALUES (?,?,?)", [gebruiker2ID, gebruiker1ID, hoogsteID])
                                        .done(function () {
                                            chatberichtID = hoogsteID;
                                            //loadChat()
                                            reload(chatberichtID, gebruiker1ID, gebruiker2ID);
                                        });
                                });


                        });
                });
        }
    }
}

console.log(tijdVandaag());