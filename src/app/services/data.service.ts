import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';
import { dataSources } from '../sources/data-sources';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    usuarios: IUsuario[] = dataSources;

    constructor() { }

    add(usuario: IUsuario): Observable<any> {
        return new Observable((obs) => {
            try {
                this.usuarios.unshift(usuario);
                obs.next({
                    message: 'sucesso!',
                });
            } catch {
                obs.error({
                    message: 'erro!',
                });
            }
        });
    }

    edit(usuario: IUsuario): Observable<any> {
        return new Observable((obs) => {
            try {
                this.usuarios = this.usuarios.map((u) => {
                    if (u._id === usuario._id) {
                        u = {
                            ...u,
                            ...usuario,
                        };
                    }
                    return u;
                });
                obs.next({
                    message: 'sucesso!',
                });
            } catch {
                obs.error({
                    message: 'erro!',
                });
            }
        });
    }

    remove(_id: string): Observable<any> {
        return new Observable((obs) => {
            try {
                this.usuarios = this.usuarios.filter((u) => u._id !== _id);
                obs.next({
                    message: 'sucesso!',
                });
            } catch {
                obs.error({
                    message: 'erro!',
                });
            }
        });
    }

    list(search: any): Observable<any> {
        return new Observable((obs) => {
            try {
                obs.next({
                    documentos: this.usuarios,
                    totalDocumentos: 0,
                    limite: 0,
                    totalPaginas: 0,
                    pagina: 0,
                    anterior: false,
                    proxima: false,
                });
            } catch {
                obs.error({
                    message: 'erro!',
                });
            }
        });
    }
}
