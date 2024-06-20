"use strict";

// Global constants
const FIELD_ID_NAME = "field";

const FIELD_NAME_LIST = [ "small", "intermediate", "expert" ];

const FIELDS = {
    small: {
		name: FIELD_NAME_LIST[0],
		size: 9,
		mines: 10
	},
    intermediate: {
		name: FIELD_NAME_LIST[1],
		size: 16,
		mines: 40
	},
    expert: {
		name: FIELD_NAME_LIST[2],
		size: 22,
		mines: 99
	},
};

const fieldElement = getElementById(FIELD_ID_NAME);
let currentField = FIELDS.small;
let field = [];
let mineCoordsList = [];
let isCheatFieldRevealedOn = false;
let numberOfFlaggedCells = 0;
let numberOfRevealedCells = 0;
let isGameOver = false;
let hasWonTheGame = false;
let hasGameStarted = false;
let secondsElapsedFromGameStart = 0;
let timerIntervalID;
let canChangeFace = true;

main();

function main() {

	// assuming the field it's always a grid

	// 1. render field, so cells of cells, no children inside
		// bind cells with onclick passing coord value
	// 2. populate field logic matrix
		// - place mines
		// - save placed mines index
		// - update near cells mines with number of mines around ?
	// 3. on cell click we have coord of clicked cell so:
		// - if this have mine, game over
		// - explore algorithm with recursion

	setRightClickHandler(fieldElement, () => {});
	initField();
};

function initField() {

	isCheatFieldRevealedOn = false;
	numberOfFlaggedCells = 0;
	numberOfRevealedCells = 0;
	isGameOver = false;
	hasWonTheGame = false;
	hasGameStarted = false;
	secondsElapsedFromGameStart = 0;
	canChangeFace = true;

	clearInterval(timerIntervalID);

	changeFaceToNeutral();

	renderField();
	populateLogicField();
	placeMines();
	initOutputBoxes();
	updateMineCounter();
	updateTimerBoxTimer();
	calculateCellsNumberOfMines();
}

function renderField() {

	setInnerHTML(fieldElement, "");
	updateFieldRenderSize();

	for (let row=0; row < currentField.size; row++) {

		for (let col=0; col < currentField.size; col++) {

			const cell = createCellElement();
			const coord = { row, col };

			bindMouseDownHandler(cell, () => handleCellMouseDown(cell, coord));
			bindMouseUpHandler(cell, () => handleCellMouseUp(coord));

			bindClickHandler(cell, () => handleCellClick(coord));
			setRightClickHandler(cell, () => handleCellRightClick(coord));

			appendToElement(fieldElement, cell);
		}
	}
}

function handleCellClick(coord) {

	if (isGameOver || isCellFlagged(coord) || isCheatFieldRevealedOn) {
		return;
	}

	if (hasCellMine(coord)) {
		
		handleGameOver(coord);
		return;
	}

	exploreCells(coord);
	startTimer();
	handleVictory();
}

function exploreCells(coord) {

	const validCellsAround = getCellsAroundOne(coord);

	if (getNumberOfMinesOfCell(coord) === 0 && !isCellRevealed(coord)) {

		revealCell(coord);
		numberOfRevealedCells += 1;

		for (const nearCoord of validCellsAround) {
			exploreCells(nearCoord);
		}
	}

	if (!isCellRevealed(coord)) {

		numberOfRevealedCells += 1;
		revealCell(coord);
	}
}

function handleGameOver(mineHit) {

	isGameOver = true;
	canChangeFace = true;
	
	const mineHitElement = getRenderedCell(mineHit);

	clearInterval(timerIntervalID);
	allowToSetFaces();
	changeFaceToCry();
	addElementClassName(mineHitElement, "mine-hit");
	revealAllCells();

	alert("MINE! GAME OVER!");
}

function handleVictory() {

	const numberOfCellsWithoutMines = getTotalCellNumber() - currentField.mines;

	if (numberOfRevealedCells < numberOfCellsWithoutMines) {
		return;
	}

	clearInterval(timerIntervalID);
	isGameOver = true;
	hasWonTheGame = true;
	allowToSetFaces();
	changeFaceToVomit();
	revealAllCells();

	alert("Victory!");
}

function revealAllCells () {

	for (let row=0; row < currentField.size; row++) {

		for (let col=0; col < currentField.size; col++) {

			const coord = { row, col };
			revealCell(coord);
		}
	}
}

function revealCell(coord) {

	if (!validateCellCoord(coord)) {
		return;
	}

	const cell = getRenderedCell(coord);

	changeCellClassToReveal(cell);
	setCellRevealed(coord, true);
	renderCellContent(cell, coord);
}

// TODO refactor
function handleCellRightClick(coord) {

	const cell = getRenderedCell(coord);

	if (isGameOver || isCheatFieldRevealedOn || isCellRevealed(coord)) {
		return;
	}

	toggleCellIsFlagged(coord);

	if (numberOfFlaggedCells >= currentField.mines && isCellFlagged(coord)) {

		// aka revert
		toggleCellIsFlagged(coord);
		return;
	}

	startTimer();
	changeFaceToStupid();
	setTimeout(changeFaceToNeutral, 500);

	if (isCellFlagged(coord)) {

		const flagElement = createFlagElement();

		appendToElement(cell, flagElement);
		numberOfFlaggedCells += 1;
		updateMineCounter();

		return;
	}

	setInnerHTML(cell, "");
	numberOfFlaggedCells -= 1;
	updateMineCounter();
}

function startTimer() {

	if (hasGameStarted) {
		return;
	}

	hasGameStarted = true;
	timerIntervalID = setInterval(updateTimerTick, 1000);
}

function handleCellMouseDown(cell, coord) {

	if (isCellRevealed(coord) || isCellFlagged(coord)) {
		return;
	}

	// TODO refactor?
	bindMouseLeaveHandler(cell, () => {

		if (!isGameOver) {
			changeFaceToNeutral();
		}

		bindMouseLeaveHandler(cell, undefined);
	});

	changeFaceToHappy();
}

function handleCellMouseUp(coord) {

	if (isGameOver || isCellRevealed(coord) || isCellFlagged(coord)) {
		return;
	}

	changeFaceToNeutral();
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

		setCellMineFlag(mineCoord, true);
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

    const candidatesOfCoordsCellToUpdate = getCellsAroundOne(mineCoordinate);

	for (const [_key, coord] of Object.entries(candidatesOfCoordsCellToUpdate)) {

		if (hasCellMine(coord)) {
			continue;
		}

		addOneToNumberOfMinesAroundOfCell(coord);
	}
}
