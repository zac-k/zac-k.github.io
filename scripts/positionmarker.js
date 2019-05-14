
			
	function positionMarker(item) {
		
		var centre_offset = 0;
		if(item.nodeName == "LI"){
			centre_offset = $(item).width()/2 - 30;
			
		}
			
		$(item).find('.tooltiptext #before').css('left', $(item).position().left + centre_offset);
		$(item).find('.tooltiptext #after').css('left', $(item).position().left + centre_offset);
		$(item).css('z-index', 5)
		$(item).css('z-index', 5)
		//// $(item).children().each(function(){$(this).css('z-index', 5);})
	    $(document).find('.overlay').css('opacity', 0.6);
		
		parent.postMessage({label: 'overlay', value:true}, '*');
	}
	
	function resetOverlay(item) {
		$(item).css('z-index', 0)
		$(document).find('.overlay').css('opacity', 0);
		
		// $(item).children().each(function(){
			// $(item).css('opacity', 0);
			// })
		
		
		parent.postMessage({label: 'overlay', value:false}, '*');
	}