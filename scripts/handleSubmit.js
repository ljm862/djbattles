import { activeRound, key } from "./state.js";

export function handleSubmit(vote, name) {
  const payload = {
    RoundId: activeRound,
    VoterName: name,
    Voted: vote,
    Time: new Date().toISOString(),
  };

  const url = `https://script.google.com/macros/s/${key}/exec`;
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Submission failed:", error);
  });
  return true;
}
