export default function validation(inputs) {
  const errors = {};

  if (!inputs.nombre.length) {
    errors.nombre = "Tu mascota debe tener un nombre";
  }
  if (!inputs.especie) {
    errors.especie = "Debes nombrar la especie de tu mascota";
  }
  if (!inputs.descripcion.length) {
    errors.descripcion = "Agrega una descripcion de tu mascota";
  }
  if (inputs.descripcion.length > 200 && inputs.descripcion.length <= 500) {
    errors.descripcion = `Te quedan ${500 - inputs.descripcion.length} caracteres`;
  }
  if (inputs.descripcion.length > 500) {
    errors.descripcion = "Tu descripcion no puede contener más de 500 caracteres";
  }
  if (!inputs.fechaDeNacimiento) {
    errors.fechaDeNacimiento = "Elegi una fecha";
  }

  return errors;
}
