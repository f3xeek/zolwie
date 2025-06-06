import { gets } from "./api"

window.addEventListener("load", async () => {
    const styles = document.getElementById("styles") as HTMLLinkElement
    if (styles) styles.href = styles.href + "?v='" + new Date().getTime();
    async function reRender() {
        const data = await gets.getPlayerGame();
        if (data.status == "fail") { alert(data.message); location.href = "/zolwie" }
        else if (data.players) {
            data.players.forEach((player, id) => {
                const cell = document.getElementById("player" + (id + 1))
                if (cell) {
                    cell.innerText = player.name
                    if (data.selfId == player.id) cell.classList.add("self")
                }
            });
            console.log(data.players);
        }
    }
    reRender()
    setInterval(reRender, 3000)

});
