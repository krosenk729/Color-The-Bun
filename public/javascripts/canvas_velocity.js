const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.querySelector('body').offsetWidth;
canvas.height = document.querySelector('body').offsetHeight;

///////////////////////////////////
// Icon class
///////////////////////////////////

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const Icon = function(img, offset, vel){
  this.icon = new Image();
  this.icon.src = img;
  this.offset = offset;
  this.vel = vel;
  this.width = 100;
  this.height = 100;
  this.x = 0;
  this.y = 0;
}

Icon.prototype.draw = function(){
  ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
}

Icon.prototype.move = function(){
  if(this.x !== mouseX && this.y != mouseY){ 
    this.x = newCoord(this.x, mouseX, 0, 100, this.vel);
    this.y = newCoord(this.y, mouseY, 0, 100, this.vel)
  }
  this.draw();
  // this.move(mouseX, mouseY);
  // setTimeout(()=> this.move(mouseX, mouseY), 3000);
  // let dirX = mouseX - this.x < 0 ? -1 : 1;
  // let moveX = dirX * Math.min(this.vel , Math.abs(mouseX - this.x));
  // this.x = Math.min(Math.max(0, this.x + moveX), canvas.width);

  // let dirY = mouseY - this.y < 0 ? -1 : 1;
  // let moveY = dirY * Math.min(this.vel , Math.abs(mouseY - this.y));
  // this.y = Math.min(Math.max(0, this.y + moveY), canvas.height);
}

let newCoord = function(oldCoord, newDest, min, max, vel){
  let dir = newDest - oldCoord > 0 ? 1 : -1;
  return oldCoord + dir * Math.min(Math.abs(newDest - oldCoord), vel);
}

///////////////////////////////////
// Canvas Animations
///////////////////////////////////
let mouseX = mouseY = 0;
const icons = [
  new Icon('images/icon_brush.svg', 2, 10),
  new Icon('images/icon_dryer.svg', 2, 12),
  new Icon('images/icon_comb.svg', 2, 15)
];

const followLoop = function(){
  requestAnimationFrame(followLoop);
  console.log(mouseX, mouseY);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  icons.forEach(icon =>{
    icon.move();
  });
}
followLoop();

window.addEventListener('resize', (e) =>{
  width = canvas.width = document.querySelector('body').offsetWidth;
  height = canvas.height = document.querySelector('body').offsetHeight;
});

window.addEventListener('mousemove', (e) => {
  // follow(e.clientX, e.clientY);
  mouseX = e.clientX;
  mouseY = e.clientY;
  // window.requestAnimationFrame(followLoop);
});
