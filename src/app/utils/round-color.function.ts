export function roundColor() {
    const letras = "0123456789ABCDEF";
    let cor = "#";
    let luminosidade;

    do {
        cor = "#";
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }

        luminosidade = (
            0.299 * parseInt(cor.substring(1, 3), 16) +
            0.587 * parseInt(cor.substring(3, 5), 16) +
            0.114 * parseInt(cor.substring(5, 7), 16)
        ) / 255;

    } while (luminosidade < 0.5);

    return cor;
}