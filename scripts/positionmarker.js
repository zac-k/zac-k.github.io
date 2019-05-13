
			
	function positionMarker(item) {
		
		var centre_offset = 0;
		if(item.nodeName == "LI"){
			centre_offset = $(item).width()/2 - 30;
			
		}
			
		$(item).find('.tooltiptext #before').css('left', $(item).position().left + centre_offset);
		$(item).find('.tooltiptext #after').css('left', $(item).position().left + centre_offset);
		
	}