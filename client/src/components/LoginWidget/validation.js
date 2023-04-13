var EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PASSWORD_REGEX = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/;

export default function validation(inputs) {
  const errors = {};
  if (!EMAIL_REGEX.test(inputs.email) || !inputs.email) {
    errors.email = "Debe introducir un email válido";
  }
  if (inputs.name.length > 35 || !inputs.name ) {
    errors.name = "El nombre no puede ser mayor a 35 caracteres";
  }
  if (inputs.surname.length > 35 || !inputs.surname ) {
    errors.surname = "El apellido no puede ser mayor a 35 caracteres";
  }
  if (!PASSWORD_REGEX.test(inputs.password)) {
    errors.password =
      "La contraseña debe tener una longitud de entre 6 y 10 caracteres, y al menos un número, una mayúscula y una minúscula";
  }
  if (inputs.password !== inputs.verifyPassword) {
    errors.verifyPassword = "Las contraseñas no coinciden";
  }
  return errors;
}
