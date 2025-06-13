import { gets } from "./api"

window.addEventListener("load", async () => {
    const styles = document.getElementById("styles") as HTMLLinkElement
    if (styles) styles.href = styles.href + "?v='" + new Date().getTime();
    async function reRender() {
        const data = await gets.getPlayerLobby();
        const pathParts = window.location.pathname.split('/');
        pathParts.pop();

        if (data.status == "fail") { alert(data.message); location.href = pathParts.join('/') + '/' }
        else if (data.players) {
            let ready = true
            data.players.forEach((player, id) => {
                if (player.turn < 1) ready = false
                const cell = document.getElementById("player" + (id + 1))
                if (cell) {
                    cell.innerText = player.name
                    cell.classList.remove("ready")
                    cell.classList.add("unready")
                    if (player.turn == 1) {
                        cell.classList.remove("unready")
                        cell.classList.add("ready")
                    }
                    if (data.selfId == player.id) cell.classList.add("self")
                }
            });
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
