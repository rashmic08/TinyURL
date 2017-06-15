$(document).ready(function () {
	
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	       
	    	 $('#submit').trigger('click');
	    	
	    }
	});

	$("button").click(function () {
		var url = $('#url-field').val();
		var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		var urltest = urlRegex.test(url);
		if (urltest) {
			bit_url(url);
		}
		else {
			alert("Bad URL");
		}
	});
});

function unique(arr) {
	var hashTable = {};

	return arr.filter(function (el) {
		var key = JSON.stringify(el);
		var match = Boolean(hashTable[key]);
		return (match ? false : hashTable[key] = true);
	});
}

function bit_url(url) {
	origUrl = url;
	var username = "rashmic"; // 
	var key = "R_049f0d491d5b40339091caf53c75e784";
	$.ajax({
		url: "http://api.bit.ly/v3/shorten",
		data: { longUrl: origUrl, apiKey: key, login: username },
		dataType: "jsonp",
		success: function (v) {

			var tinyURL = v.data.url;			
			$("#link").html('<a href="' + tinyURL + '" target="_blank">' + tinyURL + '</a>');

			var links;
			try {
				links = JSON.parse(localStorage.getItem('myLinks')) || [];
			} catch (ex) {
				links = [];
			}
			links.push({ url, tinyURL });
			
			var uniqueURL= unique(links);
			if(uniqueURL.length>10)
            uniqueURL.splice(0,1);
			
			localStorage.setItem('myLinks', JSON.stringify(uniqueURL));
			
			$("table").html("<tr><th class='row-ID'>Original URL</th><th class='row-name'>Tiny URL</th></tr>");
			uniqueURL.forEach(link => {
				$("table").append("<tr><td>" + '<a href="' + link.url + '" target="_blank">' + link.url + '</a>' + "</td><td>" + '<a href="' + link.tinyURL + '" target="_blank">' + link.tinyURL + '</a>' + "</td></tr>");

			});

			//localStorage.clear();
		}


	});

}