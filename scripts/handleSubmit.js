import { activeRound, key } from "./state.js";

export async function handleSubmit(vote, name) {
  const payload = {
    RoundId: activeRound,
    VoterName: name,
    Voted: vote,
    Time: new Date().toISOString(),
  };

  try {
    const url = `https://script.google.com/macros/s/${key}/exec`;
    console.log(JSON.stringify(payload));
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.success === true;
  } catch (error) {
    console.error("Submission failed:", error);
    return false;
  }
}
