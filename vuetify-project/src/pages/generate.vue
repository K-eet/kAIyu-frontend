<template>
  <!-- Navigation Bar -->
  <AppNav />
  <!-- Main Content -->
  <!-- Hero Section with Better Spacing -->
  <v-container class="py-md-12 mt-15">
    <v-row justify="center">
      <v-col cols="12" lg="12" md="8" xl="10" sm="6">
        <v-row class="gx-8 gy-8">
          <!-- Upload Section -->
          <v-col cols="12" md="6">
            <v-card
              class="upload-card h-100 d-flex flex-column"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <!-- Header with consistent padding -->
              <v-card-title class="text-h5 font-weight-bold pa-8 pb-0">
                Upload Your Room Photo
              </v-card-title>
              <!-- Content area that grows -->
              <v-card-text class="pa-7 pt-8 flex-grow-1 d-flex flex-column">
                <!-- Drag & Drop Zone -->
                <div class="flex-grow-1 d-flex flex-column">
                  <v-sheet
                    v-if="!imagePreview"
                    border
                    class="upload-zone pa-16 mb-4 flex-grow-1 d-flex align-center"
                    :class="{ dragging: isDragging }"
                    rounded
                    @dragenter.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div class="text-center w-100">
                      <v-icon
                        class="mb-2"
                        icon="mdi-cloud-upload"
                        size="48"
                      ></v-icon>
                      <div class="text-body-1 mb-2">
                        Drag and drop your image here
                      </div>
                      <div class="text-body-2 text-medium-emphasis">or</div>
                      <v-btn
                        class="mt-2"
                        variant="outlined"
                        @click="triggerUpload"
                        >Browse Files</v-btn
                      >
                      <input
                        ref="fileInput"
                        accept="image/*"
                        hidden
                        type="file"
                        @change="handleFileSelect"
                      />
                    </div>
                  </v-sheet>

                  <!-- Image Preview -->
                  <v-card
                    v-else
                    border
                    class="uploaded-image-card pa-4 mb-4 flex-grow-1"
                    rounded
                  >
                    <v-img
                      v-if="imagePreview"
                      class="mb-4 rounded"
                      cover
                      height="300"
                      :src="imagePreview"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          align="center"
                          class="fill-height ma-0"
                          justify="center"
                        >
                          <v-progress-circular
                            color="brown"
                            indeterminate
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <div class="d-flex justify-center">
                      <v-btn
                        class="mr-2"
                        color="black"
                        variant="outlined"
                        @click="removeImage"
                        >Remove Image</v-btn
                      >
                      <v-btn
                        color="#E6D6C2"
                        variant="flat"
                        @click="triggerUpload"
                        >Change Image</v-btn
                      >
                      <input
                        ref="fileInput"
                        accept="image/*"
                        hidden
                        type="file"
                        @change="handleFileSelect"
                      />
                    </div>
                  </v-card>
                </div>

                <!-- Bottom section with divider and button -->
                <div class="mt-auto">
                  <!-- Divider -->
                  <v-divider class="my-5">
                    <span class="text-caption text-grey px-4">OR</span>
                  </v-divider>

                  <!-- Take Photo -->
                  <v-btn
                    block
                    class="text-none font-weight-bold"
                    color="#E6D6C2"
                    prepend-icon="mdi-camera"
                    rounded="lg"
                    size="large"
                    @click="takePhoto"
                  >
                    TAKE PHOTO
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Configuration Section -->
          <v-col cols="12" md="6">
            <v-card
              class="config-card h-100 d-flex flex-column"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <!-- Header with consistent padding -->
              <div class="text-h5 font-weight-bold pa-8 pb-0">
                Configuration
              </div>
              <!-- Content area that grows -->
              <v-card-text class="pa-8 pt-4 flex-grow-1 d-flex flex-column">
                <!-- Room Type -->
                <div class="mb-8">
                  <div class="text-h6 font-weight-medium mb-4">Room Type</div>
                  <v-select
                    class="font-weight-medium"
                    v-model="roomType"
                    hide-details
                    :items="roomTypes"
                    label="Select room type"
                    rounded="lg"
                    variant="outlined"
                  />
                </div>

                <!-- Design Styles -->
                <div class="flex-grow-1 d-flex flex-column">
                  <div class="text-h6 font-weight-medium mb-4">
                    Design Styles
                  </div>
                  <v-sheet
                    class="pa-4 style-selector flex-grow-1"
                    max-height="180"
                    rounded="lg"
                  >
                    <v-chip-group
                      v-model="selectedStyles"
                      column
                      selected-class="selected-design-chip elevated text-white"
                    >
                      <v-chip
                        v-for="style in designStyles"
                        :key="style"
                        class="ma-1 text-none font-weight-medium"
                        :text="style"
                        variant="outlined"
                      />
                    </v-chip-group>
                  </v-sheet>
                </div>

                <!-- Generate Button - positioned at bottom -->
                <div class="mt-auto pt-8">
                  <v-btn
                    block
                    class="text-none font-weight-bold"
                    color="#E6D6C2"
                    elevation="0"
                    prepend-icon="mdi-creation"
                    rounded="lg"
                    size="large"
                    to="/output"
                  >
                    GENERATE DESIGN
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <!-- Image Dialog -->
  <v-dialog v-model="dialog" max-width="1400">
    <v-card>
      <div style="position: relative">
        <v-img
          cover
          height="800"
          max-height="80vh"
          src="https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg"
        ></v-img>
        <!-- Hotspot buttons in dialog -->
        <div class="hotspot-container">
          <v-btn
            v-for="(spot, index) in hotspots"
            :key="index"
            class="hotspot-button"
            color="black"
            icon
            size="small"
            :style="{ left: spot.x + '%', top: spot.y + '%' }"
            @click.stop="openLink(spot.url)"
          >
            <v-icon color="white">mdi-circle</v-icon>
            <v-tooltip activator="parent" location="top">
              {{ spot.tooltip }}
            </v-tooltip>
          </v-btn>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="brown-darken" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const imagePreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click(); // Programmatically click the hidden input
  } else {
    console.error("File input not found!"); // Debugging
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log("Files selected:", target.files); // Debug log
  if (target.files && target.files[0]) {
    const file = target.files[0];
    console.log("File type:", file.type); // Debug log
    if (file.type.startsWith("image/")) {
      imagePreview.value = URL.createObjectURL(file);
    } else {
      console.error("Selected file is not an image");
    }
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files[0] && files[0].type.startsWith("image/")) {
    imagePreview.value = URL.createObjectURL(files[0]);
  }
};

const removeImage = () => {
  imagePreview.value = null;
};

const takePhoto = () => {
  // Implement camera functionality
  console.log("Take photo clicked");
};

// --- Form Refs ---
const roomType = ref<string>("");
const selectedStyles = ref<string[]>([]);

// --- Dialog control ---
const dialog = ref(false);

// --- Styles & Room Types ---
const roomTypes = [
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Home Office",
];

const designStyles = [
  "Modern",
  "Minimalist",
  "Scandinavian",
  "Industrial",
  "Bohemian",
  "Traditional",
  "Contemporary",
  "Mid-Century",
  "Rustic",
  "Art Deco",
];

// --- Gallery Items ---
const galleryItems = [
  {
    src: "https://homefirstindia.com/app/uploads/2020/12/Living-Room.jpg",
    title: "Modern Living Room",
    description: "Clean lines and contemporary furniture",
  },
  {
    src: "https://images.pexels.com/photos/6970025/pexels-photo-6970025.jpeg",
    title: "Scandinavian Bedroom",
    description: "Minimalist design with natural elements",
  },
  {
    src: "https://images.pexels.com/photos/7031760/pexels-photo-7031760.jpeg",
    title: "Industrial Kitchen",
    description: "Raw materials and urban aesthetics",
  },
];

// --- Hotspots ---
const hotspots = [
  {
    x: 18,
    y: 25,
    url: "https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/",
    tooltip: "Cabinet",
  },
  {
    x: 73,
    y: 35,
    url: "https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/",
    tooltip: "Work Lamp",
  },
  {
    x: 40,
    y: 70,
    url: "https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/",
    tooltip: "Coffee Table",
  },
  {
    x: 45,
    y: 15,
    url: "https://www.ikea.com/my/en/p/ringblomma-roman-blind-beige-40583538/",
    tooltip: "Blind",
  },
  {
    x: 38,
    y: 40,
    url: "https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/",
    tooltip: "Lamp",
  },
  {
    x: 25,
    y: 25,
    url: "https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/",
    tooltip: "Bookcase",
  },
  {
    x: 55,
    y: 30,
    url: "https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/",
    tooltip: "Curtain",
  },
];

const openLink = (url: string) => {
  window.open(url, "_blank");
};

// --- Generate Button Function ---
const generateDesign = () => {
  console.log("Generating design with:", {
    roomType: roomType.value,
    selectedStyles: selectedStyles.value,
  });
  dialog.value = true;
};
</script>

<style scoped>
.v-main {
  background-color: ;
}

.selected-design-chip {
  background-color: #3c6e71 !important;
}

.hotspot-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* prevent overlay blocking clicks elsewhere */
}

.hotspot-button {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto; /* re-enable interaction for buttons */
  background: rgba(0, 0, 0, 0.6) !important;
  border: 2px solid white !important;
}

.upload-card,
.config-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.upload-card:hover,
.config-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.style-selector {
  max-height: 180px;
  overflow-y: auto;
}

.style-selector::-webkit-scrollbar {
  width: 4px;
}

.style-selector::-webkit-scrollbar-track {
  background: transparent;
}

.style-selector::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.gallery-carousel .v-carousel__controls {
  background: transparent !important;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
}

/* Responsive spacing adjustments */
@media (max-width: 960px) {
  .pa-8 {
    padding: 1.5rem !important;
  }

  .pa-md-10 {
    padding: 1.5rem !important;
  }
}

/* Custom spacing utilities */
.gx-8 {
  --v-row-gap-x: 2rem;
}

.gy-8 {
  --v-row-gap-y: 2rem;
}
</style>
