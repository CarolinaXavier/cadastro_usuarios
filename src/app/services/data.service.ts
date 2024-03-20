import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    usuarios: IUsuario[] = [
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
        {
            nome: 'Hero',
            sobreNome: 'start',
            telefone: '+55',
            email: 'heromail@mail.com',
            idioma: 'ing',
            contatoPreferencial: 'telefone',
            perfis: ['usuario'],
            status: 'ativo',
            criadoEm: '2024-01-05T21:56:21.033+00:00',
            ultimoAcesso: '2024-01-05T21:56:21.033+00:00'
        },
    ];

    constructor() { }

    list(search: any): Observable<any> {
        return new Observable((obs) => {
            obs.next({
                documentos: this.usuarios,
                totalDocumentos: 0,
                limite: 0,
                totalPaginas: 0,
                pagina: 0,
                anterior: false,
                proxima: false,
            });
        });
    }
}
