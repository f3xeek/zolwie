import { gets } from "./api"
import { renderPlayerCells, drawGameBoard,renderPlayerChip } from "./render"


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

const test = document.getElementById("playerSpace") as HTMLCanvasElement
const ss = test.getContext("2d")
if (ss) ss.fillRect(0, 0, 2000, 2000)