const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas1');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.overflow = 'hidden';
const ctx = canvas.getContext('2d');
const particleArray = [];
const maxNumberofParticle = 5000;

const image = new Image();
image.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAB4CAMAAACJp+2jAAAAPFBMVEVeTDDVLR4DejOkXizbVhgohlWCciARpM0toaPlehF5oySHoFhvqILnnQncsRW/xhz3xADHwqvVx2v+4ABLVsirAAACtUlEQVR42u3ZyZKcMAwGYLyBF7y//7tGMk3PVJJLDl0pMb+Lgxtf+JAs2/SmHtQ2YIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggPnhmPmgBsw/tfpHRyym1rchxvocTI1ROiY+B1NT731wb/SRPp1nH8WUvnHr3F/dyyUSU7ZXo+j0V3cvYtNs1LRvmzG3ZR9N7pxpQ8e4X45dRz2EzplBD96UiomWl5VesabY7xFpkaGMIoylEkahKZGaG1wA2pAWGX77Nk+rTI9x21KiAMVe+ujZfi4220emPVWy0KzKIdAq4/1x0HUO6tesbAtU0eqQEpmRKS6KMHn2xI7z9ERKfRbCqDBbHnLSLKtAzxwoQOPwvmRqxR8+UUhCUCGrPCVhLAdgTk2EnIO1IWcKkaZbgceEYRRjojvZwkfakMvhXVyYIAwT1tvXx5EYY4yyOdP00Wssy4tMnpUwNF2C1tpRnhXKs3qloCRMYEyb1fGM2YlCHCoDx+HqWklFYewXpmiOC2s0FbQbYwVh1I05vf7W/HljlDQMLfOOpvy3RuWsvgelYO6XzwVgJdi5po27FppX2ARh1Hr5xSfKs7NfGPpR5GHu5205cWh6d3F3HJiUm9A5E3hP5tPhTscYdyTPe7QgDWM5zezaX9L2f1U0PgisHec1JmrRXFsAXv0NxWYdaJI3ge+o175NDIYrAG2b1x7TuuOkI83h2MB3ODRNEGaG698fWuqNMdHsu4m7MWtjsLbQsj5ohHWGKZkspXJAajHcv8420r7OlELXAtRpW7OzLsy6Le1T0+uhsylt8gcZS9EoJr8HhH03+3rkG/P7fUGYbwUrr+svA2Iw/6E9C6Mf1IABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAHmh2N+AexDlxJVZkjCAAAAAElFTkSuQmCC';

image.addEventListener('load', () => {
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this._x = Math.random() * canvas.width;
      this._y = Math.random() * canvas.width;
      this.size = Math.random() * 1.5 + 2;
      this.velocity = Math.random() * 3.5 + 5;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this._x, this._y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    updatePosition() {
      this._y += this.velocity;

      if (this._y > this.canvas.height) {
        this._y = 0;
        this._x = Math.random() * this.canvas.width;
      }
    }
  }
  const init = () => {
    for (let index = 0; index < maxNumberofParticle; index++) {
      particleArray.push(new Particle(canvas));
    }
  };

  const animate = () => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((particle) => {
      particle.updatePosition();
      particle.draw(ctx);
    });
    // ctx.restore();
    requestAnimationFrame(() => animate());
  };

  init();
  animate();
});
