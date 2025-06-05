import { gets } from "./api"

window.addEventListener("load", async () => {
    const data = await gets.getPlayerGame()
    if(data.status=="success") location.href = "lobby.html";
    const submitbutton = document.getElementById("joinButton")
    const nicknameInput = document.getElementById("nicknameInput") as HTMLInputElement;
    submitbutton?.addEventListener("click", async () => {
        if (nicknameInput.value.length>0){
            let result = await gets.joinGame(nicknameInput.value);
            if (result.status== "success") location.href = "lobby.html"
            else alert(result.message)
        }else alert("Nick nie może być pusty!")
    })

})