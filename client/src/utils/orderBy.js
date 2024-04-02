/* ordenar buscando el primer elemento númerico */
export const extractNumberFromName = (name) => {
  const match = name.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};