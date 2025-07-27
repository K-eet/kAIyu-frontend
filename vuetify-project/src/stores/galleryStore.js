import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

// It's best practice to keep the base URL in one place or an environment file.
const API_BASE_URL = 'http://localhost:8000';

export const useGalleryStore = defineStore('gallery', () => {
  // --- STATE ---
  // The 'images' array will now be populated from the API.
  const images = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // --- ACTIONS ---

  /**
   * Fetches the gallery data from the backend API.
   */
  async function fetchGallery() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/generated/gallery`);
      
      // The backend returns an array of room objects. We need to transform
      // this data into a format that the frontend component can use directly.
      const formattedImages = response.data.map(room => {
        // Helper function to safely extract the filename from a full path
        const getFilename = (path) => path.split(/[/\\]/).pop();
        
        // Construct the full, accessible URLs for both original and generated images
        const originalSrc = `${API_BASE_URL}/generated/view/uploads/${getFilename(room.original_image_path)}`;
        const generatedSrc = `${API_BASE_URL}/generated/view/generated/${getFilename(room.generated_image_path)}`;

        return {
          id: room.id,
          originalSrc: originalSrc,
          generatedSrc: generatedSrc,
          alt: `${room.room_style} - ${room.design_style}`,
          // We include all data needed by the click handler or other components
        };
      });

      images.value = formattedImages;

    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      error.value = "Sorry, we couldn't load the design gallery. Please try again later.";
    } finally {
      isLoading.value = false;
    }
  }

  // The store exposes the state and the action.
  return { images, isLoading, error, fetchGallery };
});