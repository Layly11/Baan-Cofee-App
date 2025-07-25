import {configureStore} from '@reduxjs/toolkit';
import {AuthReducers} from './Reducers';

const store = configureStore({
    reducer: {
        Auth: AuthReducers
    }
})

export default store