export function removeAcentuacao(texto: string) {
    if (!texto) { return '' }
    texto = texto.replace(/[ÀÁÂÃÄÅ]/, "A");
    texto = texto.replace(/[àáâãäå]/, "a");
    texto = texto.replace(/[ÈÉÊË]/, "E");
    texto = texto.replace(/[Ç]/, "C");
    texto = texto.replace(/[ç]/, "c");
    return texto.replace(/[^a-z0-9]/gi, '');
}