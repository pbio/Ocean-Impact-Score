import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface StateInterface {
    value: Item
}

const initialState: StateInterface = {
    value:  {
        ticker: 'No Ticker',
        daily: null,
        monthly: null,
        yearly: null,
        ranking: {year: 0, month: 0, day: 0},
        rank:[0,0]
    }
};
interface Item {
    ticker: string,
    daily: any,
    monthly: any,
    yearly: any,
    ranking: {year: number, month: number, day: number},
    rank:number[]
  }

export const selectedTickerSlice = createSlice({
    name: 'selectedTicker',
    initialState,
    reducers: {
        addTicker: (state: any, action: PayloadAction<Item>) => { state.value = action.payload },
        removeTicker: (state: any) => { state.value = 
            {
                ticker: 'No Ticker',
                daily: null,
                monthly: null,
                yearly: null,
                ranking: {year: 0, month: 0, day: 0},
                rank:[0,0]
            } 
        }
    }
});

export const { addTicker, removeTicker } = selectedTickerSlice.actions;

export const selectTicker = (state: any) => state.selectedTicker.value;

export default selectedTickerSlice.reducer;