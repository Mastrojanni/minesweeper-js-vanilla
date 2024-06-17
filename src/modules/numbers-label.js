const numbersToColors = {
    1: "color-blue",
    2: "color-green",
    3: "color-red",
    4: "color-dark-blue",
    5: "color-dark-red",
    6: "color-light-blue",
    7: "color-purple",
    8: "color-grey",
};

function createNumberElement(number) {

    if (typeof number !== "number" || isNaN(number)) {
        throw new Error("Create number element expected to be of type number");
    }

    const className = numbersToColors[number];
    const element = createElementAndSetClass(className);

	setInnerHTML(element, number);

    return element;
}
