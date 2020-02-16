function datumVandaag(){
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
    return year + "-" + month + "-" + day;
}
function tijdVandaag(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month
    }
    var day = d.getDay();
    if (day < 10) {
        day = '0' + day
    }
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getMinutes();
    return year + "-" + month + "-" + day +
        " " + hour + ":" + minute + ":" + second;
}