<template>
  <div class="transform-slider" ref="sliderRef">
    <!-- After Image (left side) -->
    <img
      :src="after"
      class="slider-img"
      :style="{ clipPath: `inset(0 0 0 ${sliderPosition}% )` }"
      alt="After"
    />
    <!-- Before Image (right side) -->
    <img
      :src="before"
      class="slider-img"
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      alt="Before"
    />

    <!-- Labels -->
    <span class="slider-label after-label">Before</span>
    <span class="slider-label before-label">After</span>

    <!-- Slider Handle -->
    <div
      class="slider-handle"
      :style="{ left: `${sliderPosition}%` }"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
    >
      <span class="slider-circle">
        <span class="slider-arrow">&#60;</span>
        <span class="slider-arrow">&#62;</span>
      </span>
    </div>

    <!-- Centered Content Slot -->
    <div class="slider-center-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";

const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
  initial: { type: Number, default: 50 }, // percent
});

const sliderPosition = ref(props.initial);
const dragging = ref(false);
const sliderRef = ref(null);

function onDrag(e) {
  if (!dragging.value) return;
  let clientX;
  if (e.touches) {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }
  const rect = sliderRef.value.getBoundingClientRect();
  let percent = ((clientX - rect.left) / rect.width) * 100;
  percent = Math.max(0, Math.min(100, percent));
  sliderPosition.value = percent;
}

function startDrag(e) {
  dragging.value = true;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function stopDrag() {
  dragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
}

onBeforeUnmount(stopDrag);
</script>

<style scoped>
.transform-slider {
  position: relative;
  width: 100%;
  max-width: 1800px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  overflow: hidden;
  background: #222;
  user-select: none;
}
.slider-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: clip-path 0.15s;
  z-index: 1;
}
.slider-label {
  position: absolute;
  top: 24px;
  padding: 8px 22px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
  z-index: 3;
  pointer-events: none;
}
.after-label {
  left: 24px;
}
.before-label {
  right: 24px;
}
.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 44px;
  margin-left: -22px;
  z-index: 5;
  cursor: ew-resize;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 50%;
  transition: left 0.15s;
}
.slider-circle {
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #4a2511;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.slider-arrow {
  color: #4a2511;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 2px;
  user-select: none;
}
.slider-center-content {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  color: #fff;
  text-align: center;
  width: 90%;
  pointer-events: none;
  text-shadow: 0 2px 8px #0007;
}
@media (max-width: 900px) {
  .transform-slider {
    max-width: 100vw;
  }
  .slider-label {
    font-size: 0.95rem;
    padding: 6px 14px;
  }
  .slider-handle,
  .slider-circle {
    width: 36px;
    height: 36px;
  }
}
</style>
