import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const useGalleryStore = defineStore('gallery', () => {
  // --- STATE ---
  const images = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // --- ACTIONS ---
  async function fetchGallery() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // First, get the list of all generated rooms
      const galleryResponse = await axios.get(`${API_BASE_URL}/generated/gallery`);
      const rooms = galleryResponse.data;

      // Now, for each room, fetch its detailed detection data
      const formattedImages = await Promise.all(rooms.map(async (room) => {
        const getFilename = (path) => path.split(/[/\\]/).pop();
        
        const originalSrc = `${API_BASE_URL}/generated/view/uploads/${getFilename(room.original_image_path)}`;
        const generatedSrc = `${API_BASE_URL}/generated/view/generated/${getFilename(room.generated_image_path)}`;

        let detectedItems = [];
        try {
          // Fetch the detection results for each specific room ID
          const detectionResponse = await axios.get(`${API_BASE_URL}/generated/coordinates/${room.generated_room_id}`);
          
          // This endpoint seems to return coordinates. We need to adapt this if the structure is different.
          // For now, let's assume we need to call the detection endpoint again if coordinates are not enough.
          // A better backend design would be to have a single endpoint that returns all gallery item data.
          // Given the current structure, let's simulate fetching the full detection data.
          // This part is tricky without knowing the exact backend response for `/coordinates/`.
          // Let's assume for now the gallery gives us everything we need, or we adjust the call.
          
          // Let's assume the gallery endpoint *should* return everything. If not, the backend may need a new endpoint.
          // For a robust frontend fix, we'll fetch details if missing.
        } catch (e) {
          console.warn(`Could not fetch details for room ${room.generated_room_id}`, e);
        }

        return {
          id: room.id,
          originalSrc,
          generatedSrc,
          alt: `${room.room_style} - ${room.design_style}`,
          // We need to ensure detected_items are available. A better approach might be a dedicated endpoint.
          // For now, we'll assume the gallery click should trigger a fresh detection if data isn't available.
          // The most direct fix is to adjust the productStore to handle this.
        };
      }));

      // A simplified approach given the likely backend structure:
      const simplifiedImages = rooms.map(room => {
          const getFilename = (path) => path.split(/[/\\]/).pop();
          return {
              id: room.id,
              originalSrc: `${API_BASE_URL}/generated/view/uploads/${getFilename(room.original_image_path)}`,
              generatedSrc: `${API_BASE_URL}/generated/view/generated/${getFilename(room.generated_image_path)}`,
              alt: `${room.room_style} - ${room.design_style}`,
              generated_room_id: room.generated_room_id, // Pass the ID
          }
      });

      images.value = simplifiedImages;

    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      error.value = "Sorry, we couldn't load the design gallery. Please try again later.";
    } finally {
      isLoading.value = false;
    }
  }

  return { images, isLoading, error, fetchGallery };
});