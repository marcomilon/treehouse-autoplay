$(function() {

	// Set icon to active state
	chrome.extension.sendMessage({active: "true", fullscreen: "fetch"}, function(response) {
		// Full Screen support
		if (response.fullscreen == "true") {
			goFullscreen();
		}
	});
	
	var video = $("video")[0];
    
    $(video).on('ended',function(){
      var videoURL = $('.button.step-overlay-button.primary.icon-on-right').attr('href');
      setTimeout(function(){
          var videoURL = $('.button.step-overlay-button.primary.icon-on-right').attr('href');
          viewNextVideo(videoURL);
      }, 5000);
    });
	
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