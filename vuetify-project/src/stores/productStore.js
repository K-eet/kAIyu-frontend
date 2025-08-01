import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useProductStore = defineStore('product', () => {
  // --- STATE ---
  const originalImageUrl = ref(null);
  const generatedImageUrl = ref(null);
  const originalFile = ref(null);
  const detectedItems = ref([]); // Raw API data for detected items

  // This is now a ref to allow direct modification
  const recommendedProducts = ref([]);
  
  const currentProductImage = computed(() => generatedImageUrl.value || 'https://via.placeholder.com/800x600?text=No+Image');

  const showSidebar = ref(false);
  const showImageComparison = ref(true);
  const hover = ref(false);
  const hoverComparison = ref(false);
  const highlightedProduct = ref(null);
  const selectAllProducts = ref(false);

  // Hotspots are computed from the raw detectedItems
  const hotspots = computed(() => {
    if (!detectedItems.value || !Array.isArray(detectedItems.value)) return [];
    return detectedItems.value.map((item, index) => {
      // Ensure the item and its bounding box are valid
      if (!item || !item.bounding_box) return null;
      
      const firstProduct = item.similar_products?.[0];
      if (!firstProduct) return null;

      return {
        x: (item.bounding_box.x1 + item.bounding_box.x2) / 2,
        y: (item.bounding_box.y1 + item.bounding_box.y2) / 2,
        productId: `${index}-${firstProduct.product_name}`,
        tooltip: item.class_name,
      };
    }).filter(Boolean); // Filter out any null entries
  });

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
    
    // Safely handle the detected items
    detectedItems.value = items || [];

    if (items && Array.isArray(items)) {
        recommendedProducts.value = items.flatMap((item, index) =>
            (item.similar_products || []).map(p => ({
                ...p,
                id: `${index}-${p.product_name}`,
                selected: false
            }))
        );
    } else {
        // If no items are provided, clear the recommendations
        recommendedProducts.value = [];
    }
    
    showImageComparison.value = true; // Default to comparison view
  }

  function toggleProductCheckbox(productId) {
    const product = recommendedProducts.value.find(p => p.id === productId);
    if (product) {
      product.selected = !product.selected;
    }
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
    recommendedProducts.value = [];
  }
  
  watch(selectAllProducts, (newValue) => {
    recommendedProducts.value.forEach(product => {
      product.selected = newValue;
    });
  });

  watch(recommendedProducts, (newProducts) => {
    if (newProducts && newProducts.length > 0) {
        const allSelected = newProducts.every(p => p.selected);
        selectAllProducts.value = allSelected;
    }
  }, { deep: true });

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
    openSelectedProducts,
    toggleImageComparisonMode,
    toggleSelectAll
  };
});