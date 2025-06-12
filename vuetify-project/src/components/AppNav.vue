<template>
  <v-app-bar flat absolute class="borderless transparent-navbar-with-border">
    <v-toolbar>
      <!-- Logo + App Name  -->
      <template v-slot:prepend>
        <v-btn
          class="ml-4"
          prepend-icon="mdi-creation"
          :ripple="false"
          to="/generate"
          variant="plain"
        >
          <span class="font-weight-bold text-h6"> Generate</span>
        </v-btn>

        <v-btn
          class="ml-4"
          prepend-icon="mdi-view-gallery"
          :ripple="false"
          to="/gallery"
          variant="plain"
        >
          <span class="font-weight-bold text-h6">Gallery</span>
        </v-btn>
      </template>

      <!-- Center Tabs -->

      <v-btn :ripple="false" to="landing">
        <!-- <img alt="chair-icon" class="custom-icon mr-2" src="@/assets/chair-icon.png"> -->
        <img
          alt="chair-icon"
          class="custom-icon mr-2"
          src="@/assets/kAiyulogo.png"
        />
        <span class="font-weight-black text-h4"></span>
      </v-btn>

      <!-- Right Section: Sign Up + Avatar -->
      <template v-slot:append>
        <v-btn
          color="black"
          density="compact"
          :ripple="false"
          size="auto"
          style="margin-left: 12px"
          variant="plain"
          @click="dialog = !dialog"
        >
          <span class="font-weight-bold text-h6">Sign-Up</span>
        </v-btn>

        <!-- Avatar dropdown -->
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn
              class="ml-2"
              color="black"
              icon
              v-bind="props"
              variant="plain"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list class="dropdown-list">
            <v-list-item>
              <v-btn
                block
                class="dropdown-btn"
                prepend-icon="mdi-cog"
                @click="openSettings"
                >Settings</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                block
                class="dropdown-btn"
                prepend-icon="mdi-logout"
                @click="logout"
                >Logout</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                block
                class="dropdown-btn"
                prepend-icon="mdi-theme-light-dark"
                @click="toggleTheme"
                >Toggle Theme</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { ref } from "vue";

const theme = useTheme();
const dialog = ref(false);

theme.global.name.value = "light";

function toggleTheme() {
  // theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  theme.global.name.value = "light";
}
</script>

<style scoped>
.custom-icon {
  height: 20%;
  width: 20%;
  transition: all 0.3s ease;
  object-fit: cover;
  vertical-align: middle;
}

.v-btn:hover .custom-icon {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.dropdown-list {
  min-width: 200px;
  padding: 4px;
}

.dropdown-btn {
  justify-content: flex-start;
  padding-left: 16px;
  text-transform: none;
  font-weight: normal;
}

.dropdown-btn ::v-deep .v-btn__prepend {
  margin-right: 12px;
  margin-left: 0;
}

.dropdown-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.transparent-navbar-with-border {
  background-color: transparent !important;
  background: transparent !important;
  backdrop-filter: none !important;
  border-bottom: 1px solid #e0e0e0; /* Light gray border */
}

.transparent-navbar-with-border .v-toolbar {
  background-color: transparent !important;
  background: transparent !important;
}
</style>
