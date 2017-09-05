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
        $('.carousel-item').removeClass('active d-flex align-items-center h100');
        $('.hide-on-slideshow').show();
        $('.hide-on-mosaic').hide();
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

$('.close-float').click(swap_display);