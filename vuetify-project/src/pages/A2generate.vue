<template>
  <AppNav2 />
  <v-container height="10" :fluid="true" style="padding: 0">
    <!-- <v-row>
        <v-col cols="12"></v-col>
        <v-col cols="12"></v-col>
    </v-row> -->
  </v-container>

  <!-- <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card class="text-center">
          <v-card-title>Decoration Generator</v-card-title>
          <v-card-text> Where AI Meets Design: Transforming Spaces Without the Stress </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container> -->

  <!-- <v-container>
      <v-row>
        <v-col class="mt-1" cols="12">
          <div class="text-center font-weight-bold text-h5 text-black">
            DECORATION GENERATOR
          </div>
          <div class="text-center text-body-1 mt-5 text-black">
            Where AI Meets Design: Transforming Spaces Without the Stress
          </div>
        </v-col>
      </v-row>
    </v-container> -->

  <v-container class="main-content-container">
    <v-row class="fill-height" justify="center">
      <!-- Left Column -->
      <v-col cols="12" md="6" lg="5" xl="4" class="d-flex">
        <!-- <v-card class="pa-4 flex-grow-1"> -->
        <v-card
          class="upload-card h-100 flex-grow-1 pa-4 bg-white"
          elevation="0"
          variant="outlined"
          rounded="xl"
        >
          <v-card-title>Upload Your Room Photo</v-card-title>
          <v-card-text>
            <p class="mb-4">
              Please upload or take a photo of your room to get started
            </p>

            <!-- Drag & Drop Zone -->
            <v-sheet
              v-if="!imagePreview"
              class="upload-zone pa-16 mb-4"
              :class="{ dragging: isDragging }"
              rounded
              border
              @dragenter.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <div class="text-center">
                <v-icon
                  size="48"
                  color="#E56F2C"
                  icon="mdi-cloud-upload"
                  class="mb-2"
                ></v-icon>
                <div class="text-body-1 mb-2">
                  Drag and drop your image here
                </div>
                <div class="text-body-2 text-medium-emphasis">or</div>
                <v-btn
                  class="mt-2"
                  color="#E56F2C"
                  variant="outlined"
                  @click="triggerUpload"
                >
                  Browse Files
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="handleFileSelect"
                />
              </div>
            </v-sheet>

            <v-card v-else class="uploaded-image-card pa-4 mb-4" rounded border>
              <v-img
                v-if="imagePreview"
                :src="imagePreview"
                height="300"
                cover
                class="mb-4 rounded"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="#E56F2C"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="d-flex justify-center">
                <v-btn
                  color="##E56F2C"
                  variant="outlined"
                  @click="removeImage"
                  class="mr-2"
                >
                  Remove Image
                </v-btn>
                <v-btn color="#E56F2C" variant="flat" @click="triggerUpload">
                  Change Image
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="handleFileSelect"
                />
              </div>
            </v-card>
            <!-- Image Preview -->
            <!-- <v-img
              v-if="imagePreview"
              :src="imagePreview"
              height="300"
              cover
              class="mb-4 rounded"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="brown"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img> -->

            <!-- Hidden File Input -->
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleFileUpload"
            />
            <v-divider class="my-6">
              <span class="text-caption text-grey px-4">OR</span>
            </v-divider>

            <!-- Upload and Take Photo Buttons -->
            <!-- <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  color="brown"
                  prepend-icon="mdi-camera"
                  @click="takePhoto"
                >
                  Take Photo
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="brown"
                  prepend-icon="mdi-upload"
                  @click="triggerUpload"
                >
                  Upload Photo
                </v-btn>
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  style="display: none"
                  @change="handleFileUpload"
                >
              </v-col>
            </v-row> -->
            <v-btn
              block
              color="#E56F2C"
              prepend-icon="mdi-camera"
              @click="takePhoto"
            >
              Take Photo
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Column -->
      <v-col cols="12" md="6" lg="5" xl="4" class="d-flex">
        <!-- <v-card class="pa-4 flex-grow-1"> -->
        <v-card
          class="config-card h-100 flex-grow-1 pa-4 bg-white"
          elevation="0"
          variant="outlined"
          rounded="xl"
        >
          <v-card-title>Room Type</v-card-title>
          <v-card-text>
            <!-- Room Type Selection -->
            <v-select
              v-model="roomType"
              label="Select Room Type"
              :items="roomTypes"
              class="mb-4"
            ></v-select>
            <div class="text-h6 font-weight-medium mb-4 text-black-2">
              Design Styles
            </div>
            <v-sheet
              class="style-selector"
              rounded="lg"
              color="white"
              max-height="180"
            >
              <v-chip-group
                v-model="selectedStyles"
                selected-class="bg-orange text-white"
                column
              >
                <v-chip
                  v-for="style in designStyles"
                  :key="style"
                  :text="style"
                  variant="outlined"
                  rounded="lg"
                  class="ma-1 text-none font-weight-medium"
                />
              </v-chip-group>
            </v-sheet>

            <v-divider class="my-7"> </v-divider>

            <!-- Generate Button -->
            <v-btn
              block
              color="#E56F2C"
              size="large"
              @click="startLoadingAndRedirect"
              class="cursor-pointer image-container"
            >
              Generate Design
            </v-btn>

            <v-dialog v-model="loading" persistent width="300">
              <v-card class="d-flex flex-column align-center pa-6">
                <v-progress-circular indeterminate color="primary" size="48" />
                <div class="mt-4">Generating your design...</div>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const selectedStyles = ref([]);
const loading = ref(false);
const router = useRouter();

// Image handling
const imagePreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

// Room configuration
const roomType = ref<string>("");
const designStyle = ref<string>("");

// Options for selections
const roomTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Office",
];
// const designStyles = ['Modern', 'Scandinavian', 'Traditional', 'Minimalist', 'Retro']

// Methods
const triggerUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = (event: Event) => {
  imagePreview.value = null;
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    const file = files[0];
    if (file.type.startsWith("image/")) {
      imagePreview.value = URL.createObjectURL(file);
    }
  }
};

const takePhoto = () => {
  // Implement camera functionality here
  console.log("Take photo clicked");
};

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
  "Maximalist",
  "Coastal",
  "French country",
  "Mediterranean",
];

function startLoadingAndRedirect() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    router.push("/ProductViewer");
  }, 3000); // adjust time
}

// const generateDesign = () => {
//   // Implement generation logic here
//   console.log('Generating design with:', {
//     roomType: roomType.value,
//     designStyle: designStyle.value
//   })
//   dialog.value = true
// }
// const dialog = ref(false)

// // Define hotspots with their positions and URLs
// const hotspots = [
//   { x: 18, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/', tooltip: 'Cabinet'  },
//   { x: 73, y: 35, url: 'https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/', tooltip: 'Work Lamp' },
//   { x: 40, y: 70, url: 'https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/', tooltip: 'Coffee Table' },
//   { x: 45, y: 15, url: 'https://www.ikea.com/my/en/p/ringblomma-roman-blind-beige-40583538/', tooltip: 'Blind'},
//   { x: 38, y: 40, url: 'https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/', tooltip: 'Lamp'},
//   { x: 25, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/', tooltip: 'Bookcase'},
//   { x: 55, y: 30, url: 'https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/', tooltip: 'Curtain'}
// ]

// Function to open links
const openLink = (url: string) => {
  window.open(url, "_blank");
};

const galleryItems = [
  {
    src: "https://homefirstindia.com/app/uploads/2020/12/Living-Room.jpg",
    title: "Modern Living Room",
    description: "Clean lines and contemporary furniture",
  },
  {
    src: "https://d28pk2nlhhgcne.cloudfront.net/assets/app/uploads/sites/3/2021/11/living-room-decoration-720x533.jpg",
    title: "Scandinavian Bedroom",
    description: "Minimalist design with natural elements",
  },
  {
    src: "https://www.ikea.com/ext/ingkadam/m/62dca52bcd7a8b71/original/PH204399.jpg?f=sg",
    title: "Industrial Kitchen",
    description: "Raw materials and urban aesthetics",
  },
];
</script>

<style scoped>
.upload-card,
.config-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.upload-card:hover,
.config-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(27, 14, 1, 0.12) !important;
}

.upload-zone {
  border: 2px dashed rgba(var(--v-theme-primary), 0.4) !important;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-zone:hover {
  border-color: rgba(var(--v-theme-primary), 0.8) !important;
  background: rgba(var(--v-theme-primary), 0.05);
}

.upload-zone.dragging {
  border-color: var(--v-theme-primary) !important;
  background: rgba(var(--v-theme-primary), 0.1);
}

.image-container {
  position: relative;
}

.hotspot-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

/* .hotspot-button {
  position: absolute;
  transform: translate(-50%, -50%);
} */
.hotspot-button {
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(19, 16, 16, 0.653) !important;
  border: 2px solid white !important;
  transition: background 0.3s ease;
}

.hotspot-button:hover {
  background: rgba(255, 255, 255, 0.4) !important;
}
</style>
