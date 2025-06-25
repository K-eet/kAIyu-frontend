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

    <div class="image-collage">
      <div
        v-for="(image, index) in collageImages"
        :key="index"
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
          <!-- <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="brown"></v-progress-circular>
            </v-row>
          </template> -->
        </v-img>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

function handleImageClick(image, index) {
  // Example: Only redirect for images with a certain property or index
  if (image.shouldRedirect || index === 0) {
    router.push("/ProductViewer");
  }
  if (image.shouldRedirect || index === 1) {
    router.push("/ProductViewercopy"); // or { name: '/ProductViewer2' } if using named routes
  } else {
    // Optionally, handle other images (e.g., enlarge)
  }
}

// Reactive array to hold all your image data (links and alt text)
const collageImages = ref([]);

// Configuration for your collage grid
const numRows = 5;
const numCols = 8;
const totalImages = numRows * numCols; // Should be 40 images for a 5x8 grid

// Function to generate the image data
const generateCollageData = () => {
  const images = [];

  const specificImageLinks = [
    {
      src: "https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg",
      alt: "Elegant Living Room",
    },
    {
      src: "https://www.ikea.com/ext/ingkadam/m/4402ca03ae3a7ef8/original/PH199390.jpg?f=sg",
      alt: "Modern Bedroom",
    },
    {
      src: "https://www.ikea.com/ext/ingkadam/m/10391eef320f8ff7/original/PH200234.jpg?f=sg",
      alt: "Minimalist Bedroom",
    },
    {
      src: "https://www.ikea.com/ext/ingkadam/m/62dca52bcd7a8b71/original/PH204399.jpg?f=sg",
      alt: "Cozy Kitchen",
    },
    {
      src: "https://www.ikea.com/ext/ingkadam/m/743476143a3b2310/original/PH202780.jpg?f=sg",
      alt: "Living Room",
    },
    // ... continue listing all 40 of your image objects ...
    {
      src: "https://www.ikea.com/images/a-3-seat-sofa-a-flatwoven-rug-a-rattan-armchair-with-cushion-0ac620bb7c754ffa215575fc686e4142.jpg?f=sg",
      alt: "Modern Office Space",
    },
  ];
  images.push(...specificImageLinks);

  return images;
};

// Initialize the collage images array when the component is loaded
collageImages.value = generateCollageData();
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
