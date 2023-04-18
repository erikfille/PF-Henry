export default function validation(inputs) {
	const errors = {};

	if (!inputs.nombre.length) {
		errors.nombre = "Tu mascota debe tener un nombre";
	}
	if (!inputs.especie) {
		errors.especie = "Debes nombrar la especie de tu mascota";
	}

	return errors;
}
