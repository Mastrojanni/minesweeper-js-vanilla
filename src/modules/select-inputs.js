"use strict";

const SELECT_INPUT_ID_NAME = "field-select-size";

const initializeAllSelectInput = () => {

	const changeFieldSizeInputElement = getElementById(SELECT_INPUT_ID_NAME);

	const handleFieldSizeInput = event => {
		console.log("SELECT", event.target.value);
	};

	changeFieldSizeInputElement.addEventListener("change", handleFieldSizeInput);
};

initializeAllSelectInput();
