<template>
  <!-- Navigation Bar -->
  <AppNav />
  <v-container :fluid="true" style="padding: 0">
    <v-row>
      <v-col cols="12"></v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </v-container>

  <v-container class="pa-10 mt-5">
    <v-row>
      <v-col class="mt-10" cols="12">
        <div class="text-center font-weight-bold text-h5 text-brown-darken-2">
          DECORATION GENERATOR
        </div>
        <div class="text-center text-body-1 mt-5 text-brown-darken-2">
          Where AI Meets Design: Transforming Spaces Without the Stress
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- Main Content -->
  <!-- Hero Section with Better Spacing -->
  <v-container class="py-8 py-md-12">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <v-row class="gx-8 gy-8">
          <!-- Upload Section -->
          <v-col cols="12" md="6">
            <v-card
              class="upload-card h-100 pa-4"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <v-card-title
                class="text-h5 font-weight-medium-mb-8 text-brown-darken-2"
              >
                Upload Your Room Photo
              </v-card-title>
              <v-card-text>
                <p class="mb-4 text-brown-darken-2 font-weight-medium">
                  Please upload or take a photo of your room to get started
                </p>

                <!-- Drag & Drop Zone -->
                <v-sheet
                  v-if="!imagePreview"
                  border
                  class="upload-zone pa-16 mb-4"
                  :class="{ 'dragging': isDragging }"
                  rounded
                  @dragenter.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <div class="text-center">
                    <v-icon class="mb-2" color="brown" icon="mdi-cloud-upload" size="48"></v-icon>
                    <div class="text-body-1 mb-2">Drag and drop your image here</div>
                    <div class="text-body-2 text-medium-emphasis">or</div>
                    <v-btn class="mt-2" color="brown" variant="outlined" @click="triggerUpload">Browse Files</v-btn>
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
                <v-card v-else border class="uploaded-image-card pa-4 mb-4" rounded>
                  <v-img
                    v-if="imagePreview"
                    class="mb-4 rounded"
                    cover
                    height="300"
                    :src="imagePreview"
                  >
                    <template v-slot:placeholder>
                      <v-row align="center" class="fill-height ma-0" justify="center">
                        <v-progress-circular color="brown" indeterminate></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <div class="d-flex justify-center">
                    <v-btn class="mr-2" color="brown" variant="outlined" @click="removeImage">Remove Image</v-btn>
                    <v-btn color="brown" variant="flat" @click="triggerUpload">Change Image</v-btn>
                    <input
                      ref="fileInput"
                      accept="image/*"
                      hidden
                      type="file"
                      @change="handleFileSelect"
                    />
                  </div>
                </v-card>

                <!-- Divider -->
                <v-divider class="my-5">
                  <span class="text-caption text-grey px-4">OR</span>
                </v-divider>

                <!-- Take Photo -->
                <v-btn
                  block
                  color="#4A2511"
                  prepend-icon="mdi-camera"
                  rounded="lg"
                  size="large"
                  @click="takePhoto"
                >
                  Take Photo
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>


          <!-- Configuration Section -->
          <v-col cols="12" md="6">
            <v-card
              class="config-card h-100"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <v-card-text class="pa-8 pa-md-10">
                <!-- Room Type -->
                <div class="mb-8">
                  <div
                    class="text-h6 font-weight-medium mb-4 text-brown-darken-2"
                  >
                    Room Type
                  </div>
                  <v-select
                    v-model="roomType"
                    hide-details
                    :items="roomTypes"
                    label="Select room type"
                    rounded="lg"
                    variant="outlined"
                  />
                </div>

                <!-- Design Styles -->
                <div>
                  <div
                    class="text-h6 font-weight-medium mb-4 text-brown-darken-2"
                  >
                    Design Styles
                  </div>
                  <v-sheet
                    class="pa-4 style-selector"
                    color="grey-lighten-5"
                    max-height="180"
                    rounded="lg"
                  >
                    <v-chip-group
                      v-model="selectedStyles"
                      column
                      selected-class="bg-brown-lighten-2 text-white"
                    >
                      <v-chip
                        v-for="style in designStyles"
                        :key="style"
                        class="ma-1 text-none font-weight-medium"
                        rounded="lg"
                        :text="style"
                        variant="outlined"
                      />
                    </v-chip-group>
                  </v-sheet>
                </div>

                <!-- Generate Button -->
                <v-btn
                  block
                  class="mt-9 text-none font-weight-medium"
                  color="#4A2511"
                  elevation="0"
                  prepend-icon="mdi-creation"
                  rounded="lg"
                  size="large"
                  @click="generateDesign"
                >
                  GENERATE DESIGN
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <!-- Image Dialog -->
  <v-dialog v-model="dialog" max-width="1000">
    <v-card>
      <div style="position: relative">
        <v-img
          cover
          height="500"
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
            <v-tooltip
              activator="parent"
              location="top"
            >
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

  <!-- Gallery Section -->
  <v-container class="bg-grey-lighten-5 px-0 py-0" fluid>
    <v-container class="pt-0 pyb-12 pb-md-16">
      <v-row justify="center">
        <v-col cols="12" lg="10" xl="8">
          <div class="text-center mb-8 mb-md-12">
            <h2 class="text-h3 font-weight-light text-grey-darken-3 mb-4">
              Gallery History
            </h2>
            <p
              class="text-h6 font-weight-regular text-grey-darken-1 mx-auto"
              style="max-width: 600px"
            >
              Explore AI-generated interior designs tailored to your style
              preferences
            </p>
          </div>

          <v-card class="overflow-hidden" elevation="0" rounded="xl">
            <v-carousel
              class="gallery-carousel"
              height="400"
              hide-delimiter-background
              hide-delimiters
              show-arrows="hover"
            >
              <v-carousel-item
                v-for="(item, i) in galleryItems"
                :key="i"
                cover
                :src="item.src"
              >
                <div class="carousel-overlay d-flex align-end">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <div class="text-white">
                          <h3 class="text-h4 font-weight-light mb-2">
                            {{ item.title }}
                          </h3>
                          <p class="text-body-1 opacity-90">
                            {{ item.description }}
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const imagePreview = ref<string | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)
  const isDragging = ref(false)

  const triggerUpload = () => {
    fileInput.value?.click()
  }

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]
      imagePreview.value = URL.createObjectURL(file)
    }
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const files = event.dataTransfer?.files
    if (files && files[0] && files[0].type.startsWith('image/')) {
      imagePreview.value = URL.createObjectURL(files[0])
    }
  }

  const removeImage = () => {
    imagePreview.value = null
  }

  const takePhoto = () => {
    // Implement camera functionality
    console.log('Take photo clicked')
  }

  // --- Form Refs ---
  const roomType = ref<string>('')
  const selectedStyles = ref<string[]>([])

  // --- Dialog control ---
  const dialog = ref(false)

  // --- Styles & Room Types ---
  const roomTypes = [
    'Bedroom',
    'Living Room',
    'Kitchen',
    'Bathroom',
    'Dining Room',
    'Home Office',
  ]

  const designStyles = [
    'Modern',
    'Minimalist',
    'Scandinavian',
    'Industrial',
    'Bohemian',
    'Traditional',
    'Contemporary',
    'Mid-Century',
    'Rustic',
    'Art Deco',
  ]

  // --- Gallery Items ---
  const galleryItems = [
    {
      src: 'https://homefirstindia.com/app/uploads/2020/12/Living-Room.jpg',
      title: 'Modern Living Room',
      description: 'Clean lines and contemporary furniture',
    },
    {
      src: 'https://images.pexels.com/photos/6970025/pexels-photo-6970025.jpeg',
      title: 'Scandinavian Bedroom',
      description: 'Minimalist design with natural elements',
    },
    {
      src: 'https://images.pexels.com/photos/7031760/pexels-photo-7031760.jpeg',
      title: 'Industrial Kitchen',
      description: 'Raw materials and urban aesthetics',
    },
  ]

  // --- Hotspots ---
  const hotspots = [
    { x: 18, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/', tooltip: 'Cabinet' },
    { x: 73, y: 35, url: 'https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/', tooltip: 'Work Lamp' },
    { x: 40, y: 70, url: 'https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/', tooltip: 'Coffee Table' },
    { x: 45, y: 15, url: 'https://www.ikea.com/my/en/p/ringblomma-roman-blind-beige-40583538/', tooltip: 'Blind' },
    { x: 38, y: 40, url: 'https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/', tooltip: 'Lamp' },
    { x: 25, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/', tooltip: 'Bookcase' },
    { x: 55, y: 30, url: 'https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/', tooltip: 'Curtain' },
  ]

  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  // --- Generate Button Function ---
  const generateDesign = () => {
    console.log('Generating design with:', {
      roomType: roomType.value,
      selectedStyles: selectedStyles.value,
    });
    dialog.value = true
  }
</script>


<style scoped>
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
