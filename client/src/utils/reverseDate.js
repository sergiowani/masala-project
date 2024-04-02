/* invierte la fecha a formato dd/mm/yyyy en zona horaria +2*/

export const invertirFecha = (fecha) => {
  if (!fecha) {
    return '';
  }

  const fechaObj = new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return fecha; // Devolver la fecha original si no es válida
  }

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  const fechaLocal = fechaObj.toLocaleDateString('es-ES', options);

  return fechaLocal;
};

/* invierte la fecha a formato yyyy/mm/dd y ajusta a zona horaria +2*/

export const invertirFecha2 = (fecha) => {
  if (!fecha) {
    return '';
  }

  const fechaObj = new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return fecha; // Devolver la fecha original si no es válida
  }

  fechaObj.setUTCHours(fechaObj.getUTCHours() + 2); // Ajustar a la zona horaria +2

  const año = fechaObj.getUTCFullYear();
  const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, '0');
  const dia = String(fechaObj.getUTCDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
};

