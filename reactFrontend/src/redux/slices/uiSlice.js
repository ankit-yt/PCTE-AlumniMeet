import { createSlice } from "@reduxjs/toolkit"

const getScreeninfo = (width)=>{
    return{
        screenWidth: width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
    }
}

const initialState = getScreeninfo(window.innerWidth)

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        setScreenWidth: (state , action)=>{
            const info = getScreeninfo(action.payload);
            state.screenWidth = info.screenWidth;
        }
    }
})

export const {setScreenWidth} = uiSlice.actions;
export default uiSlice.reducer;