import json from "../data.json" with { type: "json" };

export let activeRound;
export function setActiveRound(round) {
  activeRound = round;
}

export const data = json,
  existingName = localStorage.getItem("name"),
  key = "AKfycbxuYNwBMavBuxn9kt8uqZ8-2jbRq1P2FYNboRDtW8h5VWryF4I2-aOz0TCUbADc-2q5",
  localStorageKey = "completed-rounds3",
  nameInput = document.querySelector("input"),
  referrerpolicy = "strict-origin-when-cross-origin",
  roundButtons = document.querySelector("#round-buttons"),
  roundIds = [...new Set(data.map(({ RoundId }) => RoundId))],
  useRealName = false;

export const completedRounds = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

history.scrollRestoration = "manual";

// Pre-populate name field from local storage and handle change
if (existingName) {
  nameInput.value = existingName;
}
nameInput.addEventListener("focusout", () => {
  localStorage.setItem("name", nameInput.value);
});
