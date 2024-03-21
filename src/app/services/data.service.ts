import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    usuarios: IUsuario[] = [
        {
            _id: '0',
            nome: 'Hero',
            sobreNome: 'Start',
            telefone: {
                codigoDoPais: '+55',
                numero: '9192935806',
            },
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['analista', 'supervisor'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00',
        },
        {
            _id: '1',
            nome: 'Alice',
            sobreNome: 'Wonder',
            telefone: {
                codigoDoPais: '+55',
                numero: '987654321',
            },
            email: 'alice@mail.com',
            idioma: 'esp',
            contatoPreferencial: 'email',
            perfis: ['supervisor'],
            status: 'ativo',
            criadoEm: '2024-02-15T10:30:45.123+00:00',
            ultimoAcesso: '2024-03-10T18:20:15.567+00:00',
        },
        {
            _id: '2',
            nome: 'Jack',
            sobreNome: 'Power',
            telefone: {
                codigoDoPais: '+55',
                numero: '876543210',
            },
            email: 'jackpower@mail.com',
            idioma: 'pt-br',
            contatoPreferencial: 'telefone',
            perfis: ['supervisor'],
            status: 'ativo',
            criadoEm: '2024-02-28T14:45:30.987+00:00',
            ultimoAcesso: '2024-03-18T09:12:34.876+00:00',
        },
        {
            _id: '3',
            nome: 'Maria',
            sobreNome: 'Silva',
            telefone: {
                codigoDoPais: '+55',
                numero: '123456789',
            },
            email: 'maria.silva@mail.com',
            idioma: 'pt-br',
            contatoPreferencial: 'email',
            perfis: ['analista'],
            status: 'ativo',
            criadoEm: '2024-03-10T15:22:45.876+00:00',
            ultimoAcesso: '2024-03-19T11:32:56.765+00:00',
        },
        {
            _id: '4',
            nome: 'Lucas',
            sobreNome: 'Ferreira',
            telefone: {
                codigoDoPais: '+55',
                numero: '987612345',
            },
            email: 'lucas.ferreira@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['analista'],
            status: 'ativo',
            criadoEm: '2024-03-20T09:45:23.543+00:00',
            ultimoAcesso: '2024-03-20T09:45:23.543+00:00',
        },
    ];

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
