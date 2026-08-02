import data from "./data.json" with { type: "json" };

const key = "AKfycbz8wAfT4ccaIi4sUEoAOKIkZc4qWta1fnbyZ9iK-fVKImdmow5k0By1xedi9H7YoVjr";
const roundIds = new Set(data.map(({ RoundId }) => RoundId));
const roundButtons = document.querySelector("#round-buttons");
const referrerpolicy = "strict-origin-when-cross-origin";
const useRealName = false;
const existingName = localStorage.getItem("name");
const nameInput = document.querySelector("input");

let activeRound;

function createRoundButtons() {
  roundIds.forEach((round) => {
    console.log(round);
    const viewButton = document.createElement("button");
    viewButton.setAttribute("button-id", round);
    viewButton.classList.add("round-button");
    viewButton.textContent = `Round: ${round}`;

    viewButton.addEventListener("click", (e) => {
      const roundId = e.target.getAttribute("button-id");
      if (roundId == activeRound) {
        alert("Round already active!");
        return;
      }
      activeRound = roundId;

      const activeContainer = document.querySelector(".active-container");
      if (activeContainer) {
        activeContainer.classList.toggle("hidden");
        activeContainer.classList.toggle("active-container");
      }

      const activeRoundButton = document.querySelector(".active-round");
      if (activeRoundButton) {
        activeRoundButton.classList.toggle("active-round");
      }

      viewButton.classList.add("active-round");

      const container = document.querySelector(`[container-id="${roundId}"]`);

      if (container.dataset.loaded === "false") {
        populateContainer(container);
        container.dataset.loaded = "true";
      }

      container.classList.toggle("hidden");
      container.classList.toggle("active-container");
    });
    roundButtons.appendChild(viewButton);
  });
}

function createRoundViews() {
  roundIds.forEach((round) => {
    const container = document.createElement("div");
    container.setAttribute("container-id", round);
    container.classList.add("container");
    container.classList.add("hidden");

    const heading = document.createElement("h1");
    heading.textContent = `Round: ${round}`;
    container.appendChild(heading);

    container.dataset.loaded = "false";
    document.body.appendChild(container);
  });
}

function populateContainer(container) {
  const containerId = container.getAttribute("container-id");
  const roundBattles = data.filter(({ RoundId }) => RoundId == containerId);

  roundBattles.forEach((battle) => {
    const battleId = battle.SongId;
    const battleContainer = document.createElement("div");
    battleContainer.setAttribute("battle-container-id", `${containerId}-${battleId}`);
    battleContainer.classList.add("battle-container");

    populateBattleFrames(battleContainer, battle);
    container.appendChild(battleContainer);
  });

  const { PersonA, PersonB } = roundBattles.find(({ RoundId }) => RoundId == containerId);
  populateVotingButtons(container, PersonA, PersonB);
}

function populateVotingButtons(container, PersonA, PersonB) {
  const containerId = container.getAttribute("container-id");

  const votingHeader = document.createElement("h1");
  votingHeader.textContent = "Please Select A Playlist To Vote For";
  votingHeader.classList.add("voting-header");
  container.appendChild(votingHeader);

  const votingContainer = document.createElement("div");
  votingContainer.setAttribute("voting-container-id", `${containerId}`);
  votingContainer.classList.add("voting-container");

  const votingButtonA = document.createElement("button");
  votingButtonA.setAttribute("voting-button-id", 1);

  const votingButtonB = document.createElement("button");
  votingButtonB.setAttribute("voting-button-id", 2);

  votingButtonA.textContent = `Playlist - ${useRealName ? PersonA : "A"}`;
  votingButtonB.textContent = `Playlist - ${useRealName ? PersonB : "B"}`;

  [votingButtonA, votingButtonB].forEach((button) => {
    button.addEventListener("click", (e) => handleVoteClick(e));
  });

  votingContainer.appendChild(votingButtonA);
  votingContainer.appendChild(votingButtonB);

  container.appendChild(votingContainer);
}

function populateBattleFrames(battleContainer, battle) {
  const songs = [battle.URLA, battle.URLB];

  songs.forEach((song) => {
    const src = song.replace("watch?v=", "embed/");
    const attributes = { src, referrerpolicy };
    const iframe = document.createElement("iframe");
    iframe.loading = "lazy";

    setAttributes(iframe, attributes);
    battleContainer.appendChild(iframe);
  });
}

async function handleVoteClick({ target }) {
  const name = document.querySelector("input").value;

  if (!name) {
    alert("Please enter a name!");
    return;
  }

  const vote = target.textContent;
  if (window.confirm(`You voted for: ${vote}. Are you sure?`)) {
    const loader = document.getElementById("loading");

    loader.style.display = "flex";
    const voteSuccessful = await handleSubmit(target.getAttribute("voting-button-id"), name);
    if (voteSuccessful) {
      alert("Thanks for submitting!");
    } else {
      alert("Please try again and contact the admin if the issue persists.");
    }
    loader.style.display = "none";
  } else {
    alert("Choose Again!");
  }
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

async function handleSubmit(vote, name) {
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

if (existingName) {
  nameInput.value = existingName;
}

nameInput.addEventListener("focusout", () => {
  localStorage.setItem("name", nameInput.value);
});

createRoundButtons();
createRoundViews();
