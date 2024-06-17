"use strict"

const MINE_COUNTER_ID = "mine-count-box";
const FACE_BOX_ID = "face-status";
const NEUTRAL_FACE_CLASSNAME = "neutral-face";
const SMILING_FACE_CLASSNAME = "smiling-face";
const STUPID_FACE_CLASSNAME = "stupid-face";
const HAPPY_FACE_CLASSNAME = "happy-face";
const CRY_FACE_CLASSNAME = "cry-face";
const VOMIT_FACE_CLASSNAME = "vomit-face";

const SMILING_FACE_SVG = '';

const mineCounterBoxElement = getElementById(MINE_COUNTER_ID);
const faceBoxElement = getElementById(FACE_BOX_ID);
const neutralFaceElement = cloneElement(NEUTRAL_FACE_CLASSNAME);
const smilingFaceElement = cloneElement(SMILING_FACE_CLASSNAME);
const stupidFaceElement = cloneElement(STUPID_FACE_CLASSNAME);
const happyFaceElement = cloneElement(HAPPY_FACE_CLASSNAME);
const cryFaceElement = cloneElement(CRY_FACE_CLASSNAME);
const vomitFaceElement = cloneElement(VOMIT_FACE_CLASSNAME);

initMineCounterBox();

function initMineCounterBox() {

	setInnerHTML(mineCounterBoxElement, "00");
}

function updateMineCounter() {

	const minesLeft = (currentField.mines - numberOfFlaggedCells).toString();

	if (minesLeft.length === 1) {

		setInnerHTML(mineCounterBoxElement, `0${minesLeft}`);
		return;
	}

	setInnerHTML(mineCounterBoxElement, minesLeft);
}

initFace();

function initFace() {

	appendToElement(faceBoxElement, neutralFaceElement);

	bindMouseOverHandler(faceBoxElement, () => {

		if (isGameOver) {
			return;
		}

		changeFaceToSmiling();
	});

	bindMouseLeaveHandler(faceBoxElement, () => {

		if (isGameOver) {
			return;
		}

		changeFaceToNeutral();
	});
}

function changeFaceToSmiling() {
	changeFaceTo(smilingFaceElement);
}

function changeFaceToNeutral() {
	changeFaceTo(neutralFaceElement);
}

function changeFaceToStupid() {
	changeFaceTo(stupidFaceElement);
}

function changeFaceToHappy() {
	changeFaceTo(happyFaceElement);
}

function changeFaceToCry() {
	changeFaceTo(cryFaceElement);
}

function changeFaceToVomit() {
	changeFaceTo(vomitFaceElement);
}

function changeFaceTo(faceElement) {

	throwOnMissingElement(faceElement);
	setInnerHTML(faceBoxElement, "");
	appendToElement(faceBoxElement, faceElement);
}
