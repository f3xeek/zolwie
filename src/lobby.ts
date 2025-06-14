import { gets } from "./api"
import { renderPlayerCells } from "./render";
window.addEventListener("load", async () => {
    const styles = document.getElementById("styles") as HTMLLinkElement
    if (styles) styles.href = styles.href + "?v='" + new Date().getTime();
    async function reRender() {
        const data = await gets.getPlayerLobby();
        const pathParts = window.location.pathname.split('/');
        pathParts.pop();

        if (data.status == "fail") { alert(data.message); location.href = pathParts.join('/') + '/' }
        else if (data.players && data.selfId!==undefined) {
            const ready = renderPlayerCells(data.players,data.selfId,false);
            if (ready && data.players.length > 1) location.href = pathParts.join('/') + '/game.html'
        }
    }
    reRender()
    setInterval(reRender, 3000)

    const readyButton = document.getElementById("readyButton") as HTMLButtonElement
    readyButton.addEventListener("click", async () => {
        const data = await gets.postPlayerReady()
        if (data.status == "fail") alert(data.message)
        else reRender()

    })
});
