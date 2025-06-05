import {gets} from "./api"

window.addEventListener("load",async () => {
    const data = await gets.getPlayerGame();
    if (data.status == "fail") {alert(data.message); location.href = "/zolwie"}
    else if(data.players){
        data.players.forEach((player,id) => {
            const cell = document.getElementById("player"+(id+1))
            if (cell) {
                cell.innerText = player.name
                console.log(data.selfId == player.id, data.selfId , player.id);
                if (data.selfId==player.id) cell.classList.add("self")
            }
        });
        console.log(data.players);
    }
});
