import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faShoePrints,
  faRepeat,
  faWaterLadder,
  faMoon,
  faHands,
  faMugHot,
  faSun,
  faMobile,
  faBookmark,
  faFaceSmileWink
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faShoePrints,
  faRepeat,
  faWaterLadder,
  faMoon,
  faHands,
  faMugHot,
  faSun,
  faMobile,
  faBookmark,
  faFaceSmileWink
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
