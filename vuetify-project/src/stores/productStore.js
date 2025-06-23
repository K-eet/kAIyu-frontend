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
      name: "IDANÄS",
      description: "Bookcase",
      price: 1390.0,
      image: "https://www.ikea.com/my/en/images/products/idanaes-bookcase-dark-brown-stained__1008945_pe827388_s5.jpg?f=xl",
      link: "https://www.ikea.com/my/en/p/idanaes-bookcase-dark-brown-stained-80487832/",
      selected: false,
    },
    {
          id: 2,
          name: "IDANÄS",
          description: "Coffee Table",
          price: 129.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-coffee-table-dark-brown-stained__1161066_pe889274_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-coffee-table-dark-brown-stained-90500003/",
          selected: false, // Added selected property
        },
        {
          id: 3,
          name: "DYTÅG",
          description: "Curtains",
          price: 285,
          image:
            "https://www.ikea.com/my/en/images/products/dytag-curtains-1-pair-dark-beige-with-heading-tape__1024993_pe833752_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/dytag-curtains-1-pair-dark-beige-with-heading-tape-40519118/",
          selected: false, // Added selected property
        },
        {
          id: 4,
          name: "FORSÅ",
          description: "Work lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/forsa-work-lamp-nickel-plated__0121576_pe278160_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/forsa-work-lamp-nickel-plated-10146766/",
          selected: false, // Added selected property
        },
        {
          id: 5,
          name: "IDANÄS",
          description: "Cabinet",
          price: 2490.0,
          image:
            "https://www.ikea.com/my/en/images/products/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained__1008948_pe827389_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained-50487838/",
          selected: false, // Added selected property
        },
        {
          id: 6,
          name: "RÖDFLIK",
          description: "Floor/reading lamp",
          price: 139.0,
          image:
            "https://www.ikea.com/my/en/images/products/roedflik-floor-reading-lamp-grey-green__1232722_pe916583_s5.jpg?f=xl",
          link: "https://www.ikea.com/my/en/p/roedflik-floor-reading-lamp-grey-green-80563576/",
          selected: false, // Added selected property
        },
      ]),
       hotspots = ref([
    {
      x: 18,
      y: 25,
      productId: 5,
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
    setHighlightedProduct,
    prepareScrollToProduct,
    toggleProductCheckbox,
    updateSelectAllState,
    openSelectedProducts,
    scrollToProduct,
    toggleImageComparisonMode
  };
});