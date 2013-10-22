

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,onFail);
    }
    
    function gotFS(fileSystem){
    	console.log("filesystem successful");
    	fileSystem.root.getFile("dummy.html",{create:true, exclusive:false},gotFileEntry, onFail);
    }
    
    function gotFileEntry(fileEntry){
    	console.log("fileEntry was successful");
    	fileEntry.file(gotFile,onFail);
    	var sPath = fileEntry.fullPath.replace("dummy.html","");
    	console.log("This" + sPath);
    	var fileTransfer = new FileTransfer();
    	fileEntry.remove();
    	
    	var uri = encodeURI("http://www.oneplace.com/ministries/thru-the-bible-with-j-vernon-mcgee/listen/acts-214-47-287635/direct-download/thru-the-bible-with-j-_2012-07-10_acts-214-47_20120620195205.mp3
");
    	
    	fileTransfer.download(
    		uri,
    		sPath + "thetest.mp3",
    		function(entry){
    			alert("download complete: " + entry.fullPath);
    		},
    		
    		function(error){
    			alert("download error source" + error.source);
    			alert("download error target" + error.target);
    			alert("upload error code" + error.code);
    		}
    		
    	);
    }
    
    
    
    function gotFile(file){
    	console.log("gotFile successful");
    }
    

	// Called if something bad happens.
    // 
    function onFail(message) {
      alert('Finding File Failed');
    }
    
