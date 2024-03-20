export interface IUsuario {
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    perfis: string[];
    idioma: string;
    contatoPreferencial: string;

    status: 'ativo' | 'pendente' | 'bloqueado';
    criadoEm: string;
    ultimoAcesso: string;
}
