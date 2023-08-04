const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
];
var animationState = 'idle';
var newSelect = document.createElement('select');
document.body.appendChild(newSelect);

const spriteWidth = 575;
const spriteHeight = 523;
var frameX = 0;
var frameY = 0;
var numberofFrames = 7;
const stagger = 5;
var count = 0;

animationStates.forEach((val) => {
  const animationStatedropDown = document.createElement('option');
  animationStatedropDown.value = val.name;
  animationStatedropDown.text = val.name;
  newSelect.appendChild(animationStatedropDown);
});

newSelect.addEventListener('change', (e) => {
  frameY = animationStates.findIndex((val) => val.name === e.target.value);
  numberofFrames = animationStates[frameY].frames;
  frameX = 0;
});
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
document.body.appendChild(canvas);
document.body.style.overflow = 'hidden';
// set width
canvas.width = window.innerWidth;
// set height
canvas.height = window.innerHeight;
// get context 2d from the canvas element and store it in a variable called ctx for short
var ctx = canvas.getContext('2d');
const aa = new Image();
aa.src = 'shadow_dog.png';

aa.addEventListener('load', () => {
  const animate = () => {
    if (count % stagger === 0) {
      if (frameX > numberofFrames - 1) {
        frameX = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        aa,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
      );
      frameX++;
    }
    count++;
    requestAnimationFrame(animate);
  };

  animate();
});
