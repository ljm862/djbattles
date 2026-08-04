import { referrerpolicy } from "./state.js";

export function populateBattleFrames(battleContainer, battle) {
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

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}
