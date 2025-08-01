<template>
  <AppNav />
  <v-container class="py-md-12 mt-15">
    <v-row justify="center">
      <v-col cols="12" lg="12" md="8" xl="10" sm="6">
        <v-row class="gx-8 gy-8">
          <v-col cols="12" md="6">
            <v-card
              class="upload-card h-100 d-flex flex-column"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <v-card-title class="text-h5 font-weight-bold pa-8 pb-0">
                Upload Your Room Photo
              </v-card-title>
              <v-card-text class="pa-7 pt-8 flex-grow-1 d-flex flex-column">
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

                <div class="mt-auto">
                  <v-divider class="my-5">
                    <span class="text-caption text-grey px-4">OR</span>
                  </v-divider>

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

          <v-col cols="12" md="6">
            <v-card
              class="config-card h-100 d-flex flex-column"
              elevation="0"
              rounded="xl"
              variant="outlined"
            >
              <div class="text-h5 font-weight-bold pa-8 pb-0">
                Configuration
              </div>
              <v-card-text class="pa-8 pt-4 flex-grow-1 d-flex flex-column">
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
                      v-model="selectedStyle"
                      column
                      selected-class="selected-design-chip elevated text-white"
                    >
                      <v-chip
                        v-for="style in designStyles"
                        :key="style"
                        class="ma-1 text-none font-weight-medium"
                        :text="style"
                        :value="style"
                        variant="outlined"
                      />
                    </v-chip-group>
                  </v-sheet>
                </div>

                <div class="mt-auto pt-8">
                  <v-alert
                    v-if="error"
                    type="error"
                    dismissible
                    class="mb-4"
                    variant="tonal"
                    @click:close="error = null"
                  >
                    {{ error }}
                  </v-alert>

                  <v-btn
                    block
                    class="text-none font-weight-bold image-container"
                    color="#E6D6C2"
                    elevation="0"
                    prepend-icon="mdi-creation"
                    rounded="lg"
                    size="large"
                    :loading="loading"
                    :disabled="!canGenerate"
                    @click="generateDesign"
                  >
                    GENERATE DESIGN
                  </v-btn>
                </div>

                <v-dialog v-model="loading" persistent width="300">
                  <v-card class="d-flex flex-column align-center pa-6">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="48"
                    />
                    <div class="mt-4">{{ loadingMessage }}</div>
                  </v-card>
                </v-dialog>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import axios from "axios";
import AppNav from "@/components/AppNav.vue";

const router = useRouter();
const productStore = useProductStore();

const API_BASE_URL = "http://localhost:8000";

const loading = ref(false);
const loadingMessage = ref("Generating your design...");
const error = ref<string | null>(null);

const imagePreview = ref<string | null>(null);
const uploadedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const roomType = ref<string | null>(null);
const selectedStyle = ref<string | null>(null);

const canGenerate = computed(() => {
  return uploadedFile.value && roomType.value && selectedStyle.value && !loading.value;
});

const triggerUpload = () => fileInput.value?.click();

const processFile = (file: File) => {
  if (file && file.type.startsWith("image/")) {
    imagePreview.value = URL.createObjectURL(file);
    uploadedFile.value = file;
  } else {
    error.value = "Invalid file type. Please upload an image.";
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) processFile(target.files[0]);
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files[0]) processFile(files[0]);
};

const removeImage = () => {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
  imagePreview.value = null;
  uploadedFile.value = null;
};

const takePhoto = () => console.log("Take photo clicked");

const generateDesign = async () => {
  if (!canGenerate.value) {
    error.value = "Please upload an image and select all options.";
    return;
  }

  loading.value = true;
  error.value = null;

  const formData = new FormData();
  formData.append("file", uploadedFile.value as Blob);
  formData.append("room_style", roomType.value as string);
  formData.append("design_style", selectedStyle.value as string);

  try {
    // Step 1: Generate the new design
    loadingMessage.value = "Generating new design...";
    const genResponse = await axios.post(`${API_BASE_URL}/generated/generate-image/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 300000, // 5 minutes timeout for image generation
    });

    const generatedData = genResponse.data;
    const generatedRoomId = generatedData.generated_room_id;

    // Step 2: Fetch the generated image to send for detection
    loadingMessage.value = "Analyzing furniture...";
    const generatedImageResponse = await axios.get(
      `${API_BASE_URL}/generated/view/generated/${generatedData.generated_image_path.split(/[/\\]/).pop()}`,
      { responseType: 'blob' }
    );
    const generatedImageBlob = generatedImageResponse.data;


    // Step 3: Detect furniture and find similar items
    const detectionFormData = new FormData();
    detectionFormData.append("file", generatedImageBlob, "generated_image.jpg");

    const simResponse = await axios.post(
      `${API_BASE_URL}/generated/detect-and-find-similar/?generated_room_id=${generatedRoomId}`,
      detectionFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 180000,
      }
    );

    const similarityResults = simResponse.data;

    // Step 4: Save everything to the store and navigate
    const originalFilename = generatedData.original_image_path.split(/[/\\]/).pop();
    const generatedFilename = generatedData.generated_image_path.split(/[/\\]/).pop();
    
    const originalUrl = `${API_BASE_URL}/generated/view/uploads/${originalFilename}`;
    const generatedUrl = `${API_BASE_URL}/generated/view/generated/${generatedFilename}`;

    productStore.setGenerationResult({
      original: originalUrl,
      generated: generatedUrl,
      file: uploadedFile.value,
      detectedItems: similarityResults.detected_items || [],
    });

    router.push('/productviewer');

  } catch (err: any) {
    console.error("Design generation failed:", err);
    error.value = err.response?.data?.detail || "An error occurred during the process.";
  } finally {
    loading.value = false;
  }
};

const roomTypes = ["Bedroom", "Living Room", "Kitchen", "Bathroom", "Dining Room", "Home Office"];
const designStyles = ["Modern", "Minimalist", "Scandinavian", "Industrial", "Bohemian", "Traditional", "Contemporary", "Mid-Century", "Rustic", "Art Deco"];
</script>

<style scoped>
.v-main {
  background-color: ;
}

.selected-design-chip {
  background-color: #e56f2c !important;
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

.image-container {
  position: relative;
}

@media (max-width: 960px) {
  .pa-8 {
    padding: 1.5rem !important;
  }
}

.gx-8 {
  --v-row-gap-x: 2rem;
}

.gy-8 {
  --v-row-gap-y: 2rem;
}
</style>