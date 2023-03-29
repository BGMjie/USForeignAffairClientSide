import { configureStore } from '@reduxjs/toolkit'

import homeReducer from '@/store/modules/home'

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

export default store
