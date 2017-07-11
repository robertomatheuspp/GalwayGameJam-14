var 

// Sprite vars //
s_player, 
s_background, 
s_star, 
s_pumpkin,
s_bat,
s_demon;

/**
 * Simple sprite class
 * 
 * img    spritesheet image
 * x      x-position in spritesheet
 * y      y-position in spritesheet
 * width  width of sprite 
 * height height of sprite
 */
function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

/**
 * Draw sprite ta canvas context
 * 
 * ctx context used for drawing
 * x   x-position on canvas to draw from
 * y   y-position on canvas to draw from
 */
Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

/**
 * Draw sprite ta canvas context
 * 
 * ctx 		context used for drawing
 * x   		x-position on canvas to draw from
 * y   		y-position on canvas to draw from
 * width   	width of the sprite
 * height   height of the sprite
 */
Sprite.prototype.drawDetailed = function(ctx, x, y, width, height){
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, width, height);
};

/*
 * Initialize Sprites
 *
 * img url of the spriteSheet
 */
function initSprites(img){
	s_player = [
		new Sprite(img, 977, 0, 1035-975, 100),
		new Sprite(img, 860, 0, 918-860, 100),
		new Sprite(img, 918, 0, 975-918, 100)
	];
	s_star = [
		new Sprite(img, 120, 800, 160, 260),
		new Sprite(img, 490, 800, 160, 260)
	];
	s_background = new Sprite(img, 20, 0, 814, 600);
	
	s_pumpkin = [
	 	new Sprite(img, 860, 126, 120, 100),
	 	new Sprite(img, 1024, 114, 140, 112),
	 	new Sprite(img, 1174, 96, 142, 181),
	 	new Sprite(img, 1364, 96, 239, 248)
	];

	s_bat = [
	 	new Sprite(img, 18, 646, 150, 82),
	 	new Sprite(img, 196, 614, 130, 100),
	 	new Sprite(img, 342, 618, 132, 102),
	 	new Sprite(img, 500, 660, 143, 78),
	 	new Sprite(img, 670, 666, 97, 123),
	 	new Sprite(img, 790, 666, 64, 126),
	 	new Sprite(img, 854, 674, 66, 126),
	 	new Sprite(img, 934, 668, 125, 107),
	 	new Sprite(img, 1080, 642, 160, 70)

	];

	s_demon = [
		new Sprite(img, 1346, 802, 125, 85),
	 	new Sprite(img, 1500, 796, 130, 100),
	 	new Sprite(img, 1632, 816, 118, 70),
	 	new Sprite(img, 1784, 808, 128, 74),
	 	new Sprite(img, 1342, 930, 126, 83),
	 	new Sprite(img, 1490, 926, 108, 93),
	 	new Sprite(img, 1640, 920, 130, 65),
	 	new Sprite(img, 1780, 936, 123, 75),
	];
}