function FadeOut(){
	this.x = 0;
	this.y = 0;
	this.textAlpha = 0;

	this.update = function(){
		if(this.textAlpha<0.45){
			this.textAlpha += 0.02;
		}
	};

	this.draw = function(ctx){
		ctx.fillStyle = "rgba(0, 0, 0, " + this.textAlpha + ")";
		ctx.fillRect(this.x, this.y, width, height);
	};
}

function Background(){
	this.x = 0;
	this.y = -30;

	this.update = function(){
		this.y -= player.velocityY;
		if(Math.abs(background.y) >= s_background.height -20){
			this.y = -30;
		}
	}

	this.draw = function(ctx){
		for (var i = 0; i < 3; i++) {
			s_background.draw(ctx, this.x, this.y + (s_background.height - 50)*i);
		};
	}
}

function Player(){
	this.x = 350;
	this.y = -100;

	this.velocityX = 10;
	this.velocityY = 5;

	this.gravity = 0.0000001;

	this.state = 0;
	this.states = {
		Center : 0, 
		Left: 1,
		Right: 2,
		CatchLight: 3,
		Dead: 4
	};

	this.rect = new Rect(0,0,0,0);

	this.update = function (){
		this.rect.update(this.x, this.y, s_player[0]);
		this.velocityY += this.gravity;
		if(this.y < 100){
			this.y += 2;
		}

		if(this.y >= 120){
			this.y -= 2.5;
		}

	}

	this.draw = function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);
		if(this.state==this.states.Center){
			s_player[0].draw(ctx, -s_player[0].width/2, -s_player[0].height/2);
		}
		else if(this.state==this.states.Left){
			s_player[1].draw(ctx, -s_player[1].width/2, -s_player[1].height/2);
		}
		else if(this.state==this.states.Right){
			s_player[2].draw(ctx, -s_player[2].width/2, -s_player[2].height/2);
		}
		ctx.restore();
		this.rect.draw(ctx);
	}

	/*
	 * direction: -1 (esquerda), 1 (direita)
	 * velocidade: velocidade do movimento
	*/
	this.move = function (direction){
		if (direction == -1)
		{
			if (108 < this.x - s_player[0].width/2)
				this.x -= this.velocityX;
		}
		else if (direction == 1)
		{
			if (800 - 133 > this.x + s_player[0].width/2)
				this.x += this.velocityX;
		}
		if (direction == 0)
		{
			if (this.y < 500)
				this.y += this.velocityY;
		}
	}
}

function Light()
{
	this.x = 382;
	this.y = 680;

	this.velocityX = 10;
	this.velocityY = 9;
	this.animation = [0, 1];
	this.frame = 0;

	this.gravity = 0.0000001;

	this.state = 0;
	this.showCount = 0;

	this.states = {
		hidden: 0,
		isShown: 1,
		isCatched: 2
	};

	this.alive = true;

	this.rect = new Rect(0,0,0,0);


	this.update = function ()
	{
		if(frames % 8 == 0){
			this.frame++;
		}
		this.frame %= this.animation.length;

		var n = this.animation[this.frame];
		this.rect.update(this.x, this.y, s_star[n]);

		if (frames % 10 == 0)//20 segundos +- sao 1000 frames
			this.state = this.states.isShown;
		else if (frames % 2400 == 0)
			this.state = this.states.hidden;

		if (100 < this.x + this.velocityX*Math.cos(frames/20) && this.x + this.velocityX*Math.cos(frames/20) < 650)
			this.x += this.velocityX*Math.cos(frames/20);
		this.y += this.velocityY*Math.cos(frames/40);	
		this.y -= 1;

		if(this.y < -50){
			this.alive = false;
		}

		if(this.alive)
		{
			if(this.rect.collidedWith(player.rect) && 0 <= frames % 80 && frames % 80 <= 40)
			{
				this.alive = false;
				wonGame();

			}	
			//lightSound.play();
		}
		else {
			//lightSound.play = false;
			// lightSound.pause();
		}
	}

	this.draw = function(ctx)
	{
		if (this.state == this.states.isShown)
		{
			if(this.alive  &&  0 <= frames % 80 && frames % 80 <= 40)
			{
				var n =  this.animation[this.frame];
				ctx.save();
				ctx.translate(this.x, this.y);
				s_star[n].draw(ctx, -s_star[n].width/2, -s_star[n].height/2);
				ctx.restore();
				this.rect.draw(ctx);
			}
		}
	}
}

function Pumpkin()
{
	this.x = 382;
	this.y = 600;

	this.velocityX = 5;
	this.velocityY = 1;
	this.animation = [0, 1, 2, 3];
	this.frame = 0;
	this.direction =  Math.floor(Math.random()*2) % 2;


	this.alive = true;

	this.rect = new Rect(0,0,0,0);


	this.update = function ()
	{
		if(frames % 8 == 0){
			this.frame++;
		}
		this.frame %= this.animation.length;

		var n = this.animation[this.frame];
		this.rect.update(this.x, this.y, s_pumpkin[n]);

		if (this.direction == 1)
		{	
			if (180 < this.x - 10*Math.cos(frames/20) && this.x - 10*Math.cos(frames/20) < 600)
				this.x -= 10*Math.cos(frames/20);
		}
		else 
		{
			if (180 < this.x + 10*Math.cos(frames/20) && this.x + 10*Math.cos(frames/20) < 600)
				this.x += 10*Math.cos(frames/20);			
		}

		this.y += 10*Math.cos(frames/20);
		
		if(this.y > 300){
			this.y -= 2;
		}

		if(this.y < -50){
			this.alive = false;
		}

		if(this.alive){
			if(this.rect.collidedWith(player.rect)){
				endGame();
			}
		}
	}

	this.draw = function(ctx)
	{
		if(this.alive){
			var n =  this.animation[this.frame];
			ctx.save();
			ctx.translate(this.x, this.y);
			s_pumpkin[n].draw(ctx, -s_pumpkin[n].width/2, -s_pumpkin[n].height/2);
			ctx.restore();
			this.rect.draw(ctx);	
			pumpkinSound.play();
		}
		else {
			pumpkinSound.currentTime = 0;
			pumpkinSound.pause();
		}
	}
}

function Bat()
{
	this.x = 382;
	this.y = 680;

	this.velocityX = 5;
	this.velocityY = 1;
	this.animation = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	this.frame = 0;

	this.alive = true;

	this.rect = new Rect(0,0,0,0);


	this.update = function ()
	{
		if(frames % 8 == 0){
			this.frame++;
		}
		this.frame %= this.animation.length;

		var n = this.animation[this.frame];
		this.rect.update(this.x, this.y, s_bat[n]);

		this.y += 2.5*Math.cos(frames/40);	
		this.y -= 1;

		if (100 + s_bat[n].width/2 < this.x + 10*Math.cos(frames/20) && this.x + 10*Math.cos(frames/20) < 650)
		{
			this.x += 10*Math.cos(frames/20);
		}

		if(this.y < -50){
			this.alive = false;
		}

		if(this.alive){
			if(this.rect.collidedWith(player.rect)){
				endGame();
			}
		}
	}

	this.draw = function(ctx)
	{
		if(this.alive){
			var n =  this.animation[this.frame];
			ctx.save();
			ctx.translate(this.x, this.y);
			s_bat[n].draw(ctx, -s_bat[n].width/2, -s_bat[n].height/2);
			ctx.restore();
			this.rect.draw(ctx);	
			batSound.play();
		}
		else {
			batSound.currentTime = 0;
			batSound.pause();
		}
	}
}

function Demon()
{
	this.x = 582;
	this.y = 680;

	this.velocityX = 5;
	this.velocityY = 1;
	this.animation = [0, 1, 2, 3, 4, 5, 6, 7];
	this.frame = 0;

	this.alive = true;

	this.rect = new Rect(0,0,0,0);


	this.update = function ()
	{
		if(frames % 8 == 0){
			this.frame++;
		}
		this.frame %= this.animation.length;

		var n = this.animation[this.frame];
		this.rect.update(this.x, this.y, s_demon[n]);

		if ( 100 < this.x + 10*Math.cos(frames/20) && this.x + 10*Math.cos(frames/20) < 610)
			this.x += 10*Math.cos(frames/20);

		this.y += 2.5*Math.cos(frames/40);	
		this.y -= 1;

		if(this.y < -50){
			this.alive = false;
		}

		if(this.alive){
			if(this.rect.collidedWith(player.rect)){
				endGame();
			}
		}
	}

	this.draw = function(ctx)
	{
		if(this.alive){
			var n =  this.animation[this.frame];
			ctx.save();
			ctx.translate(this.x, this.y);
			s_demon[n].draw(ctx, -s_demon[n].width/2, -s_demon[n].height/2);
			ctx.restore();
			this.rect.draw(ctx);
			batSound.play();
		}
		else {
			batSound.currentTime = 0;
			batSound.pause();
		}
	}
}

function GameTitle(title, size){
	this.x = 120;
	this.y = 120;
	this.frames = 0;

	this.textAlpha = 1;
	this.title = title;
	this.size = size;
	this.blur = 5;

	this.update = function()
	{
		this.x += 4*Math.cos(this.frames/20);
		this.y += Math.cos(this.frames/30);
		this.textAlpha = Math.abs(Math.cos(this.frames/30));
		this.blur = 10*Math.cos(this.frames/10);

		this.frames ++;
	};

	this.draw = function(ctx){
		ctx.save();
		ctx.shadowColor = 'yellow';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = this.blur;
		ctx.fillStyle = "rgba(255, 205, 205, 1)";
		ctx.font = this.size + "px Georgia";
		ctx.fillText(this.title, this.x, this.y);
		ctx.restore();

		ctx.fillStyle = "rgba(205, 205, 255, " + this.textAlpha + ")";
		ctx.font = "25px Georgia";
		ctx.fillText("Press Spacebar", 300, 310);
	};
}

function PauseTitle(ctx, x, y, size){
	this.x = x;
	this.y = y;
	this.textAlpha = 0;
	this.textSize = size;

	this.update = function(){
		this.textAlpha = Math.abs(Math.cos(frames/20));
	};

	this.draw = function(ctx){
		ctx.fillStyle = "rgba(50, 0, 0, " + this.textAlpha + ")";
		ctx.font = this.textSize + "px Georgia";
		ctx.fillText("Paused", this.x, this.y);
	}
}

function GameOverTitle(size){
	this.x = 200;
	this.y = 120;
	this.frames = 0;

	this.textAlpha = 0;
	this.textSize = size;

	this.update = function()
	{
		this.x += 4*Math.cos(this.frames/20);
		this.y += Math.cos(this.frames/30);
		this.textAlpha = Math.abs(Math.cos(this.frames/30));
		this.blur = 10*Math.cos(this.frames/10);

		this.frames ++;
	};

	this.draw = function(ctx){
		ctx.save();
		ctx.shadowColor = 'red';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 25;
		ctx.fillStyle = "rgba(12, 34, 56, " + this.textAlpha + ")";
		ctx.font = this.textSize + "px Georgia";
		ctx.fillText("Game Over", this.x, this.y);
		ctx.restore();

		ctx.fillStyle = "rgba(200, 200, 200, " + this.textAlpha + ")";
		ctx.font = this.textSize*2/10 + "px Calibri";
		ctx.fillText("Press R to Restart", this.x, this.y + 50);
		ctx.fillText("Press M to Menu", this.x + 280, this.y + 50);

	}
}

function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

Rect.prototype.update = function(x, y, sprite){

	var width = sprite.width;
	var height = sprite.height;

	if(sprite == s_star[0]){
		rectScale = 1.5/10;
	}
	else if (sprite == s_star[1]){
		rectScale = 1/10;
	}
	else {
		rectScale = 8/10;
	}

	this.x = x - width/2*rectScale;;
	this.y = y - height/2*rectScale;;
	this.width = width*rectScale;
	this.height = height*rectScale;

}

Rect.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgba(255, 255, 255, 0)";
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Rect.prototype.collidedWith = function(rect){
	var collision = false;
	
	if(this.width>0&&this.height>0&&rect.width>0&&rect.height>0){
		collision = !(
			this.x > (rect.x + rect.width) ||
			(this.x + this.width) < rect.x ||
			this.y > (rect.y + rect.height) ||
			(this.y + this.height) < rect.y
		);	
	}

	return collision;
}