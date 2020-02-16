var list = new Array();
databaseManager
    .query("SELECT Land, COUNT(*) as Amount FROM profielen GROUP BY Land")
    .done(function(data) {
        console.log("data:", data);
        list[0] = ['Land', 'Aantal'];
        for (var i = 0; i < data.length; i++){
            if (data[i].Land) {
                list[i + 1] = [data[i].Land, data[i].Amount];
            }else{
                list[i + 1] = ["Not specified", data[i].Amount];
            }
        }
    })
    .fail(function(reason) {
        console.log(reason);
    });


google.charts.load('current', {'packages':['corechart'], 'language': 'nl'});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable(list);
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data);
}