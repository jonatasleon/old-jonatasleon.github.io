"use strict";

$(document).ready(function() {
    $("#next-page").click(function() {
        $("html, body").animate({
            scrollTop: $("article#main").offset().top
        }, 2000);
    });
});
