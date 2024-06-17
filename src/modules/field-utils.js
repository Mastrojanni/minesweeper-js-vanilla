"use strict"

const CELL_CLASSNAME = "cell";
const REVEALED_CLASSNAME = "revealed";
const MINE_CLASSNAME = "mine";
const MINE_EXPLODED_CLASSNAME = "mine-explosion";
const FLAG_CLASSNAME = "flag";

function getFieldCoordByFlatIndex(flatIndex) {

	const row = Math.floor(flatIndex / currentField.size);
	const col = flatIndex % currentField.size;

	return { row, col };
}

function getFieldFlatIndexByCoord(coord) {
	return coord.row * currentField.size + coord.col;;
}

function getTotalCellNumber() {
	return currentField.size * currentField.size;
}

function updateFieldRenderSize() {
	setElementClassName(fieldElement, `${currentField.name}-field`);
}

function changeCellClassToReveal(cell) {
	addElementClassName(cell, REVEALED_CLASSNAME);
}

function changeCellClassToHide(cell) {
	removeElementClassName(cell, REVEALED_CLASSNAME);
}

function getRenderedCell(coord) {

	const flatIndex = getFieldFlatIndexByCoord(coord);
	const fieldElementChildren = getAllElementCells(fieldElement);

	return fieldElementChildren[flatIndex];
}

function renderCellContent(cell, coord) {

	const cellChildren = getElementChildren(cell);

	if (cellChildren?.length > 0) {
		return;
	}

	if (hasCellMine(coord) && isGameOver && !hasWinTheGame) {

		const explodedMineElement = createExplodedMineElement();
		appendToElement(cell, explodedMineElement);
		return;
	}

	if (hasCellMine(coord)) {
		
		const mineElement = createMineElement();
		appendToElement(cell, mineElement);
		return;
	}

	if (isCellFlagged(coord)) {

		const flagElement = createFlagElement();
		appendToElement(cell, flagElement);
		return;
	}

	if (getNumberOfMinesOfCell(coord) !== 0) {

		const numberOfMinesAround = getNumberOfMinesOfCell(coord);
		const numberElement = createNumberElement(numberOfMinesAround);

		appendToElement(cell, numberElement);
	}
}

function getAllElementCells() {
	return getElementChildren(fieldElement);
}

function createCellElement() {
	return createElementAndSetClass(CELL_CLASSNAME);
}

function createMineElement() {
	return cloneElement(MINE_CLASSNAME);
}

function createExplodedMineElement() {
	return cloneElement(MINE_EXPLODED_CLASSNAME);
}

function createFlagElement() {
	return cloneElement(FLAG_CLASSNAME);
}

function createCell() {

	return {
		hasMine: false,
		isFlagged: false,
		numberOfMinesAround: 0,
		isRevealed: false,
	};
}

function hasCellMine(coord) {
	return getCell(coord)?.hasMine;
}

function setCellMineFlag(coord, hasMine) {

	if (typeof hasMine !== "boolean") {
		throw new Error("You must pass a boolean!");
	}

	if (!validateCellCoord(coord)) {
		return;
	}

	field[coord.row][coord.col].hasMine = hasMine;
}

function isCellFlagged(coord) {
	return field[coord.row][coord.col].isFlagged;
}

function toggleCellIsFlagged(coord) {

	if (!validateCellCoord(coord)) {
		return;
	}

	field[coord.row][coord.col].isFlagged = !field[coord.row][coord.col].isFlagged;
}

function getNumberOfMinesOfCell(coord) {
	return getCell(coord)?.numberOfMinesAround;
}

function addOneToNumberOfMinesAroundOfCell(coord) {

	if (!validateCellCoord(coord)) {
		return;
	}

	field[coord.row][coord.col].numberOfMinesAround += 1;
}

function isCellRevealed(coord) {
	return field[coord.row][coord.col].isRevealed;
}

function setCellRevealed(coord, isRevealed) {

	if (typeof isRevealed !== "boolean") {
		throw new Error("You must pass a boolean!");
	}

	if (!validateCellCoord(coord)) {
		return;
	}

	field[coord.row][coord.col].isRevealed = isRevealed;
}

function getCell(coord) {

	if (!validateCellCoord(coord)) {
		return false;
	}

	return field[coord.row]?.[coord.col];
}

function validateCellCoord(coord) {

	return (
		coord.row >= 0 && coord.row < currentField.size &&
		coord.col >= 0 && coord.col < currentField.size
	);
}

function getCellsAroundOne(coord) {

	const coordsOfCellsAround = {
        top: {
            row: coord.row - 1,
            col: coord.col,
        },

        topRight: {
            row: coord.row - 1,
            col: coord.col + 1,
        },

        right: {
            row: coord.row,
            col: coord.col + 1,
        },

        downRight: {
            row: coord.row + 1,
            col: coord.col + 1,
        },

        down: {
            row: coord.row + 1,
            col: coord.col,
        },

        downLeft: {
            row: coord.row + 1,
            col: coord.col - 1,
        },

        left: {
            row: coord.row,
            col: coord.col - 1,
        },

        topLeft: {
            row: coord.row - 1,
            col: coord.col - 1,
        },
    };

	const validCoords = [];

	for (const [_key, coord] of Object.entries(coordsOfCellsAround)) {

		if (!validateCellCoord(coord)) {
			continue;
		}

		validCoords.push(coord);
	}

	return validCoords;
}
