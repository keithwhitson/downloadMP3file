// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used!
//
function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onFail);
}

function gotFS(fileSystem) {
	console.log("filesystem successful");
	fileSystem.root.getFile("dummy.html", {
		create : true,
		exclusive : false
	}, gotFileEntry, onFail);
}

function gotFileEntry(fileEntry) {
	console.log("fileEntry was successful");
	fileEntry.file(gotFile, onFail);
	var sPath = fileEntry.fullPath.replace("dummy.html", "");
	console.log("This" + sPath);
	var fileTransfer = new FileTransfer();
	fileEntry.remove();

	var uri = encodeURI("http://keithwhitson.biz/testCordova/Acts1.26-2.13.mp3");

	fileTransfer.download(uri, sPath + "thetest.mp3", function(entry) {
		alert("download complete: " + entry.fullPath);
	}, function(error) {
		alert("download error source" + error.source);
		alert("download error target" + error.target);
		alert("upload error code" + error.code);
	});

var statusDom = document.getElementById("statusDom");

	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "% loaded...";
		} else {
			if (statusDom.innerHTML == "") {
				statusDom.innerHTML = "Loading";
			} else {
				statusDom.innerHTML += ".";
			}
		}
	};
}

function gotFile(file) {
	console.log("gotFile successful");
}

// Called if something bad happens.
//
function onFail(message) {
	alert('Finding File Failed');
}

