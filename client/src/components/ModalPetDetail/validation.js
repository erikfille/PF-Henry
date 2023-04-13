export default function validation(inputs) {
  const errors = {};

  if (!inputs.titulo) {
    errors.titulo = "El evento debe tener un nombre";
  }
  if (!inputs.descripcion.length) {
    errors.descripcion = "Agrega una descripcion del evento";
  }
  if (inputs.descripcion.length > 300) {
    errors.descripcion = "Tu descripcion no puede contener más de 300 caracteres";
  }

  return errors;
}
