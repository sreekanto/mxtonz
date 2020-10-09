$(function(){
	//animaion on scroll
	AOS.init();
	//scroll target menu

	$('#menu-navber li a').on('click', function(event) {
  		if (this.hash !== "") {
    	event.preventDefault();
    	var hash = this.hash;
		$('html, body').animate({
	      scrollTop: $(hash).offset().top - 50
	    }, 800, function(){
	      	//window.location.hash = hash;
	    });
	  }
	});
	  //testimonial slider
    $('#testimonialSlider').owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        center: true,
        responsive: {
            0: {
              items: 1
            },
            768: {
              items: 2,
            },
            992: {
              items: 3
            }
        }
    });
});