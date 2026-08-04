function addClassesToElement(element, classes) {
  element.classList.add(...classes);
}

function toggleClassesOnElement(element, classes) {
  classes.forEach((className) => {
    element.classList.toggle(className);
  });
}

export { addClassesToElement, toggleClassesOnElement };
