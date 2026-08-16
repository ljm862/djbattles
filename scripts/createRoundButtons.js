import {
  activeRound,
  completedRounds,
  existingName,
  roundIds,
  roundButtons,
  setActiveRound,
} from "./state.js";
import { addClassesToElement, toggleClassesOnElement } from "./utils.js";
import { populateContainer } from "./populateContainer.js";

export function createRoundButtons() {
  roundIds.forEach((round) => {
    // Create Round Button
    const viewButton = document.createElement("button");
    viewButton.setAttribute("button-id", round);
    addClassesToElement(viewButton, ["round-button", "permanent-marker-regular"]);
    viewButton.textContent = `Round: ${round}`;

    const roundAlreadyVoted = completedRounds.includes(`${round}`);
    if (roundAlreadyVoted) {
      addClassesToElement(viewButton, ["voted"]);
    }

    // Handle Round Button Click
    viewButton.addEventListener("click", (e) => {
      const roundId = e.target.getAttribute("button-id");
      if (roundId == activeRound) {
        alert("Round already active!");
        return;
      }
      setActiveRound(roundId);

      // Handle UI Changes
      const activeContainer = document.querySelector(".active-container");
      if (activeContainer) {
        toggleClassesOnElement(activeContainer, ["hidden", "active-container"]);
      }

      const activeRoundButton = document.querySelector(".active-round");
      if (activeRoundButton) {
        toggleClassesOnElement(activeRoundButton, ["active-round"]);
      }

      addClassesToElement(viewButton, ["active-round"]);
      const container = document.querySelector(`[container-id="${roundId}"]`);

      if (container.dataset.loaded === "false") {
        populateContainer(container);
        container.dataset.loaded = "true";
      }

      toggleClassesOnElement(container, ["hidden", "active-container"]);
    });

    // Append Round Buttons
    roundButtons.appendChild(viewButton);
  });

  if (["DEVTEST"].includes(existingName)) {
    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh Rounds";
    refreshButton.addEventListener("click", () => {
      if (window.confirm(`ONLY CLICK THIS IF INSTRUCTED TO`)) {
        const existingName = localStorage.getItem("name") ?? "";
        localStorage.clear();
        localStorage.setItem("name", existingName);
        document.location.reload();
      } else {
        alert("Good Idea");
      }
    });
    addClassesToElement(refreshButton, "round-button");
    roundButtons.appendChild(refreshButton);
  }
}
