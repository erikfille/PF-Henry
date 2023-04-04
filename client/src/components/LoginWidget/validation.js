var EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PASSWORD_REGEX = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/;

export default function validation(inputs) {
  const errors = {};

  if (!EMAIL_REGEX.test(inputs.username)) {
    errors.username = "Debe introducir un email válido";
  } else if (!inputs.username) errors.username = "El usuario debe ser un mail";
  else if (inputs.username.length > 35)
    errors.username = "El nombre de usuario no puede ser mayor a 35 caracteres";
  else if (!PASSWORD_REGEX.test(inputs.password)) {
    errors.password =
      "La contraseña debe tener una longitud de entre 6 y 10 caracteres, y al menos un número, una mayúscula y una minúscula";
  } else if (inputs.password !== inputs.verifyPassword) {
    errors.password = "Las contraseñas no coinciden";
  }

  return errors;
}
