import {configureStore} from '@reduxjs/toolkit'
import userSlices from '../slices/userSlices'

const store = configureStore({
   reducer: {
    userReducer: userSlices
   }
})

export default store