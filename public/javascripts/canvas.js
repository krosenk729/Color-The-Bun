const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = document.querySelector('body').offsetWidth;
let height = canvas.height = document.querySelector('body').offsetHeight;

const icon_1 = new Image();
const icon_2 = new Image();
const icon_3 = new Image();

icon_1.src = '/images/icon_brush.svg';
icon_2.src = '/images/icon_dryer.svg';
icon_3.src = '/images/icon_comb.svg';

function follow(mouse) {
  // console.log(mouse);
  // console.log(mouse.clientX, mouse.layerX, mouse.offsetX, mouse.x, mouse.pageX, mouse.movementX);
  // console.log(mouse.clientX, mouse.movementX);
  let wx = wh = 100;
  let mx = Math.max( Math.min(mouse.clientX, width - wx), 0);
  let my = Math.max( Math.min(mouse.clientY, height - wh), 0);
  
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(icon_1, mx, my,  wx, wh);
  ctx.drawImage(icon_2, mx, my, wx, wh);;
  ctx.drawImage(icon_3, mx, my, wx, wh);

}

window.addEventListener('resize', (e) =>{
  width = canvas.width = document.querySelector('body').offsetWidth;
  height = canvas.height = document.querySelector('body').offsetHeight;
});


window.addEventListener('mousemove', (e) => {
  follow(e);
});
