export function genPassword(longitud) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let contraseña = '';
  for (let i = 0; i < longitud; i++) {
    const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    contraseña += caracterAleatorio;
  }
  return contraseña;
}
