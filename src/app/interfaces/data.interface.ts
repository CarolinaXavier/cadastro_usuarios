import { HttpErrorResponse } from "@angular/common/http";

export interface IData {
    documentos: any[],
    totalDocumentos: number,
    limite: number,
    totalPaginas: number,
    pagina: number,
    anterior: boolean,
    proxima: boolean,
}