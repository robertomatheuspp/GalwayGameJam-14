
function Scenes(ctx){
	this.collection = [
		new Light(ctx),
		new Light(ctx),
		new Light(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Pumpkin(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Pumpkin(ctx),
		new Light(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Pumpkin(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Light(ctx),
		new Pumpkin(ctx),
		new Bat(ctx),
		new Demon(ctx),
		new Pumpkin(ctx)
	];
	 
	this.currentscene = Math.floor(Math.random()*this.collection.length) % this.collection.length;

	this.init = function(){
		this.collection = [
			new Light(ctx),
			new Light(ctx),
			new Light(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Pumpkin(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Pumpkin(ctx),
			new Light(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Pumpkin(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Light(ctx),
			new Pumpkin(ctx),
			new Bat(ctx),
			new Demon(ctx),
			new Pumpkin(ctx)
		];
		 
		this.currentscene = Math.floor(Math.random()*this.collection.length) % this.collection.length;
	};

	this.update = function(){
		if(this.collection[this.currentscene].y < -50)
		{
			this.currentscene = Math.floor(Math.random()*this.collection.length) % this.collection.length;
			this.init();
		}
		this.collection[this.currentscene].update();
	};

	this.draw = function(ctx){
		this.collection[this.currentscene].draw(ctx);
	};
}