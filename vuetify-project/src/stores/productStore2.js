import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('product', () => {
  // State
  const toggleSelectAll = (value) => {
    selectAllProducts.value = value;
    recommendedProducts.value.forEach(product => {
      product.selected = value;
    });
  };
  const showSidebar = ref(false);
  const showImageComparison = ref(false);
  const hover = ref(false);
  const hoverComparison = ref(false);
  const highlightedProduct = ref(null);
  const selectAllProducts = ref(false);
  const recommendedProducts = ref([
    {
      id: 1,
      name: "DYKARKLOCKA",
      description: "Lamp",
      price: 249.0,
      image: "https://www.ikea.com/my/en/images/products/dykarklocka-pendant-lamp-shade-white-stained-oak-veneer__1280193_pe931682_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/dykarklocka-pendant-lamp-shade-white-stained-oak-veneer-80561662/",
      selected: false,
    },
    {
      id: 2,
      name: "TUFJORD",
      description: "Bed Frame",
      price: 129.0,
      image:
        "https://www.ikea.com/my/en/images/products/tufjord-upholstered-bed-frame-tallmyra-white-black__1259500_pe926690_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/tufjord-upholstered-bed-frame-tallmyra-white-black-00573254/",
      selected: false, // Added selected property
    },
    {
      id: 3,
      name: "NÄVLINGE",
      description: "Work Lamp",
      price: 85,
      image:
        "https://www.ikea.com/my/en/images/products/naevlinge-led-work-lamp-black__0709827_pe727109_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/naevlinge-led-work-lamp-black-40404909/",
      selected: false, // Added selected property
    },
    {
      id: 4,
      name: "PERSILLADE",
      description: "Plant Pot",
      price: 99.0,
      image:
        "https://www.ikea.com/my/en/images/products/persillade-plant-pot-dark-grey__0439713_pe592235_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/persillade-plant-pot-dark-grey-20450997/",
      selected: false, // Added selected property
    },
    {
      id: 5,
      name: "ODGER",
      description: "Chair",
      price: 325.0,
      image:
        "https://www.ikea.com/my/en/images/products/odger-chair-red__1038449_pe839684_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/odger-chair-red-50516553/",
      selected: false, // Added selected property
    },
    {
      id: 6,
      name: "BREDVECKLARE",
      description: "Duvet Cover and Pillowcase",
      price: 80.0,
      image:
        "https://www.ikea.com/my/en/images/products/bredvecklare-duvet-cover-and-pillowcase-white-blue-check__1279022_pe931233_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/bredvecklare-duvet-cover-and-pillowcase-white-blue-check-00579345/",
      selected: false, // Added selected property
    },
    {
      id: 7,
      name: "VITTSJÖ",
      description: "Coffee Table",
      price: 199.0,
      image:
        "https://www.ikea.com/my/en/images/products/vittsjoe-coffee-table-black-brown-glass__0135348_pe292039_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/vittsjoe-coffee-table-black-brown-glass-00213313/",
      selected: false, // Added selected property
    },
      ]),
       hotspots = ref([
    {
      x: 6,
      y: 70,
      productId: 5,
      tooltip: "Chair",
    },
    {
      x: 73,
      y: 39,
      productId: 3, // Work Lamp
      tooltip: "Work Lamp",
    },
    {
      x: 40,
      y: 70,
      productId: 6, // Duvet Cover and Pillowcase
      tooltip: "Duvet Cover and Pillowcase",
    },
    {
      x: 38,
      y: 40,
      productId: 2, // Bed Frame
      tooltip: "Bed Frame",
    },
    {
      x: 32.5,
      y: 16,
      productId: 1, // Lamp
      tooltip: "Lamp",
    },
    {
      x: 25.7,
      y: 55,
      productId: 4, // Plant Pot
      tooltip: "Plant Pot",
    },
    {
      x: 25.7,
      y: 96,
      productId: 7, // Cofee Table
      tooltip: "Coffee Table",
    },
      ]);

// Computed
  const isIndeterminate = computed(() => {
    const selectedCount = recommendedProducts.value.filter(p => p.selected).length;
    return selectedCount > 0 && selectedCount < recommendedProducts.value.length;
  });

  const selectedCount = computed(() => {
    return recommendedProducts.value.filter(p => p.selected).length;
  });

  // Actions
  
  function toggleProductCheckbox(productId) {
    const product = recommendedProducts.value.find(p => p.id === productId);
    if (product) {
      product.selected = !product.selected;
      updateSelectAllState();
    }
  }

  function updateSelectAllState() {
    const allSelected = recommendedProducts.value.every(p => p.selected);
    const noneSelected = recommendedProducts.value.every(p => !p.selected);
    selectAllProducts.value = allSelected ? true : noneSelected ? false : false;
  }

  function openSelectedProducts() {
    const selectedProducts = recommendedProducts.value.filter(p => p.selected);
    const count = selectedProducts.length;
    if (count > 2 && !confirm(`This will open ${count} new tabs. Continue?`)) {
      return;
    }

    selectedProducts.forEach((product, index) => {
      setTimeout(() => window.open(product.link, "_blank"), index * 100);
    });
  }

  function scrollToProduct(productId) {
    if (!showSidebar.value && !showImageComparison.value) {
      showSidebar.value = true;
    }
    highlightedProduct.value = productId;
    return productId;
  }

  function toggleImageComparisonMode() {
    showImageComparison.value = !showImageComparison.value;
  }

  function resetStore() {
  showSidebar.value = false;
  showImageComparison.value = false;
  hover.value = false;
  hoverComparison.value = false;
  highlightedProduct.value = null;
  selectAllProducts.value = false;
  
  // Reset all products to unselected
  recommendedProducts.value.forEach(product => {
    product.selected = false;
  });
}

  const setHighlightedProduct = (productId) => {
    highlightedProduct.value = productId;
  };

    const prepareScrollToProduct = (productId) => {
    setHighlightedProduct(productId);
    if (!showSidebar.value && !showImageComparison.value) {
      showSidebar.value = true;
    }
    return productId; // Return ID for component to handle scrolling
  };
  
  //watch
  watch(selectAllProducts, (newValue) => {
    recommendedProducts.value.forEach(product => {
      product.selected = newValue;
    });
  });

  return {
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
    resetStore,
    setHighlightedProduct,
    prepareScrollToProduct,
    toggleProductCheckbox,
    updateSelectAllState,
    openSelectedProducts,
    scrollToProduct,
    toggleImageComparisonMode
  };
});