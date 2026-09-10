/**
 * WALTAKUN 2026 - Celebration Confetti & Sparkle Cannons
 * -------------------------------------------------------
 * Multi-cannon burst of Champagne Gold, Royal Crimson, and Amber
 * ribbons upon successful launch of either website.
 */

class ConfettiEngine {
  constructor() {
    this.canvas = document.getElementById("confetti-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animationFrame = null;
    this.resize();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 200) {
    if (!this.canvas) return;
    this.resize();

    const colors = [
      "#fbee9e", // Champagne Gold (from logo)
      "#f4d76a", // Warm Gold
      "#e5b84c", // Rich Gold
      "#a3152d", // Royal Crimson
      "#780e1e", // Deep Velvet Maroon
      "#ffffff", // Shimmering White
      "#ffd166"  // Sun Gold
    ];

    // Left cannon
    for (let i = 0; i < count / 2; i++) {
      this.particles.push(new ConfettiParticle(
        0,
        this.canvas.height * 0.85,
        Math.PI * 0.28 + (Math.random() - 0.5) * 0.45,
        Math.random() * 28 + 18,
        colors[Math.floor(Math.random() * colors.length)]
      ));
    }

    // Right cannon
    for (let i = 0; i < count / 2; i++) {
      this.particles.push(new ConfettiParticle(
        this.canvas.width,
        this.canvas.height * 0.85,
        Math.PI * 0.72 + (Math.random() - 0.5) * 0.45,
        Math.random() * 28 + 18,
        colors[Math.floor(Math.random() * colors.length)]
      ));
    }

    // Center grand arch fountain
    for (let i = 0; i < count * 0.7; i++) {
      this.particles.push(new ConfettiParticle(
        this.canvas.width * 0.5 + (Math.random() - 0.5) * 220,
        this.canvas.height * 0.9,
        Math.PI * 0.5 + (Math.random() - 0.5) * 0.65,
        Math.random() * 30 + 20,
        colors[Math.floor(Math.random() * colors.length)]
      ));
    }

    if (!this.animationFrame) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);

      if (p.y > this.canvas.height + 50 || p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.animationFrame = null;
    }
  }
}

class ConfettiParticle {
  constructor(x, y, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = -Math.sin(angle) * speed;
    this.color = color;
    this.size = Math.random() * 8 + 6;
    this.length = Math.random() * 15 + 10;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 20;
    this.gravity = 0.52;
    this.drag = 0.976;
    this.alpha = 1;
    this.fade = Math.random() * 0.003 + 0.002;
    this.wobble = 0;
    this.wobbleSpeed = Math.random() * 0.16 + 0.06;
  }

  update() {
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.wobble += this.wobbleSpeed;
    this.alpha = Math.max(0, this.alpha - this.fade);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.scale(Math.cos(this.wobble), 1);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.length / 2, this.size, this.length);
    ctx.restore();
  }
}

window.confettiEngine = new ConfettiEngine();
