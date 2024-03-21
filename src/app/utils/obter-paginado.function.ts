import { IPaginacao } from "../interfaces/paginacao.interface";

export function obterPaginado(items: any[], pagina: number, limite: number, fields: string[] | null = null, keyword: string | null = null): IPaginacao {

    if (keyword && fields) {
        items = items.filter(element =>
            Object.keys(element).some((key) =>
                fields.includes(key)
                    ? element[key].toLowerCase().includes(keyword.toLowerCase())
                    : null
            )
        );
    }

    items.map((element, index) => {
        element.index = index + 1;
    })

    let documentos: any[] = [];
    let totalPaginas = Math.ceil(items.length / limite);
    let count = pagina * limite - limite;
    let delimiter = count + limite;
    if (pagina <= totalPaginas) {
        items.slice(count, delimiter).forEach((element) => {
            documentos.push(element);
        });
    }
    return {
        documentos: documentos,
        paginaAtual: pagina,
        limite: limite,
        hasPaginaAnterior: pagina > 1 ? true : false,
        hasProximaPagina: pagina < totalPaginas ? true : false,
        totalDocumentos: items.length,
        totalPaginas: totalPaginas,
    };
}
