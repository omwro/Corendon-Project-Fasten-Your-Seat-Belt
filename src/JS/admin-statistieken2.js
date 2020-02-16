var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
if (month < 10) {
    month = '0' + month
}
var day = d.getDate();
if (day < 10) {
    day = '0' + day
}
var today = year + "-" + month + "-" + day;
var thisMonth = year + "-" + (month - 1) + "-" + day;
var thisYear = (year - 1) + "-" + month + "-" + day;

var listDag = new Array();
databaseManager
    .query("SELECT * FROM statistieken WHERE Soort = 'Land' AND Datum = ?", today)
    .done(function(data) {
        console.log("data dag:", data);
        listDag[0] = ['Plaats', 'Dag'];
        for (var i = 0; i < data.length; i++){
            listDag[i + 1] = [data[i].Bestemming, data[i].Bekeken];
        }
        console.log("list dag:",listDag);
    });

var listMaand = new Array();
databaseManager
    .query("SELECT * FROM statistieken WHERE Soort = 'Land' AND Datum >= ?", thisMonth)
    .done(function(data) {
        console.log("data maand:", data);
        listMaand[0] = ['Plaats', 'Maand'];
        for (var i = 0; i < data.length; i++){
            var exist = false;
            for (var j = 0; j < listMaand.length; j++ ){
                if (data[i].Bestemming === listMaand[j][0]){
                    exist = true;
                    doesExist(j,data[i].Bekeken,listMaand[j][1]);
                }
            }
            if (!exist){
                doesntExist(data[i].Bestemming, data[i].Bekeken);
            }
        }
        function doesExist(i, nieuwBekeken, oudBekeken){
            listMaand[i][1] = nieuwBekeken + oudBekeken;
        }
        function doesntExist(bestemming, bekeken){
            var i = listMaand.length;
            listMaand[i] = [bestemming, bekeken];
        }
        console.log("list maand:",listMaand);
    });

var listYear = new Array();
databaseManager
    .query("SELECT * FROM statistieken WHERE Soort = 'Land' AND Datum >= ?", thisYear)
    .done(function(data) {
        console.log("data jaar", data);
        listYear[0] = ['Plaats', 'Jaar'];
        for (var i = 0; i < data.length; i++){
            var exist = false;
            for (var j = 0; j < listYear.length; j++ ){
                if (data[i].Bestemming === listYear[j][0]){
                    exist = true;
                    doesExist(j,data[i].Bekeken,listYear[j][1]);
                }
            }
            if (!exist){
                doesntExist(data[i].Bestemming, data[i].Bekeken);
            }
        }
        function doesExist(i, nieuwBekeken, oudBekeken){
            listYear[i][1] = nieuwBekeken + oudBekeken;
        }
        function doesntExist(bestemming, bekeken){
            var i = listYear.length;
            listYear[i] = [bestemming, bekeken];
        }
        console.log("list jaar:",listYear);
    });

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data1 = google.visualization.arrayToDataTable(listDag);
    var chart1 = new google.visualization.BarChart(document.getElementById('chart1'));
    chart1.draw(data1);

    var data2 = google.visualization.arrayToDataTable(listMaand);
    var chart2 = new google.visualization.BarChart(document.getElementById('chart2'));
    chart2.draw(data2);

    var data3 = google.visualization.arrayToDataTable(listYear);
    var chart3 = new google.visualization.BarChart(document.getElementById('chart3'));
    chart3.draw(data3);
}