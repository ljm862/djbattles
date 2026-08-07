import { roundIds } from "./state.js";

import { addClassesToElement } from "./utils.js";

export function createRoundViews() {
  // Build Empty Container For Each Round
  roundIds.forEach((round) => {
    const container = document.createElement("div");
    container.setAttribute("container-id", round);
    addClassesToElement(container, ["container", "hidden"]);

    container.dataset.loaded = "false";
    document.body.appendChild(container);
  });
}
