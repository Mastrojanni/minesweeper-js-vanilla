"use strict";

// Global constants
const FIELD_ID_NAME = "field";
const FIELD_NAME_LIST = [ "small", "intermediate", "expert" ];

const FIELDS = {
    small: { name: FIELD_NAME_LIST[0], size: 9, mines: 10},
    intermediate: { name: FIELD_NAME_LIST[1], size: 16, mines: 40 },
    expert: { name: FIELD_NAME_LIST[2], size: 22, mines: 99 },
};

let currentField = FIELDS.small;
let field = [];
const fieldElement = getElementById(FIELD_ID_NAME);
let mineCoordsList = [];

main();

function main() {

	renderField();
	populateLogicField();
	placeMines();
	calculateCellsNumberOfMines();

	cheatRenderCellsContent();

    // TODO remove this cheat
    console.log(field);
};

function renderField() {

	updateFieldRenderSize();

	for (let row=0; row < currentField.size; row++) {

		for (let col=0; col < currentField.size; col++) {

			const cell = createCellElement();

			cell.onclick = () => handleCellClick({row, col});
			appendToElement(fieldElement, cell);
		}
	}
}

function handleCellClick(coord) {
	// TODO write logic
	console.log(coord);
}

function populateLogicField() {

	field = [];

	for (let row=0; row < currentField.size; row++) {

		const rowSupp = [];

		for (let col=0; col < currentField.size; col++) {

			const cell = createCell();
			rowSupp.push(cell);
		}

		field.push(rowSupp);
	}
}

function placeMines() {

	let minesLeftToPlace = currentField.mines;
	mineCoordsList = [];

    while (minesLeftToPlace > 0) {

		const mineCoord = {
			row: getRandomInt(0, currentField.size),
			col: getRandomInt(0, currentField.size),
		};

		if (hasCellMine(mineCoord)) {
			continue;
		}

		field[mineCoord.row][mineCoord.col].hasMine = true;
		mineCoordsList.push(mineCoord);
		minesLeftToPlace -= 1;
    }
}

function calculateCellsNumberOfMines() {

	for (const mineCoord of mineCoordsList) {
		calculateNumberOfMinesAroundCell(mineCoord);
	}
}

function calculateNumberOfMinesAroundCell(mineCoordinate) {

    const candidatesOfCoordsCellToUpdate = {
        top: {
            row: mineCoordinate.row - 1,
            col: mineCoordinate.col,
        },

        topRight: {
            row: mineCoordinate.row - 1,
            col: mineCoordinate.col + 1,
        },

        right: {
            row: mineCoordinate.row,
            col: mineCoordinate.col + 1,
        },

        downRight: {
            row: mineCoordinate.row + 1,
            col: mineCoordinate.col + 1,
        },

        down: {
            row: mineCoordinate.row + 1,
            col: mineCoordinate.col,
        },

        downLeft: {
            row: mineCoordinate.row + 1,
            col: mineCoordinate.col - 1,
        },

        left: {
            row: mineCoordinate.row,
            col: mineCoordinate.col - 1,
        },

        topLeft: {
            row: mineCoordinate.row - 1,
            col: mineCoordinate.col - 1,
        },
    };

	for (const [_key, coord] of Object.entries(candidatesOfCoordsCellToUpdate)) {

		if (!validateCellCoord(coord) || hasCellMine(coord)) {
			continue;
		}

		field[coord.row][coord.col].numberOfMinesAround += 1;
	}
}

function cheatRenderCellsContent() {

	const fieldElementChildren = [...fieldElement.childNodes];
	
	fieldElementChildren.forEach((cell, index) => {

		const row = Math.floor(index / currentField.size);
		const col = index % currentField.size;

		if (hasCellMine({ row, col })) {

			const mineElement = createElementAndSetClass("mine");
			appendToElement(cell, mineElement);
		}

		if (field[row][col].numberOfMinesAround !== 0) {
			cell.innerHTML = field[row][col].numberOfMinesAround;
		}
	});
}
