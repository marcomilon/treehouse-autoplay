$(function() {
	
	// Set icon to active state
	chrome.extension.sendMessage({active: "true", fullscreen: "fetch"}, function(response) {
		// Full Screen support
		if (response.fullscreen == "true") {
			goFullscreen();
		}
	});
	
	var nextVideo;
	
	var video = $("video")[0];
	if (video) {
		video.play();

		$(video).bind('timeupdate', function() {
			if (video.ended == true) {
				viewNextVideo(nextVideo);
			}
		})
	}
	
	var list = $("ul.objects-videos");
	var currentTitle = $("h2")[0].innerText;

	var numVideos = list.children().length;
	var saveVideo = false;
	
	for (i = 0; i < numVideos; i++) {
		vid = list.children('li')[i];
		
		if (saveVideo == true) {
			nextVideo = vid.children[0].href;
			saveVideo = false;
		}
		
		if (vid.className == 'playing-item') {
			saveVideo = true;
		}
	}
	
	// Reset icon when we leave the page
	$(window).unload(function() {
		chrome.extension.sendMessage({active: "false"}, function(response) {});
	});
	
});

function viewNextVideo(url) {
	if (url != undefined) {
		window.location = url;
	}
}

function goFullscreen() {
	$('.mejs-fullscreen-button button').click();
}