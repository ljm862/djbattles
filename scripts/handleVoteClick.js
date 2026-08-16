import { activeRound, completedRounds } from "./state.js";
import { handleSubmit } from "./handleSubmit.js";

export async function handleVoteClick({ target }) {
  const name = document.querySelector("input").value;

  // Ensure Name Is Present
  if (!name) {
    alert("Please enter a name!");
    return;
  }

  const vote = target.textContent;

  // Confirmation Modal And Submission
  if (window.confirm(`You voted for: ${vote}. Are you sure?`)) {
    const loader = document.getElementById("loading");

    loader.style.display = "flex";
    const voteSuccessful = await handleSubmit(target.getAttribute("voting-button-id"), name);
    completedRounds.push(activeRound);
    localStorage.setItem("completed-rounds", JSON.stringify(completedRounds));
    if (voteSuccessful) {
      alert("Thanks for submitting!");
      document.location.reload();
    } else {
      alert("Please try again and contact the admin if the issue persists.");
    }
    loader.style.display = "none";
  } else {
    alert("Choose Again!");
  }
}
