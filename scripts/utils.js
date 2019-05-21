
	overlay_enabled = false;
	function positionMarker(item) {
		
		var centre_offset = 0;
		if(item.nodeName == "LI"){
			centre_offset = $(item).width()/2 - 30;
			
		}
			
		$(item).find('.tooltiptext #before').css('left', $(item).position().left + centre_offset);
		$(item).find('.tooltiptext #after').css('left', $(item).position().left + centre_offset);
	}
	
	function enableOverlay(item) {
		
		if(overlay_enabled) {
			$(item).parent().children().each(function(){$(this).css('z-index', -1);})
			$(item).css('z-index', 5)
			$(document).find('.overlay').css('opacity', 0.6);
			
			parent.postMessage({label: 'overlay', value:true}, '*');
	    }
	}
	
	
	
	function disableOverlay(item) {
		if(overlay_enabled) {
			$(item).css('z-index', 0)
			$(document).find('.overlay').css('opacity', 0);
			
			// $(item).children().each(function(){
				// $(item).css('opacity', 0);
				// })
			
			
			parent.postMessage({label: 'overlay', value:false}, '*');
		}
	}
	
	function addCvFormats(item) {
		
		var frmts = [{'url': "cv/LaTeX/Zac Kemp - Resume.pdf", 'txt': "PDF (best for printing)"},
					 {'url': "cv/Zac Kemp - Resume.docx", 'txt': "Word"},
					 {'url': "cv/Zac Kemp - Resume.txt", 'txt': "Plain text"}];
					 
		for( var i = 0; i < frmts.length; i++){
			var tmp = document.createElement('li');
			tmp.className = "right-align cv-formats";
			var tmp_a = document.createElement('a');
			tmp_a.href = frmts[i].url;
			tmp_a.innerHTML = frmts[i].txt;
			tmp.appendChild(tmp_a);
			$(item).parent().append(tmp);
		}
	}
	
	function removeCvFormats(item) {	
			$(item).parent().find(".cv-formats").each( function(){
				$(this).remove();
			});
	}
	
	function generateTrack(track_num, track_name, track_url, track_comment, position, source_url) {
		
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
			case "l":
				tooltip.className += ' pos_l';
				break;
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
		
		if(typeof source_url !== "undefined") {
			var ttlink = document.createElement("div");
			ttlink.setAttribute('class', "tooltiplink");
			var tt_anchor = document.createElement("a");
			tt_anchor.setAttribute('href', source_url);
			tt_anchor.setAttribute('target', "_blank");
			tt_anchor.innerHTML = "Source vocals";
			ttlink.appendChild(tt_anchor);
			outer.appendChild(ttlink);
		}
		
		$('#main').append(outer);
		
		
		
	}
	
	function sendHeight(elem) {
	    /* Send page height data to the parent */
        var msg = {};
		switch (typeof elem){
            case "undefined":
				var height = document.getElementsByTagName("BODY")[0].scrollHeight;
                msg.label = 'height';
				msg.value = height;
				break;
			case "string":
                msg.label = 'height';
				msg.value = elem;
				break;
            case "object":
                msg = elem;
                if(!msg.hasOwnProperty('value')){
                    var height = document.getElementsByTagName("BODY")[0].scrollHeight;
                    msg.value = height;
                }
		}
		msg.label = 'height';
        //console.log("height msg sent to parent: " + msg);
		parent.postMessage(msg, '*');

	}
	
	function sendTitle() {
		
		var doc_title_script = 'document.title = "' + String(document.title) + '"';
		parent.postMessage({label: 'script', value: doc_title_script}, '*');	
	}
	
	
	function setActive(item) {
		$(item).parent().find('.list_item').each(function(){$(this).removeClass('active');$(this).find('a').removeClass('active');});
		$(item).addClass('active');
		$(item).find('a').addClass('active');
		if(item.id==="cv"){
			addCvFormats(item);
		}else{
			removeCvFormats(item);
		}
		
	}
	
	
	function setGenre(elem) {
	    var elem_id ="#" + elem + "Frame";
		console.log($(elem_id));
		$(elem_id).show(); // This line not working for some reason!
		$(elem_id).addClass('active');

		$('.musicFrame').each(
			function(){
			    if(this.id!==elem+"Frame"){
                    $(this).removeClass('active');
					$(this).hide();
				}
			}
		);
		sendHeight();
	}
	
	function setDataStellarBackgroundRatio(elem) {
		var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
		if (true) {
			var dsbr = 2;
		}else{
			var dsbr = 0.5;
		}
		elem.setAttribute("data-stellar-background-ratio",  dsbr);
			
		
		
	}
	
	function generateBanner(elem_id, rat, pos) {
		var browser = detectBrowser();
		
		/* 
		For some reason the ratio needs to be +1 on Chrome and Safari
		when background_attachment is 'fixed'.
		*/
		// if(pos==='fixed'){
			// switch(browser.name){
				// case 'Chrome':
					// rat += 1;
					// break;
				// case 'Safari':
					// rat += 1;
				// default:
					// break;							
			// }
		//}
		
		
		
		
		banner = document.createElement("div");
		banner.setAttribute("id",  elem_id);		
		banner.setAttribute("background-attachment", pos);
		
		/* Do not enable parallax effect on Safari */
		if(browser.name!=='Safari'){
			banner.setAttribute("data-stellar-background-ratio",  rat);			
		}
		$('#main_header').append(banner);
			
		
		
	}
	
	function detectBrowser(){
		// Acknowlegement: https://stackoverflow.com/a/2401861/2326764
		var ua= navigator.userAgent, tem,
		M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\b(OPR|Edge?)\/(\d+)/);
			if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		var browser = {'name': M[0], 'version': M[1]}
		return browser;
	}
	