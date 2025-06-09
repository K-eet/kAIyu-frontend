<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <!-- Main Product Image (Left Side) -->
      <v-col cols="12" md="9" lg="9">
        <v-card elevation="5" rounded="lg">
          <v-img
            cover
            height="900"
            max-height="80vh"
            src="https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg"
          ></v-img>
        </v-card>
      </v-col>

      <!-- Product Recommendations (Right Side) -->
      <v-col cols="12" md="3" lg="3" class="">
        <v-card flat class="sticky-sidebar">
          <v-list three-line>
            <v-list-item
              v-for="product in recommendedProducts"
              :key="product.id"
              class="mb-4 product-card"
              :href="product.link"
              target="_blank"
            >
              <v-row>
                <!-- Product Thumbnail -->
                <v-col cols="">
                  <v-img
                    :src="product.image"
                    height="100"
                    contain
                    class="rounded-lg"
                  ></v-img>
                </v-col>

                <!-- Product Details -->
                <v-col cols="8">
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      {{ product.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-primary text-body-1 mt-2">
                      ${{ product.price }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <!-- Shop Now Button -->
                  <v-btn
                    selected-class="selected-design-button"
                    x-small
                    class="mt-3"
                    :href="product.link"
                    target="_blank"
                    color="#3C6E71"
                  >
                    Shop <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      recommendedProducts: [
        {
          id: 1,
          name: "STRANDMON Wing Chair",
          price: 249.99,
          image:
            "https://www.ikea.com/us/en/images/products/strandmon-wing-chair__1101510_pe866548_s5.jpg",
          link: "https://www.ikea.com",
        },
        {
          id: 2,
          name: "POÄNG Armchair",
          price: 129.0,
          image:
            "https://www.ikea.com/us/en/images/products/poaeng-armchair__38296_PE130209_S5.JPG",
          link: "https://www.ikea.com",
        },
        {
          id: 3,
          name: "EKET Storage Combination",
          price: 89.99,
          image:
            "https://www.ikea.com/us/en/images/products/eket-storage-combination-with-legs-white__1101510_pe866548_s5.jpg",
          link: "https://www.ikea.com",
        },
        {
          id: 4,
          name: "HEMNES Coffee Table",
          price: 139.0,
          image:
            "https://www.ikea.com/us/en/images/products/hemnes-coffee-table-black__0737105_PE740917_S5.JPG",
          link: "https://www.ikea.com",
        },
        {
          id: 5,
          name: "LACK Side Table",
          price: 12.99,
          image:
            "https://www.ikea.com/us/en/images/products/lack-side-table-black__0702210_PE723995_S5.JPG",
          link: "https://www.ikea.com",
        },
        {
          id: 6,
          name: "MALM Dressing Table",
          price: 149.0,
          image:
            "https://www.ikea.com/us/en/images/products/malm-dressing-table-white__0636928_PE698416_S5.JPG",
          link: "https://www.ikea.com",
        },
        {
          id: 7,
          name: "BILLY Bookcase",
          price: 99.99,
          image:
            "https://www.ikea.com/us/en/images/products/billy-bookcase-white__0625599_PE692491_S5.JPG",
          link: "https://www.ikea.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
.sticky-sidebar {
  position: sticky;
  top: 20px;
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.scrollable-products {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 8px;
}

/* Custom scrollbar */
.scrollable-products::-webkit-scrollbar {
  width: 6px;
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
  transition: transform 0.3s;
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 8px !important;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item__content {
  padding: 0;
}
</style>
