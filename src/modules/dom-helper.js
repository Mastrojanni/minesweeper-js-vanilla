"use strict";

/**
 * @param {string} IDName 
 * @returns
 */
function getElementById(IDName) {

	const element = document.getElementById(IDName);

    throwOnMissingElement(element);

	return element;
}

/**
 * @requires dom-helper.setElementClassName
 * @param {string} className 
 * @returns
 */
function createElementAndSetClass(className) {

    const element = document.createElement("div");

    setElementClassName(element, className);

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
 * @param {HTMLElement} element 
 * @param {string} newClassName 
 */
function setElementClassName(element, newClassName) {

    throwOnMissingElement(element);
    throwOnMissingClassName(newClassName);

    element.className = newClassName;
}

/**
 * @param {HTMLElement} element 
 * @param {string} className 
 */
function addElementClassName(element, className) {

    throwOnMissingElement(element);
    throwOnMissingClassName(className);

    element.classList.add(className);
}

/**
 * @param {HTMLElement} element 
 * @param {string} className 
 */
function removeElementClassName(element, className) {

    throwOnMissingElement(element);
    throwOnMissingClassName(className);

    element.classList.remove(className);
}

/**
 * @param {HTMLElement} parentElement 
 * @param {HTMLElement} childElement 
 */
function appendToElement(parentElement, ...childElement) {

    throwOnMissingElement(parentElement);

    if (!childElement?.length) {
        throw new Error("You should pass two valid elements!");
    }

	parentElement.append(...childElement);
}

/**
 * @param {string} className
 * @returns
 */
function cloneElement(className) {

    const element = document.querySelector(`.${className}`);

    throwOnMissingElement(element);
    return element.cloneNode(true);
}

/**
 * @param {HTMLElement} element 
 * @returns 
 */
function getElementChildren(element) {

    throwOnMissingElement(element);
    return [...element.childNodes];
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function bindClickHandler(element, callback) {

    throwOnMissingElement(element);
    element.onclick = callback;
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function bindMouseDownHandler(element, callback) {

    throwOnMissingElement(element);
    element.onmousedown = callback;
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function bindMouseUpHandler(element, callback) {

    throwOnMissingElement(element);
    element.onmouseup = callback;
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function bindMouseOverHandler(element, callback) {

    throwOnMissingElement(element);
    element.onmouseover = callback;
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function bindMouseLeaveHandler(element, callback) {

    throwOnMissingElement(element);
    element.onmouseleave = callback;
}

/**
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function setRightClickHandler(element, callback) {

    throwOnMissingElement(element);
    element.oncontextmenu = cancelContextMenuOpening;

    function cancelContextMenuOpening() {

        callback?.();
        return false;
    };
}

/**
 * @param {HTMLElement} element
 * @param {*} payload
 */
function setInnerHTML(element, payload) {

    throwOnMissingElement(element);
    element.innerHTML = payload;
}

// #region thows utils

function throwOnMissingElement(element) {

    if (!element) {
        throw new Error("You must pass a valid element!");
    }
}

function throwOnMissingClassName(className) {

    if (!className?.trim()) {
        throw new Error("You must pass a valid className!");
    }
}

// #endregion
