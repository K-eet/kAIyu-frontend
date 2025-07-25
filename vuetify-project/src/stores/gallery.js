import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define the store
export const useGalleryStore = defineStore('gallery', () => {
  // State
  const images = ref([]);
  // State to track if images are currently being loaded.
  const isLoading = ref(false);
  // State to hold any potential errors during fetching.
  const error = ref(null);

  // Actions
  // An async action to fetch image data. This is where you'll
  // eventually put your backend API call (e.g., using fetch or axios).
  async function fetchImages() {
    isLoading.value = true;
    error.value = null;

    try {
      // ** SIMULATED API CALL **
      // For now, we'll use your static data.
      // In the future, you would replace this with:
      // const response = await fetch('https://your-api.com/images');
      // const data = await response.json();
      // images.value = data;

      const imageData = [
        {
          src: 'https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg',
          alt: 'Elegant Living Room',
          // Example property for routing logic
          shouldRedirect: true, 
        },
        {
          src: 'https://www.ikea.com/ext/ingkadam/m/4402ca03ae3a7ef8/original/PH199390.jpg?f=sg',
          alt: 'Modern Bedroom',
          // Example property for routing logic
          shouldRedirect: true,
        },
        {
          src: 'https://www.ikea.com/ext/ingkadam/m/10391eef320f8ff7/original/PH200234.jpg?f=sg',
          alt: 'Minimalist Bedroom',
        },
        {
          src: 'https://www.ikea.com/ext/ingkadam/m/62dca52bcd7a8b71/original/PH204399.jpg?f=sg',
          alt: 'Cozy Kitchen',
        },
        {
          src: 'https://www.ikea.com/ext/ingkadam/m/743476143a3b2310/original/PH202780.jpg?f=sg',
          alt: 'Living Room',
        },
        // ... continue listing all 40 of your image objects ...
        {
          src: 'https://www.ikea.com/images/a-3-seat-sofa-a-flatwoven-rug-a-rattan-armchair-with-cushion-0ac620bb7c754ffa215575fc686e4142.jpg?f=sg',
          alt: 'Modern Office Space',
        },
      ];

      images.value = imageData;
    } catch (e) {
      error.value = 'Failed to fetch images. Please try again later.';
      console.error(e);
    } finally {
      // This will run whether the fetch succeeded or failed
      isLoading.value = false;
    }
  }

  // --- GETTERS ---

  const totalImages = () => images.value.length;

  return {
    images,
    isLoading,
    error,
    fetchImages,
    totalImages,
  };
});