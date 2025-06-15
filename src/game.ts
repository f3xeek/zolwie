import { gets } from "./api"
import { renderPlayerCells, drawGameBoard,renderPlayerChip,renderPlayerHand } from "./render"
import { iTurtle } from "./interfaces";

import spritesheet from "./spritesheet";

window.addEventListener("load", async () => {
    const testturtle = {color:"blue" , position:[1,0]} as iTurtle
    drawGameBoard([testturtle, testturtle, testturtle, testturtle, testturtle]);
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
    const clearSessionButton = document.getElementById("clearSession");
    if(clearSessionButton) clearSessionButton.addEventListener("click", gets.clearSession);
})
const test = spritesheet.getByName("card_blue_plus");
if (test) renderPlayerHand([test,test, test, test, test], -1,true);