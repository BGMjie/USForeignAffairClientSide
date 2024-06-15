import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMergedData, getTrumpData } from '@/services'
import { Dayjs } from 'dayjs'

// export const fetchTrumpDataAction = createAsyncThunk('fetch_trump_data', async () => {
//   return await getTrumpData()
// })

export const fetchTrumpDataAction = createAsyncThunk('fetch_trump_data', (payload, { dispatch, getState }) => {
  const state = getState()
  getTrumpData(payload).then((res) => {
    dispatch(changeTrumpDataAction(res))
  })
})

export const fetchMergedDataAction = createAsyncThunk('fetch_merged_data', (payload, { dispatch, getState }) => {
  const state = getState()
  getMergedData(payload).then((res) => {
    dispatch(changeMergedDataAction(res))
  })
})

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    count: 99,
    message: 'Hello World',
    trump_data: {},
    merged_data: {},
    dateStrings: ['2023-09-21', '2023-10-21']
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
    },
    changeTrumpDataAction(state, { payload }) {
      state.trump_data = payload
    },
    changeMergedDataAction(state, { payload }) {
      state.merged_data = payload
    },
    changeDateAction(state, { payload }) {
      state.dateStrings = payload
    }
  },
  extraReducers: {
    // [fetchTrumpDataAction.fulfilled](state, { payload }) {
    //   state.trump_data = payload
    // }
  }
})

export const {
  addNumberAction,
  subNumberAction,
  changeMessageAction,
  changeTrumpDataAction,
  changeMergedDataAction,
  changeDateAction
} = homeSlice.actions
export default homeSlice.reducer
