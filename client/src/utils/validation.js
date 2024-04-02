// letras y espacio

export const isLetterWithSpace = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  const char = String.fromCharCode(charCode);

  // Utiliza una expresión regular para permitir letras y espacios
  if (/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/.test(char)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

// números

export const isNumber = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // Utiliza una expresión regular para permitir solo dígitos numéricos
  if (/\d/.test(String.fromCharCode(charCode))) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

export const isValidFloat = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  const inputValue = String.fromCharCode(charCode);
  const currentValue = event.target.value;

  // Utiliza una expresión regular para permitir 7 enteros y 2 decimales, y limitar a 10 caracteres
  const regex = /^[0-9]{0,7}(\.[0-9]{0,2})?$/;

  if (regex.test(currentValue + inputValue) && currentValue.length < 10) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

//alfanumericos y espacios

export const isAlphaNumericWithSpaces = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // Utiliza una expresión regular para permitir números, letras y espacios
  if (/^[a-zA-Z0-9\s]*$/.test(String.fromCharCode(charCode))) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

// teléfono, admite +, números, espacios y máximo 30 caracteres 

export const isValidPhoneNumber = (event) => {
  const char = event.key;
  const inputValue = event.target.value;

  // Verifica si ya hay un signo + presente
  const plusSignExists = inputValue.includes('+');

  // Si el carácter es un dígito, un espacio o el signo más y la longitud es menor que 30, o si es el primer carácter y es un signo más, permite la entrada
  if ((/^\d$/.test(char) || char === ' ' || (char === '+' && !plusSignExists && inputValue.length === 0)) && inputValue.length < 30) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};


// Para enviar los formularios pulsando Enter

export const onEnter = (e) =>{
  if (e.keyCode === 13) {
    find()
  }
}

//  Para que sea obligatorio el @ en el email

export function validateEmail(value) {
  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}


export function IsInRegister(user_id, user_id2, course_id, course_id2 ) {
  if(user_id == user_id2 && course_id == course_id2){
    return true
  }else{
    return false
  }
}

