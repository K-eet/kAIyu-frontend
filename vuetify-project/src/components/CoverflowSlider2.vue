<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 col-md-8 col-xl-5 mx-auto">
        <div class="swiper swiper-coverflow swiper-3d" ref="swiperContainer">
          <div class="swiper-wrapper">
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="swiper-slide sn_slider_projects_sl"
            >
              <div class="slide-title-overlay">{{ slide.title }}</div>
              <a :href="slide.link">
                <picture>
                  <source :srcset="slide.imageWebp" type="image/webp" />
                  <source :srcset="slide.image" />
                  <img
                    class="swiper-lazy"
                    :width="slide.width"
                    :height="slide.height"
                    :alt="slide.alt"
                    :title="slide.title"
                    :src="slide.image"
                  />
                </picture>
              </a>
            </div>
          </div>
          <!-- Add Navigation -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swiper from "swiper";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

// Install Swiper modules
Swiper.use([EffectCoverflow, Navigation, Pagination, Autoplay]);

const swiperContainer = ref(null);

const slides = ref([
  {
    title: "Traditional",
    link: "https://www.ikea.com/my/en/rooms/living-room/gallery/a-traditional-living-room-with-space-for-everyone-pub63f26030/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_Zona-living-di-design-2.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "traditional living room",
  },
  {
    title: "Modern",
    link: "https://www.ikea.com/my/en/rooms/home-office/gallery/a-modern-creative-space-with-an-industrial-look-pubd542ba20/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/01_Living-Classico.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/4ef4dd0b4051d8e8/original/PH204214.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "modern creative space with an industrial look",
  },
  {
    title: "Cosy",
    link: "https://www.ikea.com/ext/ingkadam/m/4194cd61cd25237/original/PH200869.jpg?f=sg",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_cucina-e-salotto-insieme-open-space.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/4194cd61cd25237/original/PH200869.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "cosy bedroom",
  },
  {
    title: "Scandinavian",
    link: "https://www.ikea.com/my/en/rooms/living-room/gallery/a-scandinavian-small-living-room-done-the-way-you-want-pub79bdb940/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_casa-arredata-in-stile-pop-art.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/fe32aed04d21b3e/original/PH204076_SHI_001.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "scandinavian living room",
  },
  {
    title: "Contemporary",
    link: "https://www.ikea.com/my/en/rooms/kitchen/gallery/a-small-kitchen-with-airy-light-and-minimalist-appeal-pub9b453e90/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_casa-personalizzata-con-arredi-su-misura.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/20a25be75a8174f0/original/PH201703.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "small and airy kitchen",
  },
  {
    title: "Modern Minimalist",
    link: "https://www.ikea.com/my/en/rooms/dining/gallery/sliding-doors-and-a-round-table-a-small-smart-and-versatile-dining-room-pub60e3ac40/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/01_Arredamento-open-space-moderno-scaled.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/6a1e114fb5b559fc/original/PH201471.jpg?f=sg",
    width: 2560,
    height: 1440,
    alt: "versatile dining room",
  },
  {
    title: "Traditional",
    link: "https://www.ikea.com/my/en/rooms/dining/gallery/a-traditional-dining-room-with-space-for-the-whole-family-pub8c46f220/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_Poltrona-Saba-new-york.jpg.webp',
    image:
      "https://www.ikea.com/ext/ingkadam/m/4e2450f65149d097/original/PH200257.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "traditional living room",
  },
  {
    title: "Bohemian",
    link: "https://shop.arredodalpozzo.it/project/villa-di-design/",
    // imageWebp: 'https://shop.arredodalpozzo.it/wp-content/uploads/2022/05/1_open-space-villa-design.jpg.webp',
    image:
      "https://www.ikea.com/images/a-grey-green-taellasen-upholstered-bed-frame-with-privacy-sc-88f435346a1c1f0df3b1a984a24d2334.jpg?f=sg",
    width: 2400,
    height: 1350,
    alt: "serene calm bedroom",
  },
]);

onMounted(() => {
  new Swiper(swiperContainer.value, {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    loopedSlides: slides.value.length,
    centeredSlides: true,
    effect: "coverflow",
    speed: 800,
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 200,
      scale: 0.7,
      stretch: 0,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      500: {
        coverflowEffect: {
          stretch: 20,
        },
      },
      992: {
        coverflowEffect: {
          stretch: 0,
        },
      },
    },
    autoplay: {
      delay: 9000,
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
  });
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 1080px;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.swiper-slide-active {
  transform: scale(2.5);
  transition: transform 0.3s ease-in-out;
}

.swiper-slide-prev,
.swiper-slide-next {
  transform: scale(0.6);
  transition: transform 0.3s ease-in-out;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-next,
.swiper-button-prev {
  color: #4a2511;
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  z-index: 10;
}

.swiper-button-prev {
  left: calc(34.2% - 210px);
}

.swiper-button-next {
  right: calc(34.2% - 210px);
}

.sn_slider_projects_sl {
  position: relative;
  overflow: hidden;
  border-radius: 33px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sn_slider_projects_sl img {
  width: 100%;
  height: auto;
  display: block;
}

.slide-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: #ffffff;
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  font-weight: 700;
  text-align: left;
  z-index: 5;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
}

.sn_slider_projects_sl:hover .slide-title-overlay,
.swiper-slide-active .slide-title-overlay {
  opacity: 1;
  transform: translateY(0); /* Slide up into view */
}
</style>
