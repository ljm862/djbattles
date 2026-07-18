const choiceButtons = document.querySelectorAll("button");

choiceButtons.forEach((button) => {
  button.addEventListener("click", (e) => handleChoiceClick(e));
});

function handleChoiceClick({ target }) {
  const choice = target.textContent;
  alert(`You selected ${choice}`);
}
