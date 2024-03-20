import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IData } from "../interfaces/data.interface";

const state = createFeatureSelector<IData>('data');

export const getData = createSelector(state, (state: IData) => state);