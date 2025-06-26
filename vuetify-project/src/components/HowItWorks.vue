<template>
  <!-- How it works -->
  <v-container
    fluid
    class="how-it-works-section py-12"
    style="background: #e6d6c2"
  >
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="how-title">How It Works</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="stretch" class="how-steps-row" no-gutters>
      <v-col cols="12" md="4" class="d-flex justify-center mb-6 mb-md-0">
        <div class="how-step-card">
          <div class="how-step-circle">1</div>
          <div class="how-step-title">Upload Your Room</div>
          <div class="how-step-desc">
            Take a photo of your empty room and upload it to our platform
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center mb-6 mb-md-0">
        <div class="how-step-card">
          <div class="how-step-circle">2</div>
          <div class="how-step-title">Choose Your Style</div>
          <div class="how-step-desc">
            Select from various styles for your type of rooms
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center">
        <div class="how-step-card">
          <div class="how-step-circle">3</div>
          <div class="how-step-title">Shop Your Design</div>
          <div class="how-step-desc">
            Purchase the exact items used in your virtual room design
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

onMounted(() => {
  const cards = document.querySelectorAll(".how-step-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  cards.forEach((card) => observer.observe(card));
  // Clean up
  onBeforeUnmount(() => observer.disconnect());
});
</script>

<style scoped>
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
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.how-step-card.visible {
  opacity: 1;
  transform: translateY(0);
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
</style>
