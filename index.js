const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const particles = [];

function createParticles() {
  const radius = Math.random() * 2 + 1;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const angle = Math.random() * Math.PI * 2;
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  };
  particles.push(new Particle(x, y, radius, color, velocity));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();
    if (particle.radius < 0.1) {
      particles.splice(index, 1);
    }
  });

  createParticles();
}

animate();
