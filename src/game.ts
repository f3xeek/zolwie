import { gets } from "./api"
import { renderPlayerCells, drawGameBoard,renderPlayerChip,renderPlayerHand } from "./render"

import sheet from "./spritesheet";

window.addEventListener("load", async () => {
    drawGameBoard();
    renderPlayerChip(false);
    const data = await gets.getPlayerLobby();
    const pathParts = window.location.pathname.split("/");
    pathParts.pop();
    if (data.status == "fail") {
        alert(data.message);
        location.href = pathParts.join("/") + "/";
    } else {
        if (data.players && data.selfId!==undefined) {
            renderPlayerCells(data.players, data.selfId, true);
        }
    }
})
const test = sheet.getByName("card_blue_plus");
if (test) renderPlayerHand([test,test, test, test, test], -1,true);