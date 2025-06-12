const spritesheet = document.getElementById("spritesheet") as HTMLImageElement
const canvas = document.getElementById("gameBoard") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
function drawGameBoard(): void {
    if (ctx) {
        ctx.drawImage(spritesheet, 450, 300, 650, 1300, 0, 0, 650, 1300)
    }
}
window.addEventListener("load", () => {
    drawGameBoard()
})
const test = document.getElementById("playerSpace") as HTMLCanvasElement
const ss = test.getContext("2d")
if (ss) ss.fillRect(0, 0, 1000, 10000)