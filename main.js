
function selectColor(colorNum, colors){
  if (colors < 1) colors = 1; 
  return "hsl(" + (colorNum * (360 / colors) % 360) + ",100%,50%)";
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

class Shapes {
  constructor(){
    this.x = 30;
    this.y = 30;
    this.size = Math.floor(Math.random() * 20) + 15;
    this.vx = Math.random() * 10;
    this.vy = Math.random() * 10;
    this.color = selectColor(Math.floor(Math.random() * 999), 100);
  }
}

class Square extends Shapes{
  constructor(){
    super();
    this.name = 'Square';
  }
  
  area(){
    var areaSquare = Math.round(Math.pow(this.size, 2));
    return areaSquare;
  }
}

class Circle extends Shapes{
  constructor(){
    super();
    this.name = 'Circle';
  }

  area(){
    var areaCircle = Math.round(Math.PI*(Math.pow(this.size, 2)));
    return areaCircle;
  }
}

var shapes = [];

let timerId = setInterval(function(){
      var newBall = new Circle();
      var newSq = new Square();
      if(shapes.length < 10){
        shapes.push(newBall);
      } else{
        shapes.push(newSq);
      }
     
  if(shapes.length === 20){
    clearInterval(timerId);
  }
},5000);

function borderCheck(newShapes){
  if(newShapes.y + newShapes.vy > canvas.height - newShapes.size || newShapes.y + newShapes.vy < newShapes.size) {
    newShapes.vy = -newShapes.vy;
  }

  if(newShapes.x + newShapes.vx > canvas.width - newShapes.size || newShapes.x + newShapes.vx < newShapes.size){
    newShapes.vx = - newShapes.vx;
  }
}

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  var newShapes = shapes.sort(function(){
    return Math.random() - 0.5;
  });
  for(var i = 0; i< newShapes.length; i++) {
   if(newShapes[i].name === 'Circle'){
    ctx.beginPath();
    ctx.arc(newShapes[i].x, newShapes[i].y, newShapes[i].size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = newShapes[i].color;
    ctx.fill();
    newShapes[i].x += newShapes[i].vx;
    newShapes[i].y += newShapes[i].vy;
    borderCheck(newShapes[i]);
   } else {
     ctx.beginPath();
     ctx.rect(newShapes[i].x, newShapes[i].y, newShapes[i].size, newShapes[i].size);
     ctx.fillStyle = newShapes[i].color;
     ctx.fill();
     ctx.closePath();
     newShapes[i].x += newShapes[i].vx;
     newShapes[i].y += newShapes[i].vy;
     borderCheck(newShapes[i]);
   }
}
    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', function(e) {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
});
