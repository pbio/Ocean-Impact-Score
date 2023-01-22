
import { configureStore } from '@reduxjs/toolkit'
import selectedTickerReducer from '../components/select-ticker-slice'

export const selectedTickerStore = configureStore({
    reducer: { 
        selectedTicker: selectedTickerReducer
    }
}); 





