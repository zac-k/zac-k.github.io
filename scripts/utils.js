
			
	function positionMarker(item) {
		
		var centre_offset = 0;
		if(item.nodeName == "LI"){
			centre_offset = $(item).width()/2 - 30;
			
		}
			
		$(item).find('.tooltiptext #before').css('left', $(item).position().left + centre_offset);
		$(item).find('.tooltiptext #after').css('left', $(item).position().left + centre_offset);
	}
	
	function enableOverlay(item) {
		return;
		
		$(item).css('z-index', 5)
		$(item).css('z-index', 5)
		//$(item).children().each(function(){$(this).css('z-index', 5);})
	    $(document).find('.overlay').css('opacity', 0.6);
		
		parent.postMessage({label: 'overlay', value:true}, '*');
	}
	
	
	
	function disableOverlay(item) {
		return;
		$(item).css('z-index', 0)
		$(document).find('.overlay').css('opacity', 0);
		
		// $(item).children().each(function(){
			// $(item).css('opacity', 0);
			// })
		
		
		parent.postMessage({label: 'overlay', value:false}, '*');
	}
	
	function generateTrack(track_num) {
		
		var div = document.createElement("div");
		div.class = "tooltip";
		div.onmouseover = "positionMarker(this); enableOverlay(this)";
		div.onmouseout = "disableOverlay(this);";
		
		var iframe = document.createElement("iframe");
		iframe.scrolling = "no";
		iframe.id = "hearthis_at_track_" + track_num.toString();
		iframe.width = "100%";
		iframe.height = "130";
		iframe.src = "https://hearthis.at/embed/" + track_num.toString() + "/transparent/?hcolor=005c61&color=00b0bb&style=2&block_size=5&block_space=2&background=0&waveform=0&cover=1&autoplay=0&css=";
		
		
		
	}