import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useProductStore = defineStore('product', () => {
  // --- STATE ---
  const originalImageUrl = ref(null);
  const generatedImageUrl = ref(null);
  const originalFile = ref(null);
  const detectedItems = ref([]); // To store detected items and similar products

  const currentProductImage = computed(() => generatedImageUrl.value || 'https://via.placeholder.com/800x600?text=No+Image');

  const showSidebar = ref(false);
  const showImageComparison = ref(true);
  const hover = ref(false);
  const hoverComparison = ref(false);
  const highlightedProduct = ref(null);
  const selectAllProducts = ref(false);

  // The recommendedProducts will now be dynamically populated from the API results
  const recommendedProducts = computed(() => {
    if (!detectedItems.value) return [];
    // Flatten the similar_products from all detected items
    return detectedItems.value.flatMap((item, index) =>
      item.similar_products.map(p => ({ ...p, id: `${index}-${p.product_name}` }))
    );
  });

  // Hotspots are also dynamically generated
  const hotspots = computed(() => {
    if (!detectedItems.value) return [];
    return detectedItems.value.map((item, index) => ({
      x: (item.bounding_box.x1 + item.bounding_box.x2) / 2, // approximation of center
      y: (item.bounding_box.y1 + item.bounding_box.y2) / 2,
      productId: `${index}-${item.similar_products[0]?.product_name}`,
      tooltip: item.class_name,
    }));
  });

  // --- GETTERS ---
  const isIndeterminate = computed(() => {
    const selectedCount = recommendedProducts.value.filter(p => p.selected).length;
    return selectedCount > 0 && selectedCount < recommendedProducts.value.length;
  });

  const selectedCount = computed(() => {
    return recommendedProducts.value.filter(p => p.selected).length;
  });

  // --- ACTIONS ---
  function setGenerationResult({ original, generated, file, detectedItems: items }) {
    originalImageUrl.value = original;
    generatedImageUrl.value = generated;
    originalFile.value = file;
    detectedItems.value = items.map(item => ({
        ...item,
        similar_products: item.similar_products.map(p => ({...p, selected: false }))
    }));
    showImageComparison.value = true;
  }

  function toggleProductCheckbox(productId) {
    const product = recommendedProducts.value.find(p => p.id === productId);
    if (product) {
      product.selected = !product.selected;
      updateSelectAllState();
    }
  }
  
  function updateSelectAllState() {
    const allSelected = recommendedProducts.value.every(p => p.selected);
    selectAllProducts.value = allSelected;
  }

  function toggleSelectAll(value) {
    selectAllProducts.value = value;
    recommendedProducts.value.forEach(product => {
      product.selected = value;
    });
  };

  function openSelectedProducts() {
    const selected = recommendedProducts.value.filter(p => p.selected);
    if (selected.length > 2 && !confirm(`This will open ${selected.length} new tabs. Continue?`)) {
      return;
    }
    selected.forEach((p, i) => setTimeout(() => window.open(p.product_url, "_blank"), i * 100));
  }

  function prepareScrollToProduct(productId) {
    highlightedProduct.value = productId;
    if (!showSidebar.value && !showImageComparison.value) {
      showSidebar.value = true;
    }
    return productId;
  }

  function toggleImageComparisonMode() {
    showImageComparison.value = !showImageComparison.value;
  }
  
  function resetStore() {
    showSidebar.value = false;
    showImageComparison.value = true;
    highlightedProduct.value = null;
    selectAllProducts.value = false;
    originalImageUrl.value = null;
    generatedImageUrl.value = null;
    originalFile.value = null;
    detectedItems.value = [];
  }
  
  watch(selectAllProducts, (newValue) => {
    recommendedProducts.value.forEach(product => {
      product.selected = newValue;
    });
  });

  return {
    originalImageUrl,
    generatedImageUrl,
    originalFile,
    currentProductImage,
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
    setGenerationResult,
    resetStore,
    prepareScrollToProduct,
    toggleProductCheckbox,
    updateSelectAllState,
    openSelectedProducts,
    toggleImageComparisonMode,
    toggleSelectAll
  };
});