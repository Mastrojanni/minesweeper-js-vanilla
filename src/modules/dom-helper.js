"use strict";

/**
 * @param {string} idName 
 * @returns
 */
function getElementById(idName) {

	const element = document.getElementById(idName);

    if (!element) {
        throw new Error("Unable to locate field element in the DOM");
    }

	return element;
}

/**
 * @param {string} className 
 * @returns
 */
function createElementAndSetClass(className) {

    if (!className?.trim()) {
        throw new Error("You must set a valid class name before creating an element");
    }

    const element = document.createElement("div");
    element.className = className;

    return element;
}

/**
 * @param {string} elementName 
 * @returns
 */
function createElement(elementName) {
	return document.createElement(elementName);
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} newClassName 
 */
function setElementClassName(element, newClassName) {
	element.className = newClassName;
}

/**
 * 
 * @param {HTMLElement} parentElement 
 * @param {HTMLElement} childElement 
 */
function appendToElement(parentElement, childElement) {
	parentElement?.append(childElement);
}
