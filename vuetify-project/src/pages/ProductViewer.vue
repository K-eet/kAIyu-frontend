<template>
  <AppNav />
  <div class="product-viewer mt-8">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <!-- Main Product Image (Left Side) -->
        <v-col
          cols="12"
          :md="showImageComparison ? 12 : showSidebar ? 9 : 12"
          lg="9"
        >
          <div class="product-image-container">
            <v-card elevation="5" rounded="lg" class="product-image-card">
              <!-- Conditional rendering for product view or image comparison -->
              <div v-if="!showImageComparison">
                <v-card>
                  <div class="image-wrapper">
                    <v-img
                      cover
                      height="800"
                      max-height="80vh"
                      src="https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg"
                    ></v-img>
                    <!-- Hotspot buttons -->
                    <div class="hotspot-container">
                      <v-btn
                        v-for="(spot, index) in hotspots"
                        :key="index"
                        class="hotspot-button"
                        :class="{
                          'hotspot-active':
                            highlightedProduct === spot.productId,
                        }"
                        color="black"
                        icon
                        size="small"
                        :style="{ left: spot.x + '%', top: spot.y + '%' }"
                        @click.stop="toggleAndHighlight(spot.productId)"
                      >
                        <v-icon color="white">mdi-circle</v-icon>
                        <v-tooltip activator="parent" location="top">
                          {{ spot.tooltip }}
                        </v-tooltip>
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </div>
              <div v-else>
                <ImageComparisonSlider
                  before="src/assets/before.png"
                  after="src/assets/after.png"
                  :initial="50"
                  class="comparison-slider"
                >
                  <h2 class="comparison-text">
                    Drag to see the transformation!
                  </h2>
                </ImageComparisonSlider>
              </div>

              <!-- Toggle Sidebar Button -->
              <v-btn
                class="toggle-sidebar-btn"
                @click="showSidebar = !showSidebar"
                @mouseover="hover = true"
                @mouseleave="hover = false"
                :style="{ opacity: hover ? 0.9 : 0.65 }"
              >
                <v-icon color="white">{{
                  showSidebar ? "mdi-chevron-left" : "mdi-format-list-bulleted"
                }}</v-icon>
                <v-tooltip activator="parent" location="top">
                  {{ showSidebar ? "Hide sidebar" : "Show sidebar" }}
                </v-tooltip>
              </v-btn>

              <!-- Toggle Image Comparison Button -->
              <v-btn
                class="toggle-comparison-btn"
                @click="toggleImageComparisonMode"
                @mouseover="hoverComparison = true"
                @mouseleave="hoverComparison = false"
                :style="{ opacity: hoverComparison ? 0.9 : 0.65 }"
              >
                <v-icon color="white">{{
                  showImageComparison ? "mdi-eye" : "mdi-image-multiple"
                }}</v-icon>
                <v-tooltip activator="parent" location="bottom">
                  {{
                    showImageComparison
                      ? "Show product view"
                      : "Show before/after comparison"
                  }}
                </v-tooltip>
              </v-btn>
            </v-card>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="3"
          lg="3"
          class="sidebar-col"
          :class="{ 'd-none': !showSidebar }"
        >
          <v-card flat class="sticky-sidebar">
            <!-- Different header for comparison mode -->
            <div
              v-if="showImageComparison"
              class="comparison-sidebar-header text-center"
            ></div>

            <!-- Original sidebar content (shown when not in comparison mode) -->
            <div v-else>
              <!-- Master Checkbox for Select All/Deselect All and Open Selected Button -->
              <div class="d-flex justify-space-between align-center mb-4">
                <v-checkbox
                  v-model="selectAllProducts"
                  label="Select All"
                  hide-details
                  class="select-all-checkbox"
                  :indeterminate="isIndeterminate"
                  color="#E56F2C"
                  @update:model-value="toggleSelectAll"
                ></v-checkbox>

                <v-btn
                  v-if="selectedCount > 0"
                  fab
                  dark
                  small
                  color="#E6D6C2"
                  @click="openSelectedProducts"
                  class="open-selected-btn"
                  title="Open all selected products in new tabs"
                >
                  <div class="text-body-1">Open selected</div>
                </v-btn>
              </div>
            </div>

            <div class="scrollable-products" ref="productList">
              <!-- Show different content based on mode -->
              <!-- Image comparison mode -->
              <div
                v-if="showImageComparison"
                class="comparison-sidebar-content"
              >
                <div class="text-center">
                  <h3>Generate a new design (uses same image)</h3>
                </div>

                <div class="text-center mt-6">
                  <v-btn
                    @click="regenerateDesign"
                    color="#E56F2C"
                    class="generate-btn"
                  >
                    <v-icon left>mdi-autorenew</v-icon>
                    Generate new design
                  </v-btn>
                </div>
              </div>

              <!-- Product view mode -->
              <v-list v-else three-line>
                <v-list-item
                  v-for="product in recommendedProducts"
                  :id="`product-${product.id}`"
                  :key="product.id"
                  class="product-card"
                  :class="{
                    'product-highlighted': highlightedProduct === product.id,
                  }"
                  :href="product.link"
                  target="_blank"
                >
                  <v-row>
                    <!-- Product Thumbnail -->
                    <v-col cols="5">
                      <v-img
                        :src="product.image"
                        height="115"
                        contain
                        class="product-thumbnail"
                      ></v-img>
                    </v-col>

                    <!-- Product Details -->
                    <v-col cols="7" class="product-details">
                      <div class="product-header">
                        <v-list-item-title class="product-name">
                          {{ product.name }}
                        </v-list-item-title>
                        <v-checkbox
                          v-model="product.selected"
                          hide-details
                          class="product-checkbox"
                          density="compact"
                          color="#E56F2C"
                          @click.stop
                          @change="updateSelectAllState"
                        ></v-checkbox>
                      </div>
                      <v-list-item-subtitle class="product-description">
                        {{ product.description }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="product-price">
                        RM {{ product.price }}
                      </v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import ImageComparisonSlider from "@/components/ImageComparisonSlider.vue";
import AppNav from "@/components/AppNav.vue";
import { onMounted } from "vue";

const productStore = useProductStore();
const productList = ref(null);

onMounted(() => {
  productStore.resetStore();
  if (!sessionStorage.getItem("hasReloaded")) {
    sessionStorage.setItem("hasReloaded", "true");
    window.location.reload(true);
  } else {
    sessionStorage.removeItem("hasReloaded"); // Clean up for next visit
  }
});

onMounted(() => {
  productStore.showImageComparison = true;
});

// Destructure state and actions from the store
const {
  showSidebar,
  showImageComparison,
  hover,
  hoverComparison,
  highlightedProduct,
  selectAllProducts,
  recommendedProducts,
  hotspots,
  isIndeterminate,
  selectedCount,
} = storeToRefs(productStore);

const {
  toggleProductCheckbox,
  updateSelectAllState,
  openSelectedProducts,
  prepareScrollToProduct,
  toggleSelectAll,
  toggleImageComparisonMode,
} = productStore;

// Modified hotspot click handler
const handleHotspotClick = async (productId) => {
  const idToScroll = prepareScrollToProduct(productId);
  await nextTick();

  // Find the product element
  const productElement = document.getElementById(`product-${idToScroll}`);
  if (productElement && productList.value) {
    productElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

// Update your toggleProductCheckbox to include highlighting
const toggleAndHighlight = (productId) => {
  toggleProductCheckbox(productId);
  handleHotspotClick(productId);
};

// Re-generate the design (this function will need to be changed to integrate backend code)
const regenerateDesign = () => {
  sessionStorage.removeItem("hasReloaded");

  sessionStorage.setItem("hasReloaded", "true");

  window.location.reload();
};
</script>

<style scoped src="@/styles/product-viewer.css"></style>
