import data from "./example.json" with { type: "json" };

const roundIds = new Set(data.map(({ RoundId }) => RoundId));
const roundButtons = document.querySelector("#round-buttons");
const container = document.querySelector("#container");
const referrerpolicy = "strict-origin-when-cross-origin";
const useRealName = false;

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

      const container = document.querySelector(`[container-id="${roundId}"]`);

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

    populateContainer(container);
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

  const votingContainer = document.createElement("div");
  votingContainer.setAttribute("voting-container-id", `${containerId}`);
  votingContainer.classList.add("voting-container");

  const votingButtonA = document.createElement("button");
  const votingButtonB = document.createElement("button");

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

    setAttributes(iframe, attributes);
    battleContainer.appendChild(iframe);
  });
}

function handleVoteClick({ target }) {
  const name = document.querySelector("input").value;
  if (!name) {
    alert("Please enter a name!");
    return;
  }
  const vote = target.textContent;
  if (window.confirm(`You voted for: ${vote}. Are you sure?`)) {
    alert("Thanks for submitting!");
  } else {
    alert("Choose Again!");
  }
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function populatePlaylists() {
  const attributes = {
    src: "https://www.youtube.com/embed/YQHsXMglC9A",
    referrerpolicy: "strict-origin-when-cross-origin",
  };

  const iframe = document.createElement("iframe");
  setAttributes(iframe, attributes);
  container.appendChild(iframe);
}

createRoundButtons();
createRoundViews();
