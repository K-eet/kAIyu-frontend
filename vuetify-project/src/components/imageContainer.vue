<template>
  <div class="mt-8">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <!-- Main Product Image (Left Side) -->
        <v-col cols="12" :md="showSidebar ? 9 : 12" lg="9">
          <div style="position: relative; height: 100%">
            <v-card elevation="5" rounded="lg" style="height: 100%">
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
                      :class="{
                        'hotspot-active': highlightedProduct === spot.productId,
                      }"
                      color="black"
                      icon
                      size="small"
                      :style="{ left: spot.x + '%', top: spot.y + '%' }"
                      @click.stop="scrollToProduct(spot.productId)"
                    >
                      <v-icon color="white">mdi-circle</v-icon>
                      <v-tooltip activator="parent" location="top">
                        {{ spot.tooltip }}
                      </v-tooltip>
                    </v-btn>
                  </div>
                </div>
              </v-card>

              <!-- Toggle Button (Positioned on image) -->
              <v-btn
                fab
                dark
                small
                color="#284B63"
                style="
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  z-index: 100;
                  opacity: 0.85;
                  background-color: rgba(60, 110, 113, 0.8) !important;
                  backdrop-filter: blur(2px);
                  transition: opacity 0.3s ease;
                "
                @click="showSidebar = !showSidebar"
                @mouseover="hover = true"
                @mouseleave="hover = false"
                :style="{ opacity: hover ? 0.7 : 0.4 }"
              >
                <v-icon>{{
                  showSidebar ? "mdi-chevron-right" : "mdi-format-list-bulleted"
                }}</v-icon>
              </v-btn>
            </v-card>
          </div>
        </v-col>

        <!-- Product Recommendations (Right Side) -->
        <v-col
          cols="12"
          md="3"
          lg="3"
          class="sidebar-col"
          :class="{ 'd-none': !showSidebar }"
        >
          <v-card flat class="sticky-sidebar">
            <div class="scrollable-products" ref="productList">
              <v-list three-line>
                <v-list-item
                  v-for="product in recommendedProducts"
                  :key="product.id"
                  :ref="`product-${product.id}`"
                  class="mb-4 product-card"
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
                        class="rounded-lg"
                      ></v-img>
                    </v-col>

                    <!-- Product Details -->
                    <v-col cols="7">
                      <v-list-item-content>
                        <v-list-item-title class="text-h6 font-weight-bold">
                          {{ product.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          class="text-black text-body-1 mt-1"
                        >
                          {{ product.description }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          class="text-brown-darken-4 text-body-1 mt-2"
                        >
                          RM {{ product.price }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <!-- Shop Now Button -->
                      <v-btn
                        x-small
                        class="mt-3"
                        :href="product.link"
                        target="_blank"
                        color="#E6D6C2"
                        @click.stop
                      >
                        Shop <v-icon right>mdi-arrow-right</v-icon>
                      </v-btn>
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

<script type="js">
export default {
  data() {
    return {
      showSidebar: true,
      hover: false,
      highlightedProduct: null,
      recommendedProducts: [
        {
          id: 1,
          name: "IDANÄS",
          description: "Bookcase",
          price: 1390.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-bookcase-dark-brown-stained__1008945_pe827388_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/",
        },
        {
          id: 2,
          name: "IDANÄS",
          description: "Coffee Table",
          price: 129.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-coffee-table-dark-brown-stained__1161066_pe889274_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/",
        },
        {
          id: 3,
          name: "DYTÅG",
          description: "Curtains",
          price: 285,
          image:
            "https://www.ikea.com/my/en/images/products/dytag-curtains-1-pair-dark-beige-with-heading-tape__1024993_pe833752_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/",
        },
        {
          id: 4,
          name: "FORSÅ",
          description: "Work lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/forsa-work-lamp-nickel-plated__0121576_pe278160_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/",
        },
        {
          id: 5,
          name: "IDANÄS",
          description: "Cabinet",
          price: 2490.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained__1008948_pe827389_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/",
        },
        {
          id: 6,
          name: "RÖDFLIK",
          description: "Floor/reading lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/roedflik-floor-reading-lamp-grey-green__1232722_pe916583_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/",
        },
      ],
      hotspots: [
        {
          x: 18,
          y: 25,
          productId: 5, // Cabinet
          tooltip: "Cabinet",
        },
        {
          x: 73,
          y: 35,
          productId: 4, // Work Lamp
          tooltip: "Work Lamp",
        },
        {
          x: 40,
          y: 70,
          productId: 2, // Coffee Table
          tooltip: "Coffee Table",
        },
        {
          x: 38,
          y: 40,
          productId: 6, // Floor Lamp
          tooltip: "Floor Lamp",
        },
        {
          x: 25,
          y: 25,
          productId: 1, // Bookcase
          tooltip: "Bookcase",
        },
        {
          x: 55,
          y: 30,
          productId: 3, // Curtains
          tooltip: "Curtains",
        },
      ],
    };
  },
  methods: {
    scrollToProduct(productId) {
      // Show sidebar if hidden
      if (!this.showSidebar) {
        this.showSidebar = true;
      }

      this.$nextTick(() => {
        const productElement = this.$refs[`product-${productId}`];
        if (productElement && productElement[0]) {
          // Highlight the product
          this.highlightedProduct = productId;

          // Scroll to the product
          productElement[0].$el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });

          // Remove highlight after 3 seconds
          setTimeout(() => {
            this.highlightedProduct = null;
          }, 3000);
        }
      });
    },
  }
}
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 20px;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.toggle-sidebar-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.close-sidebar-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
}

.scrollable-products {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 8px;
}

.sidebar-col .v-list {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar-col .v-list::-webkit-scrollbar {
  display: none;
}

/* Custom scrollbar */
.scrollable-products::-webkit-scrollbar {
  display: none;
}

.scrollable-products::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scrollable-products::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.scrollable-products::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.product-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 8px !important;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Highlighted product styles */
.product-highlighted {
  border: 2px solid #284b63 !important;
  background-color: rgba(40, 75, 99, 0.05) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 75, 99, 0.2) !important;
}

/* Hotspot buttons */
.hotspot-active {
  background: rgba(40, 75, 99, 0.8) !important;
  border: 2px solid #e6d6c2 !important;
  transform: translate(-50%, -50%) scale(1.3) !important;
}

.v-list-item__content {
  padding: 0;
}

.hotspot-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hotspot-button {
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6) !important;
  border: 2px solid white !important;
  pointer-events: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hotspot-button:hover {
  transform: translate(-50%, -50%) scale(1.2);
  /* background: rgba(40, 75, 99, 0.8) !important; */
}

.v-tooltip {
  z-index: 1000;
}

@media (max-width: 960px) {
  .sidebar-col {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: white;
    z-index: 99;
    overflow-y: auto;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
}
</style>
