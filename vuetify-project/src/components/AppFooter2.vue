<template>
  <v-footer class="wave-footer" app>
    <div class="footer-fade"></div>
    <canvas ref="waveCanvas" class="wave-canvas"></canvas>
  </v-footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const waveCanvas = ref(null);
let animationId = null;
let waves = [];

// Enhanced color palette with vertical fade
const colors = [
  { color: "#353535", startOpacity: 0.2, endOpacity: 0 },
  { color: "#3C6E71", startOpacity: 0.25, endOpacity: 0 },
  { color: "#FFFFFF", startOpacity: 0.15, endOpacity: 0 },
  { color: "#D9D9D9", startOpacity: 0.18, endOpacity: 0 },
  { color: "#284B63", startOpacity: 0.3, endOpacity: 0 },
];

class Wave {
  constructor(
    canvas,
    color,
    startOpacity,
    endOpacity,
    speed,
    amplitude,
    frequency,
    offset
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = color;
    this.startOpacity = startOpacity;
    this.endOpacity = endOpacity;
    this.speed = speed;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.offset = offset;
    this.time = 0;
  }

  update() {
    this.time += this.speed;
  }

  draw() {
    const { width, height } = this.canvas;
    const centerY = height * 0.3;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, height);

    // Create vertical gradient for fade effect
    const waveGradient = this.ctx.createLinearGradient(0, centerY, 0, height);
    waveGradient.addColorStop(
      0,
      `rgba(${this.hexToRgb(this.color)}, ${this.startOpacity})`
    );
    waveGradient.addColorStop(
      1,
      `rgba(${this.hexToRgb(this.color)}, ${this.endOpacity})`
    );

    this.ctx.fillStyle = waveGradient;

    // Draw wave path
    for (let x = 0; x <= width; x += 2) {
      const y =
        centerY +
        Math.sin(x * this.frequency + this.time + this.offset) * this.amplitude;
      this.ctx.lineTo(x, y);
    }

    this.ctx.lineTo(width, height);
    this.ctx.lineTo(0, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }
}

const initWaves = () => {
  const canvas = waveCanvas.value;
  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create waves with different properties
  waves = [
    new Wave(
      canvas,
      colors[0].color,
      colors[0].startOpacity,
      colors[0].endOpacity,
      0.01,
      30,
      0.01,
      0
    ),
    new Wave(
      canvas,
      colors[1].color,
      colors[1].startOpacity,
      colors[1].endOpacity,
      0.015,
      25,
      0.008,
      Math.PI / 4
    ),
    new Wave(
      canvas,
      colors[2].color,
      colors[2].startOpacity,
      colors[2].endOpacity,
      0.008,
      35,
      0.012,
      Math.PI / 2
    ),
    new Wave(
      canvas,
      colors[3].color,
      colors[3].startOpacity,
      colors[3].endOpacity,
      0.012,
      20,
      0.015,
      Math.PI / 3
    ),
    new Wave(
      canvas,
      colors[4].color,
      colors[4].startOpacity,
      colors[4].endOpacity,
      0.02,
      40,
      0.006,
      Math.PI
    ),
  ];

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background with vertical fade
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, "rgba(40, 75, 99, 0.8)"); // #284B63
    bgGradient.addColorStop(0.7, "rgba(53, 53, 53, 0.4)"); // #353535
    bgGradient.addColorStop(1, "rgba(53, 53, 53, 0)"); // Fully transparent at bottom

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw waves
    waves.forEach((wave) => {
      wave.update();
      wave.draw();
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();
};

onMounted(() => {
  initWaves();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<style scoped>
.footer-fade {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--v-theme-background) 100%
  );
  pointer-events: none;
  z-index: 99;
}
.wave-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  padding: 0;
  margin: 0;
  z-index: 100;
  pointer-events: none; /* Allows clicks to pass through when transparent */
}

.wave-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Content padding adjustment */
.v-application__wrap {
  padding-bottom: 180px !important; /* Slightly less than footer height for fade effect */
}
</style>
