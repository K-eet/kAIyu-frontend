<template>
  <div class="image-comparison-slider">
    <div class="image-wrapper before-image">
      <img :src="beforeImageSrc" alt="Before" />
      <div class="label top-left">Before</div>
    </div>
    <div
      class="image-wrapper after-image"
      :style="{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }"
    >
      <img :src="afterImageSrc" alt="After" />
      <div class="label top-right">After</div>
    </div>

    <input
      type="range"
      min="0"
      max="100"
      v-model="sliderValue"
      class="slider"
      @input="updateSlider"
    />
    <div class="slider-line" :style="{ left: sliderValue + '%' }"></div>
    <div class="slider-handle" :style="{ left: sliderValue + '%' }">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 6L6 10L10 14"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 18L18 14L14 10"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageComparisonSlider",
  props: {
    beforeImageSrc: {
      type: String,
      required: true,
    },
    afterImageSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sliderValue: 50, // Initial position of the slider (50% for center)
    };
  },
  methods: {
    updateSlider(event) {
      this.sliderValue = parseFloat(event.target.value);
    },
  },
};
</script>

<style scoped>
.image-comparison-slider {
  position: relative;
  width: 100%;
  max-width: 800px; /* Adjust as needed */
  aspect-ratio: 16/9; /* Maintain aspect ratio */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures images cover the area without distortion */
  display: block;
}

.after-image {
  /* Using clip-path for the sliding effect */
  /* The clipPath property will be updated dynamically by the slider */
  clip-path: inset(
    0 50% 0 0
  ); /* Initial clip to show half of the after image */
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-appearance: none; /* Remove default slider styles */
  appearance: none;
  background: transparent;
  outline: none;
  margin: 0;
  cursor: ew-resize;
  z-index: 10;
}

/* Hide thumb for default range input */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
  background: transparent;
  cursor: ew-resize;
}

.slider::-moz-range-thumb {
  width: 0;
  height: 0;
  background: transparent;
  border: none;
  cursor: ew-resize;
}

.slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px; /* Thickness of the slider line */
  background-color: white;
  transform: translateX(-50%); /* Center the line on the slider handle */
  z-index: 9;
  pointer-events: none; /* Make sure it doesn't block slider interaction */
}

.slider-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%); /* Center the handle */
  width: 40px; /* Width of the handle */
  height: 40px; /* Height of the handle */
  background-color: #333; /* Dark background for visibility */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ew-resize;
  z-index: 11;
  pointer-events: none; /* Make sure it doesn't block slider interaction */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.slider-handle svg {
  width: 24px;
  height: 24px;
  color: white; /* Color of the arrows */
}

.label {
  position: absolute;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  border-radius: 4px;
  z-index: 5;
}

.top-left {
  top: 15px;
  left: 15px;
}

.top-right {
  top: 15px;
  right: 15px;
}
</style>
