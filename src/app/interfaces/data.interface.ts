import { HttpErrorResponse } from "@angular/common/http";

export interface IData {
    result: any;
    isLoading?: boolean;
    error?: HttpErrorResponse | null;
}