
$(window).on("load",function() {
  function fade(pageLoad) {
	/* windowTop is adjusted here by 200px to cause the img to start fading straight away */
    var windowTop=$(window).scrollTop()+200, windowBottom=windowTop+$(window).innerHeight();
    var min=0.0, max=1.0, threshold=0.01;
    
	var windowLeft=$(window).scrollLeft()-274, windowRight=windowLeft+$(window).innerWidth();
	var hmin=0.0, hmax=1.0, hthreshold=0.01;
	
	var opacityv, opacityh;
	
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectHeight=$(this).outerHeight(), objectTop=$(this).offset().top, objectBottom=$(this).offset().top+objectHeight;
      
      /* Fade element in/out based on its visible percentage  */
      if (objectTop < windowTop) {
        if (objectBottom > windowTop) {opacityv=min+((max-min)*((objectBottom-windowTop)/objectHeight));}
        else if ($(this).css("opacity")>=min+threshold || pageLoad) {opacityv=min;}
      } else if (objectBottom > windowBottom) {
        if (objectTop < windowBottom) {opacity=min+((max-min)*((windowBottom-objectTop)/objectHeight));}
        else if ($(this).css("opacity")>=min+threshold || pageLoad) {opacityv=min;}
      } else if ($(this).css("opacity")<=max-threshold || pageLoad) {opacityv=max;}
	
	  
	  var objectWidth=$(this).outerWidth(), objectLeft=$(this).offset().left, objectRight=$(this).offset().left+objectWidth;
	  /* Fade element in/out based on its visible percentage */
      if (objectLeft < windowLeft) {
        if (objectRight > windowLeft) {opacityh=hmin+((hmax-hmin)*((objectRight-windowLeft)/objectWidth));}
        else if ($(this).css("opacity")>=hmin+hthreshold || pageLoad) {opacity=hmin;}
      } else if (objectRight > windowRight) {
        if (objectRight < windowRight) {opacityh=hmin+((hmax-hmin)*((windowRight-objectLeft)/objectWidth));}
        else if ($(this).css("opacity")>=hmin+hthreshold || pageLoad) {opacityh=hmin;}
      } else if ($(this).css("opacity")<=hmax-hthreshold || pageLoad) {opacityh=hmax;}
	  
	  /* Set the opacity equal to the lower of the two opacities */
	  if (opacityv > opacityh){
		  opacity=opacityh
	  }else{
		  opacity=opacityv
	  }
	 
	  /* The second half of the code above is intended to set an opacity for horizontal resizing and scrolling
	  but is not working properly. The following opacity is set to opacityv (instead of opacity) until I work
	  out what is wrong */
	  $(this).fadeTo(0,opacityv)
    });
  } fade(true); //fade elements on page-load
  $(window).scroll(function(){fade(false);}); //fade elements on scroll
  $(window).resize(function(){fade(false);}); //fade elements on resize
});
		