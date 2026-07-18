const choiceButtons = document.querySelectorAll("button");

choiceButtons.forEach((button) => {
  button.addEventListener("click", (e) => handleChoiceClick(e));
});

function handleChoiceClick({ target }) {
  const choice = target.textContent;
  if (window.confirm(`You selected ${choice}, are you sure?`)) {
    alert("Thanks for submitting!");
  } else {
    alert("Choose Again!");
  }
}
