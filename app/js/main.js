$(document).ready(function(){
    $('.slick-carousel').slick({
        autoplay: true,
        autoplaySpeed: 500,
        arrows: false,
        initialSlide: 9,
        slidesToShow: 8,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        variableWidth: true
    });
    $('.slick-carousel .bottom').slick({
        autoplay: true,
        autoplaySpeed: 500,
        arrows: false,
        initialSlide: 9,
        slidesToShow: 8,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        variableWidth: true
    });
})
AOS.init({
    duration: 1200
});
