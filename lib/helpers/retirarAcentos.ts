/**
 *
 * helper para ignorar acento
 * @param str string com acentuação
 * @returns string sem acentos e em lowerCase, util para comparação
 */
export default function retirarAcentos(str: string): string {
  return str
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase(); // deixa tudo minúsculo
}
