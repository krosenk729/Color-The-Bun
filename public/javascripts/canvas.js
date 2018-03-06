(function(){
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.querySelector('body').offsetWidth;
canvas.height = document.querySelector('body').offsetHeight;
canvas.style.width = '100%';
canvas.style.height = '100%';

///////////////////////////////////
// Icon class
///////////////////////////////////

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const Icon = function(img, vel){
  this.icon = new Image();
  this.icon.src = img;
  this.vel = vel;
  this.width = this.icon.src.offsetWidth || 100;
  this.height = this.icon.src.offsetHeight || 100;
  this.x = 0;
  this.y = 0;
}

Icon.prototype.draw = function(){
  ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
}

Icon.prototype.move = function(){
  this.x = newCoord(this.x, mouseX - (this.width/2), 0, canvas.width - this.width, this.vel);
  this.y = newCoord(this.y, mouseY - (this.height/2), 0, canvas.height - this.height, this.vel)
  this.draw();
}

let newCoord = function(oldCoord, newDest, min, max, vel){
  let dir = newDest - oldCoord > 0 ? 1 : -1;
  let val = oldCoord + dir * Math.min(Math.abs(newDest - oldCoord), vel);
  return Math.min(Math.max(val, min), max);
}

///////////////////////////////////
// Canvas Animations
///////////////////////////////////
let mouseX = mouseY = 0;
const icons = [
new Icon('/images/icon_brush.svg', 3.8),
new Icon('/images/icon_dryer.svg', 5),
new Icon('/images/icon_comb.svg', 2.5)
];

const followLoop = function(){
  requestAnimationFrame(followLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  icons.forEach(icon =>{
    icon.move();
  });
}
followLoop();

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
})();