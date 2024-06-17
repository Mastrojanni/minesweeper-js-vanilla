"use strict"

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min - included in the generation
 * @param {number} max - excluded in the generation
 * @returns {number}
 */
function getRandomInt(min, max) {

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
