$(".carousel-image").click(function () {
    $('.carousel-item img[src="' + $(this).attr('src') + '"]').parent().addClass('active d-flex align-items-center h100');
    $('.hide-on-slideshow').hide();
    $('.hide-on-mosaic').show();
});

function swap_display(){
    $('.carousel-item').removeClass('active d-flex align-items-center h100');
    $('.hide-on-slideshow').show();
    $('.hide-on-mosaic').hide();
}

$(document).keyup(function(e) {
    if (e.keyCode === 27) { // escape key maps to keycode `27`
        swap_display();
    }
});

$(document).keydown(function(e) {
    switch(e.keyCode) {
        case 37:
            $('.carousel').carousel('prev');
            break;
        case 39:
            $('.carousel').carousel('next');
            break;
        default:
            break;
    }
});
 // onclick on cards
$(".clic-card").click(function() {
    window.location = $(this).find("a").attr("href");
    return false;
});

$(".new-folder").click(function(){
   var $name = prompt("Nom du nouveau dossier ?");
   if($name) {
       $.post('./index.php', {'folder_name': $name}, function (response) {
            location.reload();  // FIXME ajax
       });
   }
});

$('#carouselExampleIndicators').on('slid.bs.carousel', function () { // FIXME gross!!!
    $('#download_btn')[0].href = $('.carousel-item.active img')[0].src;
    $('.carousel-item').removeClass('d-flex align-items-center h100');
    $('.carousel-item.active').addClass('active d-flex align-items-center h100');
});


/* Swipe for touchscreens. */
$(".carousel").on("touchstart", function(event){
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        const sensitivity = Math.floor(xClick - event.originalEvent.touches[0].pageX);
        if( sensitivity > 5 ){
            $(".carousel").carousel('next');
        } else if( sensitivity < -5 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
        $(this).off("touchmove");
    });
});

$('.close-float').click(swap_display);

/* Drag'n'drop*/
function cancel(e) {
    if (e.preventDefault) e.preventDefault(); // required by FF + Safari
    e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
    return false; // required by IE
}

document.querySelectorAll('.drop').forEach(function(elem){
    elem.addEventListener('dragover', cancel);
    elem.addEventListener('dragenter', cancel);
    elem.addEventListener('drop', function (e) {
        if (e.preventDefault)
            e.preventDefault(); // stops the browser from redirecting off to the text.

        const from = e.dataTransfer.getData('text');
        const to = elem.id + '/' + from.split('/').pop();
        $.ajax({
            method: "POST",
            url: "./index.php",
            data: {move_from: from, move_to: to}
        }).done(function( msg ) {
            $("div[id='col_" + from + "']").remove();
        });
        return false;
    });
});

document.querySelectorAll('.draggable').forEach(function(elem){
    elem.addEventListener('dragstart', function(ev){
        ev.dataTransfer.setData('text', ev.target.alt);
    });
});


// https://html5demos.com/drag-anything/#view-source

