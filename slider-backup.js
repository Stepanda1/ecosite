$(document).ready(function () {
    $('.slider').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: false,
        speed: 1000,
        easing: 'ease',
        touchThreshold: 20
    });
});