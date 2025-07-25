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

    <div v-if="galleryStore.isLoading" class="text-center">
      <v-progress-circular
        indeterminate
        color="brown"
        size="64"
      ></v-progress-circular>
      <p class="mt-4">Loading Designs...</p>
    </div>

    <div v-else-if="galleryStore.error" class="text-center">
      <v-alert type="error" prominent border="start">
        {{ galleryStore.error }}
      </v-alert>
    </div>

    <div v-else class="image-collage">
      <div
        v-for="(image, index) in collageImages"
        :key="image.src || index"
        class="collage-item"
        @click="handleImageClick(image, index)"
        style="cursor: pointer"
      >
        <v-img
          :src="image.src"
          :alt="image.alt || `Design Image ${index + 1}`"
          aspect-ratio="16/9"
          cover
          class="rounded-lg elevation-2 image-hover-effect"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="brown"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useGalleryStore } from "@/stores/gallery";

const router = useRouter();

// 1. Initialize the store
const galleryStore = useGalleryStore();

// 2. Create reactive references to the store's state
// This keeps reactivity without having to write galleryStore.images everywhere
const { images: collageImages } = storeToRefs(galleryStore);

// 3. Call the action to fetch data when the component is mounted
onMounted(() => {
  // Only fetch if images haven't been loaded yet
  if (galleryStore.images.length === 0) {
    galleryStore.fetchImages();
  }
});

function handleImageClick(image, index) {
  // Routing logic remains in the component as it's a UI concern
  if (image.shouldRedirect) {
    // A more dynamic way to handle different routes
    const route = index === 0 ? "/ProductViewer" : "/ProductViewerz";
    router.push(route);
  }
}
</script>

<style scoped>
/* Main container for the CSS Grid collage */
.image-collage {
  display: grid;
  /* Defines 8 columns, each taking an equal fraction of the available space */
  grid-template-columns: repeat(3, 1fr);
  /* Adds spacing between all grid items (images) */
  gap: 12px; /* A good default gap for a cleaner look */
  /* Limits the overall width of the collage and centers it on the page */
  max-width: 1800px; /* Adjust as needed for your layout */
  margin: 0 auto;
  /* Ensures any overflow (e.g., from hover effects or rounded corners) is handled */
  overflow: hidden;
  /* A bit of internal padding for the grid itself */
  padding: 10px;
}

/* Styling for each individual image wrapper within the grid */
.collage-item {
  width: 100%;
  height: 100%;
  overflow: hidden; /* Important for clean rounded corners on v-img */
}

/* Hover effect for each image */
.image-hover-effect {
  /* Smooth transition for all animated properties */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    filter 0.3s ease-in-out;
  cursor: pointer; /* Changes cursor to pointer to indicate interactivity */
}

.image-hover-effect:hover {
  transform: scale(1.05); /* Makes the image slightly larger on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25); /* Adds a more prominent shadow */
  filter: brightness(1.1); /* Slightly brightens the image */
  z-index: 1; /* Ensures the hovered image appears above its neighbors */
}

/* --- Responsive Adjustments for different screen sizes --- */
/* These media queries change the number of columns to adapt to smaller screens */

/* For screens smaller than 1300px (e.g., smaller desktops, large tablets in landscape) */
@media (max-width: 1300px) {
  .image-collage {
    grid-template-columns: repeat(7, 1fr); /* Switch to 7 columns */
    gap: 10px;
  }
}

/* For screens smaller than 1100px (e.g., standard desktops, tablets in landscape) */
@media (max-width: 1100px) {
  .image-collage {
    grid-template-columns: repeat(6, 1fr); /* Switch to 6 columns */
    gap: 8px;
  }
}

/* For screens smaller than 900px (e.g., larger tablets in portrait, smaller laptops) */
@media (max-width: 900px) {
  .image-collage {
    grid-template-columns: repeat(4, 1fr); /* Switch to 4 columns */
    gap: 6px;
  }
}

/* For screens smaller than 600px (e.g., large phones in landscape or portrait) */
@media (max-width: 600px) {
  .image-collage {
    grid-template-columns: repeat(3, 1fr); /* Switch to 3 columns */
    gap: 5px;
    padding: 5px; /* Reduce overall padding */
  }
}

/* For screens smaller than 450px (e.g., smaller phones) */
@media (max-width: 450px) {
  .image-collage {
    grid-template-columns: repeat(2, 1fr); /* Switch to 2 columns */
    gap: 4px;
  }
}
</style>
