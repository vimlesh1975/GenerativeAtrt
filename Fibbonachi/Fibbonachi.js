const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.overflow = 'hidden';
const ctx = canvas.getContext('2d');
let number = 0;
let scale = 10;

class Fibbonachi {
  constructor() {
    this.angle = number * 9;
    this.radius = scale * Math.sqrt(number);
    this.x = this.radius * Math.sin(this.angle) + canvas.width / 2;
    this.y = this.radius * Math.cos(this.angle) + canvas.height / 2;
    this.hue = Math.random() * 360;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 7, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = `hsl(${this.hue},100%,50%)`;
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
  update() {
    this.angle = number * 9;
    this.radius = scale * Math.sqrt(number);
    this.x = this.radius * Math.sin(this.angle) + canvas.width / 2;
    this.y = this.radius * Math.cos(this.angle) + canvas.height / 2;
    this.hue = Math.random() * 360;
    this.hue += 0.5;
    number += 1;
  }
}

const aa = new Fibbonachi();

const animate = () => {
  aa.update();
  aa.draw(ctx);

  requestAnimationFrame(() => animate());
};
animate();
