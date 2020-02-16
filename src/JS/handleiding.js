$(document).ready(function () {
    $('#header').load('header.html');
});
$(document).ready(function () {
    $('#footer').load('footer.html');
});

function myInput(){document.getElementsByClassName("outer-box")[0].style.display = "none";
    document.getElementsByClassName("outer-box")[1].style.display = "block";}

function myInput1(){document.getElementsByClassName("outer-box")[0].style.display = "block";
    document.getElementsByClassName("outer-box")[1].style.display = "none";}