export default function validation(inputs) {
  const errors = {};

  if (inputs.titulo.length < 1) {
    errors.titulo = "Tu producto debe tener un nombre";
    errors.state = true;
  }
  if (inputs.titulo.length > 70) {
    errors.titulo = "El nombre de tu producto debe ser menor a 70 caracteres";
    errors.state = true;
  }
  if (inputs.healthScore > 100) {
    errors.healthScore = "Health Score can't be major than 100";
    errors.state = true;
  }
  if (inputs.healthScore < 1) {
    errors.healthScore = "Health Score can't be minor than 1";
    errors.state = true;
  }

  if (inputs.descripcion.length < 1) {
    errors.descripcion = "Tu producto debe tener una descripción";
    errors.state = true;
  }

  if (inputs.descripcion.length > 0 && inputs.descripcion.length <= 500) {
    errors.descripcion = `Te quedan ${500 - inputs.descripcion.length} caracteres`;
    if (!errors.titulo && !errors.healthScore) {
      errors.state = false;
    }
  }

  if (inputs.descripcion.length > 500) {
    errors.descripcion = "Your recipe can't be longer than 500 characters";
    errors.state = true;
  }

  return errors;
}
