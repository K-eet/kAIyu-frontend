<template>
  <AppNav />
  <v-container height="50" :fluid="true" style="padding: 0">
    <v-row>
      <v-col cols="12"></v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </v-container>

  <v-container fluid class="my-8">
    <h2 class="text-h4 text-center mb-6 text-grey-darken-8 font-weight-bold">
      Your Design Gallery
    </h2>
    <p class="text-center text-subtitle-1 mb-10 text-medium-emphasis">
      Explore your curated collection of beautiful interior designs
    </p>

    <div v-if="galleryStore.isLoading" class="text-center py-16">
      <v-progress-circular
        indeterminate
        color="brown"
        size="64"
      ></v-progress-circular>
      <p class="mt-4 text-h6">Loading Designs...</p>
    </div>

    <v-alert
      v-else-if="galleryStore.error"
      type="error"
      class="mx-auto"
      max-width="800"
      border="start"
      elevation="2"
      closable
      @click:close="galleryStore.error = null"
    >
      {{ galleryStore.error }}
    </v-alert>

    <div v-else-if="!galleryStore.isLoading && collageImages.length === 0" class="text-center py-16">
       <v-icon size="64" color="grey">mdi-image-off-outline</v-icon>
       <p class="mt-4 text-h6 text-grey">Your gallery is empty.</p>
       <p class="text-medium-emphasis">Generate a new design to see it here!</p>
       <v-btn class="mt-4" color="#E56F2C" @click="router.push('/')">Create a Design</v-btn>
    </div>

    <div v-else class="image-collage">
      <div
        v-for="image in collageImages"
        :key="image.id"
        class="collage-item"
        @click="handleImageClick(image)"
        style="cursor: pointer"
      >
        <v-img
          :src="image.generatedSrc"
          :alt="image.alt"
          aspect-ratio="16/9"
          cover
          class="rounded-lg elevation-2 image-hover-effect"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, onActivated } from "vue"; // Import onActivated
import { useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/galleryStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import AppNav from "@/components/AppNav.vue";

const router = useRouter();
const galleryStore = useGalleryStore();
const productStore = useProductStore();

const { images: collageImages } = storeToRefs(galleryStore);
const { isLoading, error } = storeToRefs(galleryStore);

const API_BASE_URL = 'http://localhost:8000';

/**
 * Handles the click event on a gallery image.
 * Fetches design details and navigates to the ProductViewer.
 * @param {object} image - The image object from the gallery.
 */
async function handleImageClick(image) {
  console.log("handleImageClick triggered for image ID:", image.id);
  try {
    galleryStore.isLoading = true;
    galleryStore.error = null;
    productStore.resetStore();

    const generatedImageResponse = await axios.get(image.generatedSrc, {
      responseType: 'blob',
      // timeout: 60000
    });
    const generatedImageBlob = generatedImageResponse.data;

    const detectionFormData = new FormData();
    detectionFormData.append("file", generatedImageBlob, "generated_image.jpg");

    const simResponse = await axios.post(
      `${API_BASE_URL}/generated/detect-and-find-similar/?generated_room_id=${image.generated_room_id}`,
      detectionFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 180000,
      }
    );

    productStore.setGenerationResult({
      original: image.originalSrc,
      generated: image.generatedSrc,
      file: null,
      detectedItems: simResponse.data.detected_items || [],
    });

    router.push("/productviewer");

  } catch (err) {
    console.error("Failed to load design details:", err);
    galleryStore.error = err.response?.data?.detail || "Could not load the details for this design. Please try again.";
  } finally {
    galleryStore.isLoading = false;
  }
}

// This function will fetch the latest gallery data.
const refreshGallery = () => {
  console.log("Refreshing gallery data...");
  galleryStore.fetchGallery();
};

// onMounted is called when the component is first created.
onMounted(() => {
  refreshGallery();
});

// onActivated is called when a cached component is displayed (e.g., after navigating back).
// This ensures the gallery is always up-to-date, even if the page is cached by the router.
onActivated(() => {
  refreshGallery();
});
</script>

<style scoped>
/* Main container for the CSS Grid collage */
.image-collage {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 1800px;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px;
}

/* Styling for each individual image wrapper within the grid */
.collage-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Hover effect for each image */
.image-hover-effect {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    filter 0.3s ease-in-out;
  cursor: pointer;
}

.image-hover-effect:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  filter: brightness(1.1);
  z-index: 1;
}

/* --- Responsive Adjustments --- */
@media (max-width: 1300px) {
  .image-collage {
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }
}
@media (max-width: 1100px) {
  .image-collage {
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
  }
}
@media (max-width: 900px) {
  .image-collage {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
}
@media (max-width: 600px) {
  .image-collage {
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    padding: 5px;
  }
}
@media (max-width: 450px) {
  .image-collage {
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }
}
</style>
