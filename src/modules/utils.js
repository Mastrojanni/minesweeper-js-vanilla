"use strict"

/**
 * @param {number} min - included in the generation
 * @param {number} max - excluded in the generation
 * @returns {number}
 */
function getRandomInt(min, max) {

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getTotalCellNumber() {
	return currentField.size * currentField.size;
}

function updateFieldRenderSize() {
	setElementClassName(fieldElement, `${currentField.name}-field`);
}

/**
 * @returns
 */
function createCellElement() {
	return createElementAndSetClass("cell");
}

function createCell() {

	return {
		hasMine: false,
		numberOfMinesAround: 0,
		isRevealed: false,
	};
}

function hasCellMine(coord) {
	return field[coord.row][coord.col].hasMine;
}

function validateCellCoord(coord) {

	return (
		coord.row >= 0 && coord.row < currentField.size &&
		coord.col >= 0 && coord.col < currentField.size
	);
}
