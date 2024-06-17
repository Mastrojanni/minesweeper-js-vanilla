"use strict";

const SELECT_INPUT_ID_NAME = "field-select-size";
const selectInputElement = getElementById(SELECT_INPUT_ID_NAME);

initSelect();

function initSelect() {

	createOptionElements();

	const handleSelectChange = event => {

		const fieldName = event.target.value;

		currentField = FIELDS[fieldName];
		initField();
	};

	selectInputElement.addEventListener("change", handleSelectChange);
};

function createOptionElements() {

	for (const fieldName of FIELD_NAME_LIST) {

		const optionElement = createElement("option");

		optionElement.value = fieldName;
		optionElement.innerText = fieldName.toLowerCase();

		selectInputElement.append(optionElement);
	}
}
