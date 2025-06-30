/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'


// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

//Pinia
import { createPinia } from 'pinia'

//Router
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

registerPlugins(app)

app.mount('#app')
