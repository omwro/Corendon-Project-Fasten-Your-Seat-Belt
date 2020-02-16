var list = [
    ["admin-bestemmingen-bewerken","Omer"],
    ["admin-bestemmingen-details","Omer"],
    ["admin-bestemmingen-toevoegen","Omer"],
    ["admin-bestemmingen","Omer"],
    ["admin-home","Omer"],
    ["admin-statistieken1","Omer"],
    ["admin-statistieken2","Omer"],
    ["berichten","Mikail"],
    ["bestemmingen-detailed","Niels"],
    ["bestemmingen","Niels"],
    ["chat","Arfeen"],
    ["contact","Niels"],
    ["foreign-profiel","Safak"],
    ["forgot-password","Safak"],
    ["handleiding","Safak"],
    ["help","Niels"],
    ["index","Arfeen"],
    ["logIn","Safak"],
    ["potential-partners","Fejsal"],
    ["profiel-edit","Safak"],
    ["profiel","Mikail"],
    ["registreren","Safak"]
];

var url = window.location.pathname;
var splitUrl = url.split("/");
var lastSplitUrl = splitUrl.length - 1;
var path = splitUrl[lastSplitUrl];
var splitPath = path.split(".");
var page = splitPath[0];

var creator = "";
var note = "Deze pagina is gemaakt door ";

for (var i = 0; i < list.length; i++){
	if (page == list[i][0]){
		creator = list[i][1];
	}
}

var footertext = note + creator;
$(".footer").html(footertext);