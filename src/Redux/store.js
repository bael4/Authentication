import {configureStore} from "@reduxjs/toolkit";

import regSlice from "./slicers/regSlice";
import todoSlice from "./slicers/todoSlice";

export default configureStore({
    reducer:{
        reg:regSlice,
        todosConfig: todoSlice,
    }
})