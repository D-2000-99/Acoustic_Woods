let start_button = document.querySelector('#start');
let start = false;
//document.body.style.filter = 'blur = 4px';
start_button.addEventListener(('click'), function(e)
{
	bg = document.querySelector('#bg_img');
	bg.style.filter = "blur(0px)";

	start_button.remove();

	let seconds = 0;
	let check = false;
	let forest = new Audio('Audio/Forest.mp3');
	let mute = false;

	function time_keeper()
	{
		seconds += 1;
		return seconds;
	}

	function checker(seconds)
	{
		if((seconds/2)%1){return true;}
		else{return false;}
	}

	function mute_Audio()
	{
		if(mute)
		{
			forest.volume = 0;
		}
		else
		{
			forest.volume = 0.6;
		}
	}

	function Forest_Audio()//Plays Ambient sounds
	{
		forest.loop = true;
		forest.play();
		forest.volume = 0.6;
	}

	class Person{
		constructor()
		{
			this.vertical = 0;
			this.horizontal = 0;
			this.character = document.querySelector('#obj');
			this.character.style.filter = "blur(0px)";
			this.state = this.character.src = `Sprites/Front_1.png`;
		}

		sprite_switch(dir, count)
		{
			if (count){this.character.src = `Sprites/${dir}_1.png`;}
			else {this.character.src = `Sprites/${dir}_2.png`;}
		}

		change(dir){
			let count = checker(seconds);
			this.sprite_switch(dir, count);
		}

		walk(dir){
			this.change(`${dir}`);

			if (dir=='Back'){this.vertical-=10;}
			if (dir=='Left'){this.horizontal-=10;}
			if (dir=='Right'){this.horizontal+=10;}
			if (dir=='Front'){this.vertical+=10;}

			this.character.style.top = `${this.vertical}px`;
			this.character.style.left = `${this.horizontal}px`;	
		}


		walk_Audio()
		{	
			if(mute==false){
				let walk_choice = "";
				if(Math.random() >=0.5){walk_choice = "Walking_1"}
				else{walk_choice = "Walking_2"}
				if (walk_sound)
				{
					this.walking = new Audio(`Audio/${walk_choice}.mp3`);
					this.walking.volume = 0.2;
					this.walking.play();
				}
			}
		}

		stop_walk_Audio()
		{
			if(mute==false){
			this.walking.pause();
			}
		}
		

		rock()
		{
			this.change("Guitar");
			if (allow_play && mute==false)
			{
				this.guitar = new Audio('Audio/Guitar.mp3');
				this.guitar.play();
				forest.volume = 0.2
			}
		}

		stop_rock()
		{
			if(mute==false)
			{
				this.guitar.pause();
				forest.volume = 0.6
			}
		}
	}

	seconds = setInterval(time_keeper, 200);//Refreshing every 200ms
	let guy = new Person();//The guy
	let allow_play=true, walk_sound = true ;
	window.addEventListener('keydown', function(e){
		switch(e.code)
		{
			case("KeyW")	: 	console.log("up!");
								if(guy.vertical>0){	guy.walk("Back"); }
								guy.walk_Audio()
								walk_sound = false;
								break;
			
			case("KeyA")	: 	console.log("left!");
								if(guy.horizontal>0){ guy.walk("Left"); }
								guy.walk_Audio()
								walk_sound = false;
								break;
			
			case("KeyS")	: 	console.log("down!");
								if(guy.vertical<screen.height-10){guy.walk("Front");}
								guy.walk_Audio()
								walk_sound = false;
								break;
			
			case("KeyD")	: 	console.log("right!");
								if(guy.horizontal<screen.width-10){guy.walk("Right");}
								guy.walk_Audio()
								walk_sound = false;
								break;

			case("KeyG")	: 	guy.rock();
								allow_play = false;
								//Forest_Audio_change(allow_play);
								break;
		}
	}
	)

	window.addEventListener('keyup', function(e){
		switch(e.code)
		{
			case("KeyW")	: 	console.log("up!");
								guy.character.src = `Sprites/Back_1.png`;
								guy.stop_walk_Audio();
								walk_sound = true;
								break;
			
			case("KeyA")	: 	console.log("left!");
								guy.character.src = `Sprites/Left_1.png`;
								guy.stop_walk_Audio();
								walk_sound = true;
								break;
			
			case("KeyS")	: 	console.log("down!");
								guy.character.src = `Sprites/Front_1.png`;
								guy.stop_walk_Audio();
								walk_sound = true;
								break;
			
			case("KeyD")	: 	console.log("right!");
								guy.character.src = `Sprites/Right_1.png`;
								guy.stop_walk_Audio();
								walk_sound = true;
								break;

			case("KeyG")	: 	console.log("Stopped rocking :P");
								guy.stop_rock();
								guy.character.src = `Sprites/Front_1.png`;
								allow_play = true;
								//Forest_Audio_change(allow_play);
								break;
		}
	}

	)

	window.addEventListener('click', function(e)
	{
		Forest_Audio();
	})

	window.addEventListener('keypress', function(e)
	{
		if(e.code=='KeyM')
		{
			mute = !mute;
			console.log("Mute: ", mute);
			mute_Audio();
		}
	}
	)
});