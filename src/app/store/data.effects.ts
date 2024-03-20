import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import {
    loadData,
    loadDataError,
    loadDataSuccess,
} from './data.actions';
import { catchError, map, mergeMap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class DataEffects {
    constructor(private actions$: Actions, private dataService: DataService) { }

    loadData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadData),
            mergeMap((action: Action | any) => {
                return this.dataService.list(action.search).pipe(
                    map((res: any) => {
                        return loadDataSuccess({ result: res });
                    }),
                    catchError(async (error) => loadDataError(error))
                );
            })
        );
    });
}
