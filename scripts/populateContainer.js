import { data } from "./state.js";

import { addClassesToElement } from "./utils.js";
import { populateBattleFrames } from "./populateBattleFrames.js";
import { populateVotingButtons } from "./populateVotingButtons.js";

export function populateContainer(container) {
  const containerId = container.getAttribute("container-id");
  const roundBattles = data.filter(({ RoundId }) => RoundId == containerId);

  // Build Containers For Each Song
  roundBattles.forEach((battle) => {
    const battleId = battle.SongId;
    const battleContainer = document.createElement("div");
    battleContainer.setAttribute("battle-container-id", `${containerId}-${battleId}`);

    addClassesToElement(battleContainer, ["battle-container"]);
    populateBattleFrames(battleContainer, battle);

    container.appendChild(battleContainer);
  });

  // Build Voting Buttons For Each Round
  const { PersonA, PersonB } = roundBattles.find(({ RoundId }) => RoundId == containerId);
  populateVotingButtons(container, PersonA, PersonB);
}
