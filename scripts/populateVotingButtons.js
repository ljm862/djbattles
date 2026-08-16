import { activeRound, completedRounds, useRealName } from "./state.js";

import { addClassesToElement } from "./utils.js";
import { handleVoteClick } from "./handleVoteClick.js";

export function populateVotingButtons(container, PersonA, PersonB) {
  const roundAlreadyVoted = completedRounds.includes(activeRound);
  const containerId = container.getAttribute("container-id");

  // Voting Header
  const votingHeader = document.createElement("h1");
  votingHeader.textContent = roundAlreadyVoted
    ? "You Have Already Voted"
    : "Please Select A Playlist To Vote For";
  addClassesToElement(votingHeader, ["voting-header"]);
  container.appendChild(votingHeader);

  // Voting Container
  const votingContainer = document.createElement("div");
  votingContainer.setAttribute("voting-container-id", `${containerId}`);
  addClassesToElement(votingContainer, ["voting-container"]);

  // Voting Button A
  const votingButtonA = document.createElement("button");
  votingButtonA.setAttribute("voting-button-id", 1);
  votingButtonA.textContent = `Playlist - ${useRealName ? PersonA : "A"}`;
  addClassesToElement(votingButtonA, ["permanent-marker-regular"]);

  // Voting Button B
  const votingButtonB = document.createElement("button");
  votingButtonB.setAttribute("voting-button-id", 2);
  votingButtonB.textContent = `Playlist - ${useRealName ? PersonB : "B"}`;
  addClassesToElement(votingButtonB, ["permanent-marker-regular"]);

  if (roundAlreadyVoted) {
    votingButtonA.setAttribute("disabled", "");
    votingButtonB.setAttribute("disabled", "");
    addClassesToElement(votingButtonA, ["disabled"]);
    addClassesToElement(votingButtonB, ["disabled"]);
  }

  // Add Listeners To Buttons
  [votingButtonA, votingButtonB].forEach((button) => {
    button.addEventListener("click", (e) => handleVoteClick(e));
  });

  // Append Buttons
  votingContainer.appendChild(votingButtonA);
  votingContainer.appendChild(votingButtonB);

  // Append Voting Container
  container.appendChild(votingContainer);
}
