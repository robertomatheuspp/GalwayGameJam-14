var

menuMusic,
gameOverMusic,
batSound,
lightSound,
pumpkinSound;


function loadAudios(){
	menuMusic = loader.loadSound('assets/audios/game_music');
	gameOverMusic = loader.loadSound('assets/audios/gameOver');
	batSound = loader.loadSound('assets/audios/BatFlap');
	lightSound = loader.loadSound('assets/audios/LightSparkle');
	pumpkinSound = loader.loadSound('assets/audios/pump_sound')
}


var loader = {
	loaded:true,
	loadedCount:0, // Assets that have been loaded so far
	totalCount:0, // Total number of assets that need to be loaded
	
	init:function(){
		// check for sound support
		var mp3Support,oggSupport;
		var audio = document.createElement('audio');
		if (audio.canPlayType) {
	   		// Currently canPlayType() returns: "", "maybe" or "probably" 
	  		mp3Support = "" != audio.canPlayType('audio/mpeg');
	  		oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
		} else {
			//The audio tag is not supported
			mp3Support = false;
			oggSupport = false;	
		}

		// Check for ogg, then mp3, and finally set soundFileExtn to undefined
		loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;	

		loadAudios();	
	},
	soundFileExtn:".ogg",
	loadSound:function(url){
		this.totalCount++;
		this.loaded = false;
		var audio = new Audio();
		audio.src = url+loader.soundFileExtn;
		audio.addEventListener("canplaythrough", loader.itemLoaded, false);
		return audio;   
	},
	itemLoaded:function(){
		loader.loadedCount++;
		if (loader.loadedCount === loader.totalCount){
			loader.loaded = true;
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
			}
		}
	}
}