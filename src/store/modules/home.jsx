import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHomeData } from '@/services'

export const fetchHomeDataAction = createAsyncThunk('fetch_data', (payload) => {
  getHomeData().then((res) => {
    console.log(res)
  })
})

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    count: 99,
    message: 'Hello World'
  },
  reducers: {
    addNumberAction(state, { payload }) {
      state.count = state.count + payload
    },
    subNumberAction(state, { payload }) {
      state.count = state.count - payload
    },
    changeMessageAction(state, { payload }) {
      console.log(payload)
      state.message = payload
    }
  }
})

export const { addNumberAction, subNumberAction, changeMessageAction } = homeSlice.actions
export default homeSlice.reducer
