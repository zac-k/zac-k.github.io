
			
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
	
	function generateTrack(track_num, track_name, track_url, track_comment, position) {
		
		var outer = document.createElement("div");
		outer.setAttribute('class', 'tooltip');
		outer.setAttribute('onmouseover', "positionMarker(this); enableOverlay(this)");
		outer.setAttribute('onmouseout', "disableOverlay(this);");
		
		var iframe = document.createElement("iframe");
		iframe.setAttribute('class', 'music');	
		iframe.setAttribute('scrolling', "no");
		iframe.setAttribute('id', "hearthis_at_track_" + track_num.toString());
		// iframe.setAttribute('width', "100%");
		// iframe.setAttribute('height', "130");		
		iframe.setAttribute('src', "https://hearthis.at/embed/" + track_num.toString() + "/transparent/?hcolor=005c61&color=00b0bb&style=2&block_size=5&block_space=2&background=0&waveform=0&cover=1&autoplay=0&css=");
		iframe.setAttribute('frameborder', "0");
		// iframe.allowtransparency = "true"; // <- not sure if this is needed for anything
		iframe.setAttribute('allow', "autoplay");		
		
		
		iframe.innerHTML = "<p>Listen to <a href='https://hearthis.at/zac-kemp/" + track_url + "/' target='_blank'>" + track_name + "</a> <span>by</span><a href='https://hearthis.at/zac-kemp/' target='_blank' >Zac Kemp</a> <span>on</span> <a href='https://hearthis.at/' target='_blank'>hearthis.at</a></p>"
		
		var tooltip = document.createElement("span");
		tooltip.setAttribute('class', 'tooltiptext');
		switch(position){
			case "c":
				tooltip.className += ' pos_c';
				break;
			case "r":
				tooltip.className += ' pos_r';
				break;
		}
		tooltip.innerHTML = "<div id='before'> </div><div id='after'></div>" + track_comment;
		
		outer.appendChild(iframe);
		outer.appendChild(tooltip);
		console.log(outer);
		$('#main').append(outer);
		
		
		
	}