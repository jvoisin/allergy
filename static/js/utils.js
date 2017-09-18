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
    const carousel = $('.carousel');
    switch(e.keyCode) {
        case 37:
            carousel.carousel('prev');
            break;
        case 39:
            carousel.carousel('next');
            break;
        default:
            break;
    }
});

$(".clic-card").click(function() { // onclick on cards
    window.location = $(this).find("a").attr("href");
    return false;
});

$(".new-folder").click(function(){
   const name = prompt("Nom du nouveau dossier ?");
   if (name) {
       $.ajax({
           method: "POST",
           url: $('.terminal-crumb')[0].href,
           data: {folder_name: name}
       }).done(function( msg ) {
           location.reload();
       });
   }
});

$('#carouselExampleIndicators').on('slid.bs.carousel', function () { // FIXME gross!!!
    $('#download_btn')[0].href = $('.carousel-item.active img')[0].src;
    $('.carousel-item').removeClass('d-flex align-items-center h100');
    $('.carousel-item.active').addClass('active d-flex align-items-center h100');
});

$('.close-float').click(swap_display);


/* Swipe for touchscreens. */
$(".carousel").on("touchstart", function(event){
    const xClick = event.originalEvent.touches[0].pageX;
    const yClick = event.originalEvent.touches[0].pageY;
    $(this).one("touchmove", function(event){
        const sensitivity_x = Math.floor(xClick - event.originalEvent.touches[0].pageX);
        const sensitivity_y = Math.floor(yClick - event.originalEvent.touches[0].pageY);
        if( sensitivity_x > 5 ){
            $(".carousel").carousel('next');
        } else if( sensitivity_x < -5 ){
            $(".carousel").carousel('prev');
        } else if (sensitivity_y < -5) {
            swap_display();
        }
    });
    $(".carousel").on("touchend", function(){$(this).off("touchmove");});
});



/* Drag'n'drop*/
function cancel(e) {
    if (e.preventDefault) e.preventDefault(); // required by FF + Safari
    e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
    return false; // required by IE
}

document.querySelectorAll('.drop').forEach(function(elem) {
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

document.querySelectorAll('.draggable').forEach(function(elem) {
    elem.addEventListener('drag', function(){
        $('.drop-delete').removeClass('btn-outline-success').addClass('btn-danger').html("Supprimer");
    });
    elem.addEventListener('dragend', function(){
        $('.drop-delete').removeClass('btn-danger').addClass('btn-outline-success').html("Ajouter");
    });
});

document.querySelectorAll('.drop-delete').forEach(function(elem) {
    elem.addEventListener('dragover', cancel);
    elem.addEventListener('dragenter', cancel);
    elem.addEventListener('drop', function (e) {
        if (e.preventDefault)
            e.preventDefault(); // stops the browser from redirecting off to the text.

        const file = e.dataTransfer.getData('text');
        if (true === confirm("Supprimer le fichier " + file + ' ?')){
            $.ajax({
                method: "POST",
                url: "./index.php",
                data: {del: file}
            }).done(function( msg ) {
                $("div[id='col_" + file + "']").remove();
            });
        }

        return false;
    });
});

document.querySelectorAll('.draggable').forEach(function(elem){
    elem.addEventListener('dragstart', function(ev){
        ev.dataTransfer.setData('text', ev.target.alt);
    });
});