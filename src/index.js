"use strict";

// Global constants
const FIELD_ID_NAME = "field";

const FIELD_SIZES = {
    small: 10,
    medium: 15,
    expert: 30,
};

const currentFieldSize = FIELD_SIZES.small;
const currentCellNumber = currentFieldSize * currentFieldSize;
const maxNumberOfMines = currentFieldSize;

const field = Array(currentCellNumber).fill({ numberOfMinesAround: 0 });

/**
 *
 * @param {object} mineCoordinate
 * @param {number} mineCoordinate.rowIndex
 * @param {number} mineCoordinate.colIndex
 */
const updateNumberOfMinesAroundMineIndex = mineCoordinate => {

    const cellsToUpdateCoordinates = {
        top: {
            rowIndex: mineCoordinate.rowIndex - 1,
            colIndex: mineCoordinate.colIndex,
        },

        topRight: {
            rowIndex: mineCoordinate.rowIndex - 1,
            colIndex: mineCoordinate.colIndex + 1,
        },

        right: {
            rowIndex: mineCoordinate.rowIndex,
            colIndex: mineCoordinate.colIndex + 1,
        },

        downRight: {
            rowIndex: mineCoordinate.rowIndex + 1,
            colIndex: mineCoordinate.colIndex + 1,
        },

        down: {
            rowIndex: mineCoordinate.rowIndex + 1,
            colIndex: mineCoordinate.colIndex,
        },

        downLeft: {
            rowIndex: mineCoordinate.rowIndex + 1,
            colIndex: mineCoordinate.colIndex - 1,
        },

        left: {
            rowIndex: mineCoordinate.rowIndex,
            colIndex: mineCoordinate.colIndex - 1,
        },

        topLeft: {
            rowIndex: mineCoordinate.rowIndex - 1,
            colIndex: mineCoordinate.colIndex - 1,
        },
    };

    const coordinatesToUpdate = Object.values(cellsToUpdateCoordinates);

    coordinatesToUpdate.forEach(coordinate => {

        const flatIndex = calculateFlatIndex(
            { rowIndex: coordinate.rowIndex, colIndex: coordinate.colIndex }
        );

        if (flatIndex >= 0 && !field[flatIndex]?.hasMine){

            field[flatIndex] = {
                ...field[flatIndex],
                numberOfMinesAround: field[flatIndex]?.numberOfMinesAround + 1,
            };
        }
    });
};

const renderCells = fieldElement => {

    for (let i=0; i < currentCellNumber; i++) {

        const newCellElement = createElementAndSetClass("cell");

        if (field[i]?.hasMine) {

            const mineElement = createElementAndSetClass("mine");
            newCellElement.append(mineElement);
        }

        if (field[i]?.numberOfMinesAround !== 0) {
            newCellElement.innerHTML = field[i]?.numberOfMinesAround;
        }

        fieldElement.append(newCellElement);
    }
};

const initializeMapField = () => {

    let minesToPlace = maxNumberOfMines;

    while (minesToPlace > 0) {

        const rowIndex = getRandomInt(0, currentFieldSize);
        const colIndex = getRandomInt(0, currentFieldSize);
        const mineIndex = calculateFlatIndex({ rowIndex, colIndex });

        if (!field[mineIndex]?.hasMine) {

            field[mineIndex] = {
                ...field[mineIndex],
                hasMine: true,
                numberOfMinesAround: 0
            };

            updateNumberOfMinesAroundMineIndex({ rowIndex, colIndex });
            minesToPlace -= 1;
        }
    }
};

const createField = () => {

    const fieldElement = getElementById(FIELD_ID_NAME);

    initializeMapField();
    renderCells(fieldElement);
};

const main = () => {

    createField();

    // TODO remove this cheat
    console.log(field);
};

main();


/* UTILS */

function calculateFlatIndex({ rowIndex, colIndex }) {

    if (rowIndex < 0 || colIndex < 0 || rowIndex >= currentFieldSize || colIndex >= currentFieldSize) {
        // TODO what to return?
        return false;
    }

    return rowIndex * currentFieldSize + colIndex;
}

/**
 *
 * @param {number} min - included in the generation
 * @param {number} max - excluded in the generation
 * @returns
 */
function getRandomInt(min, max) {

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
