var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// rectangles
// c.fillStyle = 'rgba(50, 255, 30, 0.35)';
// c.fillRect(100, 100, 500, 500);
// c.fillStyle = 'rgba(0, 255, 255, 0.7)';
// c.fillRect(700, 500, 300, 300);
// //lines
// c.beginPath();
// c.moveTo(200, 400);
// c.lineTo(300, 300);
// c.strokeStyle = "#cc23c6";
// c.stroke();
// // arc / circle
// //c.beginPath(400, 450);
// //c.arc(400, 600, 170, 0, Math.PI * 2, false);
// //c.strokeStyle = 'red';
// //c.stroke();

// //for loop to create 15 circles
// for (var i = 0; i < 15; i++) {
// 	//random x and y locations
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	//random circle sizes
// 	var z = Math.random() * 100;
// 	c.beginPath();
// 	c.arc(x, y, z, 0, Math.PI * 2, false);
// 	//random colors
// 	c.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
// 	c.stroke();
// }

//creating mouse object
var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 20;
var minRadius = 1;
var numCircles = 100;
//changes speed of the the circles
var circSpeed = 8;
// Google the term 'Kuler' to find a website with good color palettes!
var colorArray = [
	'#004056',
	'#2C858D',
	'#74CEB7',
	'#C9FFD5',
	'#13D6CC',
	'#138B78',
	'#63C296',
	'#A4FF10',
	'#D5FFA9',
	'#D5FFA9',
	'#1CC7C0'
];

// event listener
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;		
})
// event listener to resize
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//calls function init to geneerate circles
	//when window is resized. Comment init();
	//out for cool effect when resizing window
	init();
})

//object orientated, created a circle object
function Circle(x, y, dx, dy, radius, color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	//used to make sure circles go back to their original size
	this.minRadius = radius;
	//gives a random color from colorArray,
	//Math.floor gives an integer value,
	//without this a decimal value would be 
	//returned and no colors would appear!
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	//anonymous function, doesn't have a name, 
	//just the contents included inside of it
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// c.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
		this.dy = -this.dy;
		}

		this.x+=this.dx;
		this.y+=this.dy;

		// interactivity:
		// if the circles are within 50 pixels to the left
		// or right of the mouse they interact
		if (mouse.x -  this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if(this.radius < maxRadius){
			this.radius += 1;
		}
		}else if(this.radius > this.minRadius){ //this.minRadius so circles go back to their original size
			this.radius -= 1;
		}

		this.draw();
	}
}

var circleArray = [];

function init(){
	//calling this again to reset the number of circles,
	//without this the number of circles multiplies, thus
	//making the program lag!
	circleArray = [];
	for(var i=0; i<numCircles; i++){
		                        //The parts directly below keep the 
		                        //circles from getting stuck in the
		                        //sides of the canvas
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5 ) * circSpeed; //using circle speed variable here
		var dy = (Math.random() - 0.5 ) * circSpeed; 
		// var radius = minRadius;
		var radius = Math.random() * 3 + 1; // this ensures a minimum radius of at least one and at most 4
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}

animate();
init();

console.log(canvas);