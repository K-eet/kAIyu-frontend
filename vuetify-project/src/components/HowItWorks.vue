<template>
  <v-container
    fluid
    class="how-it-works-section py-12"
    style="background: #e6d6c2"
  >
    <v-row justify="center" class="mb-10">
      <v-col cols="12" class="text-center">
        <h2 class="how-title">How It Works</h2>
      </v-col>
    </v-row>
    <v-row justify="center" class="how-steps-horizontal-row" no-gutters>
      <v-col cols="12" md="10" lg="8" xl="7">
        <div class="horizontal-steps-container">
          <div class="how-step-card-horizontal">
            <div class="how-step-number-overlay">1</div>
            <div class="how-step-content-horizontal">
              <div class="how-step-title-horizontal">Upload Your Room</div>
              <div class="how-step-desc-horizontal">
                Take a photo of your empty room and upload it to our platform.
              </div>
            </div>
          </div>

          <div class="how-step-card-horizontal">
            <div class="how-step-number-overlay">2</div>
            <div class="how-step-content-horizontal">
              <div class="how-step-title-horizontal">Choose Your Style</div>
              <div class="how-step-desc-horizontal">
                Select from various styles for your type of rooms.
              </div>
            </div>
          </div>

          <div class="how-step-card-horizontal">
            <div class="how-step-number-overlay">3</div>
            <div class="how-step-content-horizontal">
              <div class="how-step-title-horizontal">Shop Your Design</div>
              <div class="how-step-desc-horizontal">
                Purchase the exact items used in your virtual room design.
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

onMounted(() => {
  const cards = document.querySelectorAll(".how-step-card-horizontal");
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
  onBeforeUnmount(() => observer.disconnect());
});
</script>

<style scoped>
.how-it-works-section {
  background: #e6d6c2 !important;
  position: relative;
  overflow: hidden;
}

.how-title {
  color: #353535;
  font-weight: bold;
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  margin-bottom: 2.5rem;
}

.horizontal-steps-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

@media (min-width: 960px) {
  .horizontal-steps-container {
    flex-direction: row;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.how-step-card-horizontal {
  background: #fff;
  border-radius: 28px;
  padding: 3rem 2.5rem;
  box-shadow: 0 10px 40px rgba(60, 60, 60, 0.08);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  max-width: 380px;

  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 960px) {
  .how-step-card-horizontal {
    flex: 1;
    max-width: calc(33.33% - 1rem);
  }
}

.how-step-card-horizontal.visible {
  opacity: 1;
  transform: translateY(0);
}

.how-step-number-overlay {
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 10rem;
  font-weight: 900;
  color: #a05c2d;
  opacity: 0.08;
  line-height: 1;
  pointer-events: none;
  z-index: 0;
}

@media (max-width: 600px) {
  .how-step-number-overlay {
    font-size: 8rem;
    top: -10px;
    right: -10px;
  }
}

.how-step-content-horizontal {
  position: relative;
  z-index: 1;
}

.how-step-title-horizontal {
  color: #353535;
  font-weight: 700;
  font-size: clamp(1.4rem, 2.8vw, 1.8rem);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}
.how-step-desc-horizontal {
  color: #6b7280;
  font-weight: 500;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.6;
}
</style>
