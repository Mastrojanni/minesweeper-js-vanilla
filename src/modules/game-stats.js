"use strict"

const TIMER_ID = "timer-box";
const MINE_COUNTER_ID = "mine-count-box";
const FACE_BOX_ID = "face-status";
const NEUTRAL_FACE_CLASSNAME = "neutral-face";
const SMILING_FACE_CLASSNAME = "smiling-face";
const STUPID_FACE_CLASSNAME = "stupid-face";
const HAPPY_FACE_CLASSNAME = "happy-face";
const CRY_FACE_CLASSNAME = "cry-face";
const VOMIT_FACE_CLASSNAME = "vomit-face";
const SWEAT_FACE_CLASSNAME = "sweat-face";
const FEAT_FACE_CLASSNAME = "fear-face";

const SMILING_FACE_SVG = '';

const timerBoxElement = getElementById(TIMER_ID);
const mineCounterBoxElement = getElementById(MINE_COUNTER_ID);
const faceBoxElement = getElementById(FACE_BOX_ID);
const neutralFaceElement = cloneElement(NEUTRAL_FACE_CLASSNAME);
const smilingFaceElement = cloneElement(SMILING_FACE_CLASSNAME);
const stupidFaceElement = cloneElement(STUPID_FACE_CLASSNAME);
const happyFaceElement = cloneElement(HAPPY_FACE_CLASSNAME);
const cryFaceElement = cloneElement(CRY_FACE_CLASSNAME);
const vomitFaceElement = cloneElement(VOMIT_FACE_CLASSNAME);
const sweatFaceElement = cloneElement(SWEAT_FACE_CLASSNAME);
const fearFaceElement = cloneElement(FEAT_FACE_CLASSNAME);

let canChangeNeutralFace = true;
let canChangeAnyFace = true;

initOutputBoxes();

function initOutputBoxes() {

	allowToSetFaces();
	setInnerHTML(timerBoxElement, "000");
	setInnerHTML(mineCounterBoxElement, "00");
}

function allowToSetFaces() {

	canChangeNeutralFace = true;
	canChangeAnyFace = true;
}

function updateTimerTick() {

	secondsElapsedFromGameStart += 1;
	updateTimerBoxTimer();
	updateFacesByTime();
}

function updateTimerBoxTimer() {

	let finalElapsedTime = secondsElapsedFromGameStart.toString();

	if (finalElapsedTime.length > 3) {
		finalElapsedTime = "///";
	}

	if (finalElapsedTime.length === 2) {
		finalElapsedTime = `0${finalElapsedTime}`;
	}

	if (finalElapsedTime.length === 1) {
		finalElapsedTime = `00${finalElapsedTime}`;
	}

	setInnerHTML(timerBoxElement, finalElapsedTime);
}

function updateFacesByTime() {

	if (secondsElapsedFromGameStart > 240 && canChangeAnyFace) {

		changeFaceToFear();
		canChangeAnyFace = false;
	}

	if (secondsElapsedFromGameStart > 120  && canChangeNeutralFace) {

		changeFaceToSweat();
		canChangeNeutralFace = false;
	}
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

	const calculatedNeutralFace = calculateNeutralFaceElement();
	changeFaceTo(calculatedNeutralFace);
}

function calculateNeutralFaceElement() {

	if (!canChangeNeutralFace) {
		return sweatFaceElement;
	}

	return neutralFaceElement;
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

function changeFaceToSweat() {
	changeFaceTo(sweatFaceElement);
}

function changeFaceToFear() {
	changeFaceTo(fearFaceElement);
}

function changeFaceTo(faceElement) {

	if (!canChangeAnyFace) {
		return;
	}

	throwOnMissingElement(faceElement);
	setInnerHTML(faceBoxElement, "");
	appendToElement(faceBoxElement, faceElement);
}
