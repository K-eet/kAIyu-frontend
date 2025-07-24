<template>
  <AppNav />

  <div
    class="landing-hero"
    ref="heroSection"
    style="max-width: 1600px; margin-top: 25px"
  >
    <img ref="heroImg" :src="heroImage" alt="Hero" class="hero-img" />
    <div class="hero-content">
      <div class="text-background">
        <h1>Welcome to kAIyu</h1>
        <h2>Your vision, our expertise</h2>
      </div>
    </div>
  </div>

  <v-container height="80" :fluid="true" style="padding: 0"></v-container>

  <!-- How it works -->
  <HowItWorks></HowItWorks>
  <v-container height="40" :fluid="true" style="padding: 0"></v-container>

  <v-app>
    <v-container fluid class="pa-0 mb-5" style="background; min-height: 80vh">
      <v-row
        align="center"
        justify="center"
        class="landing-hero-row"
        style="min-height: 80vh"
      >
        <!-- Left: Text Content -->
        <v-col cols="12" md="6" class="d-flex flex-column justify-center pa-16">
          <h3 class="how-title">Transform your space with AI</h3>
          <p class="mb-4">
            Upload a photo of your room, choose your style preference, and watch
            as AI transforms your space with carefully selected furniture ready
            to shop.
          </p>
          <div class="button-row">
            <v-btn
              color="#E6D6C2"
              class="mr-4 hero-btn"
              style="color: #4a2511"
              large
              to="/generate"
            >
              Start Designing
            </v-btn>
            <v-btn variant="outlined" color="#23272f" class="hero-btn" large>
              Learn More
            </v-btn>
          </div>
        </v-col>
        <!-- Right: Image -->
        <v-col cols="12" md="6" class="d-flex justify-center">
          <img
            src="https://www.bkciandre.com/wp-content/uploads/2024/11/Sophisticated-living-room-with-TV-wall-sleek-seating-and-decor.webp"
            alt="Modern Living Room"
            class="landing-hero-img"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid style="background: #e6d6c2">
      <div style="max-width: 1600px; margin: 0 auto">
        <Transform :before="beforeImg" :after="afterImg">
          <h1>See Your Room Transform</h1>
          <p>
            Upload a photo and get instant redesigns, virtual staging, or fresh
            inspiration with kAIyu
          </p>
        </Transform>
      </div>
    </v-container>

    <v-container fluid style="background: #fafafa">
      <br />
      <v-container fluid class="inspiration-section pa-0 ma-0">
        <h6 class="inspiration-title text-center">
          Are you looking for inspiration?
        </h6>
        <div class="coverflow-wrapper">
          <CoverflowSlider2 />
        </div>
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import CoverflowSlider2 from "@/components/CoverflowSlider2.vue";
import Transform from "@/components/Transform.vue";
import beforeImg from "@/assets/before2.jpg";
import afterImg from "@/assets/after2.jpg";

const heroImage =
  "https://www.ikea.com/ext/ingkadam/m/564b9ffd76f3f550/original/PH200242.jpg?f=sg";
const scale = ref(1);

const handleScroll = () => {
  // Adjust 0.0007 for more/less zoom, and 1.3 for max scale
  const maxScale = 1.3;
  const scrollY = window.scrollY;
  scale.value = Math.min(1 + scrollY * 0.0007, maxScale);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.transparent-navbar {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.logo-btn {
  text-transform: none;
  letter-spacing: 0;
}
.center-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 1;
}

.landing-hero-row {
  min-height: 80vh;
  max-width: 2000px; /* Limit the row width */
  margin: 0 auto; /* Center the row */
}

.button-row {
  display: flex;
  align-items: center;
  gap: 0; /* Remove if you want to use only mr-4 for spacing */
}

.hero-btn {
  padding: 16px 40px !important;
  font-size: 1.1rem;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px; /* Ensures both buttons have the same width */
  min-height: 48px;
  text-transform: none;
}
.landing-hero-img {
  width: 100%;
  max-width: 700px;
  border-radius: 48px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.08);
  object-fit: cover;
  margin-right: 15%;
}

@media (min-width: 1264px) {
  .landing-hero-img {
    max-width: 1000px; /* or 1100px, adjust as you like */
    border-radius: 64px;
  }
  .how-title {
    font-size: 3.2rem;
  }
  .inspiration-title {
    font-size: 2rem;
  }
  .pa-16 {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
}
.landing-hero {
  position: relative;
  height: 90vh;
  width: 90vw;
  max-width: 10000px; /* Limit width for large screens */
  margin: 10px auto 10px auto; /* Center horizontally with margin top/bottom */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 33px; /* Rounded corners */
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.08); /* Optional: soft shadow */
}
.hero-img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.hero-content {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  color: #fff5ea;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.how-it-works-section {
  background: #f7f7f7;
}
.how-title {
  color: #353535;
  font-weight: bold;
  font-size: 2.6rem;
  margin-bottom: 2rem;
}
.how-steps-row {
  gap: 0;
}
.how-step-card {
  background: #fff;
  border-radius: 48px;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: 0 4px 24px rgba(60, 60, 60, 0.04);
  min-width: 320px;
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.how-step-circle {
  background: #e6d6c2;
  color: #4a2511;
  font-weight: bold;
  font-size: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}
.how-step-title {
  color: #353535;
  font-weight: bold;
  font-size: 1.35rem;
  margin-bottom: 0.7rem;
  text-align: center;
}
.how-step-desc {
  color: #6b7280;
  font-weight: 600;
  font-size: 1.05rem;
  text-align: center;
}
@media (max-width: 960px) {
  .how-step-card {
    min-width: 220px;
    max-width: 100%;
    padding: 2rem 1rem 1.5rem 1rem;
    border-radius: 32px;
  }
}

.inspiration-section {
  background: #fafafa; /* Match your slider background */
}

.coverflow-wrapper {
  height: 500px; /* Set your desired height */
  overflow: hidden;
  padding: 0;
  margin: 0;
}

/* If you need to adjust the title spacing */
.inspiration-title {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 0 !important;
}

.text-background {
  display: inline-block;
  padding: 2rem 3rem;
  background: rgba(77, 66, 66, 0.4); /* Semi-transparent dark layer */
  backdrop-filter: blur(8px); /* Frosted glass effect */
  border-radius: 12px;
  border: 1px solid rgba(211, 193, 193, 0.1); /* Subtle border */
}
</style>
