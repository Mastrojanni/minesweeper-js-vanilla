"use strict"

const CHEAT_TOGGLE_FIELD_BUTTON_CLASSNAME = "reveal-field-button";

initCheatToggleFieldButton();

function initCheatToggleFieldButton() {

	const cheatToggleButtonElement = getElementById(CHEAT_TOGGLE_FIELD_BUTTON_CLASSNAME);

	bindClickHandler(cheatToggleButtonElement, handleToggleFieldButton);
}

function handleToggleFieldButton() {

	isCheatFieldRevealedOn = !isCheatFieldRevealedOn;

	if (isCheatFieldRevealedOn) {

		cheatRevealCellsContent();
		return;
	}

	cheatHideCellsContent();
}

function cheatRevealCellsContent() {

	const fieldElementChildren = getAllElementCells();

	fieldElementChildren.forEach((cell, index) => {

		const coord = getFieldCoordByFlatIndex(index);

		changeCellClassToReveal(cell);

		if (isCellFlagged(coord)) {
			return;
		}

		renderCellContent(cell, coord);
	});
}

function cheatHideCellsContent() {

	const fieldElementChildren = getAllElementCells();

	fieldElementChildren.forEach((cell, index) => {

		const coord = getFieldCoordByFlatIndex(index);

		if (isCellRevealed(coord)) {
			return;
		}

		changeCellClassToHide(cell);

		if (isCellFlagged(coord)) {
			return;
		}

		setInnerHTML(cell, "");
	});
}
