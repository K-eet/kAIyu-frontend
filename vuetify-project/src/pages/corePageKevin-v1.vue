<template>
  <!-- Adding Background Image -->
  <v-app class="bg-cover bg-center px-4">
    <v-app-bar
      flat
      color="#A79E9E"
      class="border rounded-pill mt-4 px-3"
      height="50"
    >
      <!-- Logo + App Name -->
      <v-toolbar-title class="d-flex align-center">
        <v-icon class="mb-1 mr-2" color="#D50000">mdi-sofa-single</v-icon>
        <span class="font-weight-bold">kAIyu</span>
      </v-toolbar-title>

      <v-spacer />

      <!-- Center Tabs -->
      <div class="d-flex justify-center flex-grow-1">
        <v-tabs center-active color="black" slider-color="#D50000">
          <v-tab value="home">
            <v-icon class="mr-2">mdi-home</v-icon>
            HOME
          </v-tab>
          <v-tab value="generate">
            <v-icon class="mr-2">mdi-creation</v-icon>
            GENERATE
          </v-tab>
          <v-tab value="gallery">
            <v-icon class="mr-2">mdi-view-gallery</v-icon>
            GALLERY
          </v-tab>
          <v-tab value="about">
            <v-icon class="mr-2">mdi-information</v-icon>
            ABOUT
          </v-tab>
        </v-tabs>
      </div>

      <v-spacer />

      <!-- Right Section: Sign Up + Avatar -->
      <v-btn variant="text" class="text-red font-weight-bold mr-4">
        Sign Up
      </v-btn>

      <!-- Avatar dropdown -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="mr-5" color="white">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openSettings" class="px-5">
            <v-list-item-title>
              <v-icon class="mr-6">mdi-cog</v-icon>
              <v-btn>Settings</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" class="px-5">
            <v-list-item-title>
              <v-icon class="mr-6">mdi-logout</v-icon>
              <v-btn>Logout</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleTheme">
            <v-list-item-title>
              <v-icon class="mr-6">mdi-theme-light-dark</v-icon>
              <v-btn>Toggle Theme</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-container class="pa-10 mt-5">
      <v-row>
        <v-col class="mt-10" cols="12">
          <div class="text-center font-weight-bold text-h5 text-black">
            DECORATION GENERATOR
          </div>
          <div class="text-center text-body-1 mt-5 text-black">
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
                class="upload-card h-100"
                elevation="0"
                variant="outlined"
                rounded="xl"
              >
                <v-card-text class="pa-8 pa-md-10">
                  <div
                    class="text-h5 font-weight-medium mb-8 text-grey-darken-2"
                  >
                    Upload existing room
                  </div>

                  <v-file-input
                    label="Choose file or drag and drop"
                    prepend-icon="mdi-cloud-upload-outline"
                    variant="outlined"
                    rounded="lg"
                    class="mb-6"
                    hide-details
                  />

                  <v-divider class="my-6">
                    <span class="text-caption text-grey px-4">OR</span>
                  </v-divider>

                  <v-btn
                    variant="outlined"
                    color="brown-darken-1"
                    size="large"
                    rounded="lg"
                    prepend-icon="mdi-camera-outline"
                    class="text-none font-weight-medium"
                    block
                  >
                    Take Snapshot
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Configuration Section -->
            <v-col cols="12" md="6">
              <v-card
                class="config-card h-100"
                elevation="0"
                variant="outlined"
                rounded="xl"
              >
                <v-card-text class="pa-8 pa-md-10">
                  <!-- Room Type -->
                  <div class="mb-8">
                    <div
                      class="text-h6 font-weight-medium mb-4 text-grey-darken-2"
                    >
                      Room Type
                    </div>
                    <v-select
                      :items="roomTypes"
                      label="Select room type"
                      variant="outlined"
                      rounded="lg"
                      hide-details
                    />
                  </div>

                  <!-- Design Styles -->
                  <div>
                    <div
                      class="text-h6 font-weight-medium mb-4 text-grey-darken-2"
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
                  </div>

                  <v-btn
                    color="brown-darken-1"
                    size="large"
                    rounded="lg"
                    class="mt-8 text-none font-weight-medium"
                    block
                    elevation="0"
                  >
                    Generate Design
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

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

<script setup>
import { ref } from "vue";

const selectedStyles = ref([]);

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
