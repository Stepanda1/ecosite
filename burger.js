$(document).ready(function () {
    $('.menu-burger').click(function (event) {
        $('.menu-burger, .menu-elements').toggleClass('active');
        $('body').toggleClass('lock');
    });
});