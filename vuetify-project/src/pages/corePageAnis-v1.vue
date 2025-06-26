<template>
  <AppNav />
  <v-container height="150" :fluid="true" style="padding: 0">
    <v-row>
        <v-col cols="12"></v-col>
        <v-col cols="12"></v-col>
    </v-row>
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

   <v-container>
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
    </v-container>
  
  <v-container>
    <v-row class="fill-height">
      <!-- Left Column -->
      <v-col cols="6" class="d-flex">
        <!-- <v-card class="pa-4 flex-grow-1"> -->
          <v-card class="upload-card h-100 flex-grow-1 pa-4"
                  elevation="0"
                  variant="outlined"
                  rounded="xl"
                  >
          <v-card-title>Upload Your Room Photo</v-card-title>
          <v-card-text>
            <p class="mb-4">Please upload or take a photo of your room to get started</p>
            
            <!-- Drag & Drop Zone -->
            <v-sheet
              v-if="!imagePreview"
              class="upload-zone pa-16 mb-4"
              :class="{ 'dragging': isDragging }"
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
                  color="brown"
                  icon="mdi-cloud-upload"
                  class="mb-2"
                ></v-icon>
                <div class="text-body-1 mb-2">Drag and drop your image here</div>
                <div class="text-body-2 text-medium-emphasis">or</div>
                <v-btn
                  class="mt-2"
                  color="brown"
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
                                color="brown"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <div class="d-flex justify-center">
                <v-btn color="brown" variant="outlined" @click="removeImage" class="mr-2">
                Remove Image
                </v-btn>
                <v-btn color="brown" variant="flat" @click="triggerUpload">
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
            >
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
                  color="brown"
                  prepend-icon="mdi-camera"
                  @click="takePhoto"
                    >
                      Take Photo
              </v-btn>
            
          </v-card-text>
        </v-card>
      </v-col>
      

      <!-- Right Column -->
      <v-col cols="6" class="d-flex">
        <!-- <v-card class="pa-4 flex-grow-1"> -->
        <v-card class="config-card h-100 flex-grow-1 pa-4"
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

            <!-- Design Style Selection -->
            <!-- <v-radio-group
              v-model="designStyle"
              label="Design Style"
              class="mb-4"
            >
              <v-radio
                v-for="style in designStyles"
                :key="style"
                :label="style"
                :value="style"
              ></v-radio>
            </v-radio-group> -->
                      <div
                        class="text-h6 font-weight-medium mb-4 text-black-2"
                      >
                        Design Styles
                      </div>
            <v-sheet
                        class="pa-4 style-selector"
                        rounded="lg"
                        color="grey-lighten-5"
                        max-height="180"
                      >
                        <v-chip-group
                          v-model="selectedStyles"
                          selected-class="bg-brown-lighten-2 text-white"
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

            <!-- Generate Button -->
            <v-btn
              block
              color="brown"
              size="large"
               
              @click="generateDesign" class="cursor-pointer image-container"
            >
              Generate Design
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Image Dialog -->
  <v-dialog v-model="dialog" max-width="1000">
    <v-card>
      <v-img
        src="https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg"
        max-height="80vh"
      >
        <!-- Hotspot buttons in dialog -->
        <div class="hotspot-container">
          <v-btn
            v-for="(spot, index) in hotspots"
            :key="index"
            :style="{ left: spot.x + '%', top: spot.y + '%' }"
            color="black"
            size="small"
            icon
            class="hotspot-button"
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
      </v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="brown-darken" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

    <!-- Gallery Section -->
  <v-container fluid class="bg-grey-lighten-5 px-0 py-0">
    <v-container class="pt-0 pyb-12 pb-md-16">
      <v-row justify="center">
        <v-col cols="12" lg="10" xl="8">
          <div class="text-center mb-8 mb-md-12">
            <h2 class="text-h3 font-weight-light text-grey-darken-3 mb-4">
              Design Gallery
            </h2>
            <p
              class="text-h6 font-weight-regular text-grey-darken-1 mx-auto"
              style="max-width: 600px"
            >
              Explore AI-generated interior designs tailored to your style
              preferences
            </p>
          </div>

          <v-card elevation="0" rounded="xl" class="overflow-hidden">
            <v-carousel
              show-arrows="hover"
              hide-delimiter-background
              hide-delimiters
              height="400"
              class="gallery-carousel"
            >
              <v-carousel-item
                v-for="(item, i) in galleryItems"
                :key="i"
                :src="item.src"
                cover
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

  const selectedStyles = ref([]);

  // Image handling
  const imagePreview = ref<string | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)
  const isDragging = ref(false)

  // Room configuration
  const roomType = ref<string>('')
  const designStyle = ref<string>('')

  // Options for selections
  const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom']
  // const designStyles = ['Modern', 'Scandinavian', 'Traditional', 'Minimalist', 'Retro']

  // Methods
  const triggerUpload = () => {
    fileInput.value?.click()
  }

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]
      imagePreview.value = URL.createObjectURL(file)
    }
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const files = event.dataTransfer?.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        imagePreview.value = URL.createObjectURL(file)
      }
    }
  }

  const takePhoto = () => {
    // Implement camera functionality here
    console.log('Take photo clicked')
  }

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

  const generateDesign = () => {
    // Implement generation logic here
    console.log('Generating design with:', {
      roomType: roomType.value,
      designStyle: designStyle.value
    })
    dialog.value = true
  }
  const dialog = ref(false)

  // Define hotspots with their positions and URLs
  const hotspots = [
    { x: 18, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/', tooltip: 'Cabinet'  },
    { x: 73, y: 35, url: 'https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/', tooltip: 'Work Lamp' },
    { x: 40, y: 70, url: 'https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/', tooltip: 'Coffee Table' },
    { x: 45, y: 15, url: 'https://www.ikea.com/my/en/p/ringblomma-roman-blind-beige-40583538/', tooltip: 'Blind'},
    { x: 38, y: 40, url: 'https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/', tooltip: 'Lamp'},
    { x: 25, y: 25, url: 'https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/', tooltip: 'Bookcase'},
    { x: 55, y: 30, url: 'https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/', tooltip: 'Curtain'}
  ]

  // Function to open links
  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  // Carousel Gallery
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
    src: "https://www.kunstloft.com/magazine/wp-content/uploads/2024/01/home-decoration-with-a-small-budget-2000x1128.web",
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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
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

</style>