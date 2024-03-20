import { createReducer, on } from '@ngrx/store';
import { loadData, loadDataError, loadDataSuccess } from './data.actions';
import { IData } from '../interfaces/data.interface';

export const initialState: IData = {
    result: {},
    isLoading: false,
    error: null,
};

export const dataReducer = createReducer(
    initialState,
    on(loadData, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(loadDataSuccess, (state, props) => ({
        ...state,
        ...props,
        isLoading: false,
        error: null,
    })),
    on(loadDataError, (state, props) => ({
        ...state,
        isLoading: false,
        error: props.error,
    }))
);
