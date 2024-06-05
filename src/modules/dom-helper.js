"use strict";

function getElementById(idName) {

	const element = document.getElementById(idName);

    if (!element) {
        throw new Error("Unable to locate field element in the DOM");
    }

	return element;
}

function createElementAndSetClass(className) {

    if (!className?.trim()) {
        throw new Error("You must set a valid class name before creating an element");
    }

    const element = document.createElement("div");

    element.className = className;

    return element;
}
