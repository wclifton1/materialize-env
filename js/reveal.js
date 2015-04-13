$(document).ready(function () {
    $(".reveal").hover(function() {
        $(this).toggleClass("light-blue lighten-3");},
        function(){
        $(this).toggleClass("light-blue lighten-3");
    })
    
    var click = false;
    $(".reveal").click(function () {
        var next = $(this).next();
        var same = $(this)
        if(click===false) {
            $(next).slideDown("fast");
            click = true;
        } else{
            $(next).slideUp("fast");
            click = false;
        }
    }) 
})
