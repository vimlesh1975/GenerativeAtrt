const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
document.body.style.overflow = 'hidden';

const ctx = canvas.getContext('2d');
ctx.lineWidth = 1;
ctx.strokeStyle = `black`;

// console.log(ctx);
const maxNumberofBlocks = 75;
var blockArray = [];
var mouseDown = false;

class Block {
  constructor() {
    this._xPos = Math.random() * window.innerWidth;
    this._yPos = Math.random() * window.innerHeight;
    this.color = `hsla(${Math.random() * 255}, 100%, 50%, 1)`;
    this.speedX = Math.random() * 20 - 10;
    this.speedY = Math.random() * 20 - 10;
    this.width = Math.random() * 50;
    this.height = Math.random() * 50;
    this.lifetime = Math.random() * 1000;
    this.history = [{ x: this._xPos, y: this._yPos }];
    this.angle = 0;
    this.maxNumberofHistory = Math.random() * 30 + 20;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this._xPos, this._yPos, this.width, this.height);
    ctx.beginPath();
    ctx.arc(this._xPos, this._yPos, this.width, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
  drawTrail(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
      ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    this.lifetime--;
    this.angle += 1;
    this._xPos += this.speedX + 5 * Math.sin(this.angle) + 5;
    if (this._yPos < 0 || this._yPos > window.innerHeight - this.height) {
      this.speedY = -this.speedY;
    }

    this._yPos += this.speedY + 5 * Math.cos(this.angle) + 4;
    if (this._xPos < 0 || this._xPos > window.innerWidth - this.width) {
      this.speedX = -this.speedX;
    }
    this.history.push({ x: this._xPos, y: this._yPos });
    if (this.history.length > this.maxNumberofHistory) {
      this.history.shift();
    }
  }
}

for (let index = 0; index < maxNumberofBlocks; index++) {
  blockArray.push(new Block());
}

const animate = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  const newBlockArray = blockArray.filter((block) => block.lifetime > 0);

  blockArray = [...newBlockArray];
  blockArray.forEach((block) => {
    block.draw(ctx);
    block.update();
    block.drawTrail(ctx);

    // draw lines
    blockArray.forEach((aa) => {
      const dx = block._xPos - aa._xPos;
      const dy = block._yPos - aa._yPos;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200) {
        ctx.moveTo(block._xPos, block._yPos);
        ctx.lineTo(aa._xPos, aa._yPos);
        ctx.save();
        ctx.strokeStyle = aa.color;
        ctx.stroke();
        ctx.restore();
      }
    });
  });
  requestAnimationFrame(animate);
};
animate();

window.addEventListener('click', (e) => {
  const aa = new Block();
  aa._xPos = e.x;
  aa._yPos = e.y;
  aa.history = [{ x: aa._xPos, y: aa._yPos }];
  blockArray.push(aa);
});

window.addEventListener('mousemove', (e) => {
  if (mouseDown && blockArray.length < maxNumberofBlocks) {
    const aa = new Block();
    aa._xPos = e.x;
    aa._yPos = e.y;
    aa.history = [{ x: aa._xPos, y: aa._yPos }];
    blockArray.push(aa);
  }
});
window.addEventListener('mousedown', (e) => {
  mouseDown = true;
});
window.addEventListener('mouseup', (e) => {
  mouseDown = false;
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  blockArray = [];
});

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
