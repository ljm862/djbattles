import {
  activeRound,
  data,
  existingName,
  key,
  nameInput,
  referrerpolicy,
  roundButtons,
  roundIds,
  useRealName,
} from "./scripts/state.js";

import { createRoundButtons } from "./scripts/createRoundButtons.js";
import { createRoundViews } from "./scripts/createRoundViews.js";

createRoundButtons();
createRoundViews();
document.querySelector(".round-button").click();
