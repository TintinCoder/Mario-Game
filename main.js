let video;
let posenet;
let noseX = 0;
let noseY = 0;

function preload() {
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas')
	instializeInSetup(mario);

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent('game_console');

	posenet = ml5.poseNet(video, modelLoaded);
	posenet.on('pose', gotPoses)
}

function modelLoaded(){
	console.log("The poseNet model is loaded. And ready to work")
}

function gotPoses(results){
	try {
		if(results.length > 0){
			let result = results[0].pose.nose;
			noseX = result.x;
			noseY = result.y;
		}
	} catch (error) {
		console.log(error)
	}
}

function draw() {
	game()
}