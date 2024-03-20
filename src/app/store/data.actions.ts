import { createAction, props } from "@ngrx/store";
import { IData } from "../interfaces/data.interface";
import { IDataFiltro } from "../interfaces/data-filtro.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const loadData = createAction('[Data] Load', props<{ filtro: IDataFiltro }>());
export const loadDataSuccess = createAction('[Data] Load Success', props<IData>());
export const loadDataError = createAction('[Data] Load Error', props<{ error: HttpErrorResponse }>());