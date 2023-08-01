const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
document.body.style.overflow = 'hidden';

const ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
console.log(ctx);
const maxNumberofBlocks = 100;
const blockArray = [];

class Block {
  constructor() {
    this._xPos = Math.random() * window.innerWidth;
    this._yPos = Math.random() * window.innerHeight;
    this.color = `hsla(${Math.random() * 255}, 100%, 50%,${Math.random()})`;
    this.speedX = Math.random() * 20 - 10;
    this.speedY = Math.random() * 20 - 10;
    this.width = Math.random() * 50;
    this.height = Math.random() * 50;
    this.lifetime = Math.random() * 1000;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this._xPos, this._yPos, this.width, this.height);
    ctx.beginPath();
    ctx.arc(this._xPos, this._yPos, this.width, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
  update() {
    this.lifetime--;

    this._xPos += this.speedX;
    if (this._yPos < 0 || this._yPos > window.innerHeight - this.height) {
      this.speedY = -this.speedY;
    }

    this._yPos += this.speedY;
    if (this._xPos < 0 || this._xPos > window.innerWidth - this.width) {
      this.speedX = -this.speedX;
    }
  }
}

window;

for (let index = 0; index < maxNumberofBlocks; index++) {
  blockArray.push(new Block());
}

const animate = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  const newBlockArray = blockArray.filter((block) => block.lifetime > 0);
  if (newBlockArray.length < maxNumberofBlocks) {
    blockArray.push(new Block());
  }

  newBlockArray.forEach((block) => {
    block.draw(ctx);
    block.update();
  });

  requestAnimationFrame(animate);
};
animate();
