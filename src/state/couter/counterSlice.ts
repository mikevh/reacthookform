import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // counter/increment
        increment: (state) => {
            state.count += 1;
        },
        // counter/decrement
        decrement: (state) => {
            state.count -= 1;
        },
        // counter/incrementByAmount
         incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
        // counter/decrementByAmount
        decrementByAmount: (state, action: PayloadAction<number>) => {
            state.count -= action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            console.log("Increment async is pending...");
        }).addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        });
    }
});

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
);

export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;