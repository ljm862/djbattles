import json from "../data.json" with { type: "json" };

export let activeRound;
export function setActiveRound(round) {
  activeRound = round;
}

export const data = json,
  existingName = localStorage.getItem("name"),
  key = "AKfycbz8wAfT4ccaIi4sUEoAOKIkZc4qWta1fnbyZ9iK-fVKImdmow5k0By1xedi9H7YoVjr",
  nameInput = document.querySelector("input"),
  referrerpolicy = "strict-origin-when-cross-origin",
  roundButtons = document.querySelector("#round-buttons"),
  roundIds = new Set(data.map(({ RoundId }) => RoundId)),
  useRealName = false;

// Pre-populate name field from local storage and handle change
if (existingName) {
  nameInput.value = existingName;
}
nameInput.addEventListener("focusout", () => {
  localStorage.setItem("name", nameInput.value);
});
