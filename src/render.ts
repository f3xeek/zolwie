import { Player,iSprite } from "./interfaces"
import spriteSheet from "./spritesheet"
import { initLstenersForCards } from "./actions";

const spritesheetImage = document.getElementById("spritesheet") as HTMLImageElement
const gameBoardCanvas = document.getElementById("gameBoard") as HTMLCanvasElement
const playerCanvas = document.getElementById("playerSpace") as HTMLCanvasElement
let playerCTX: CanvasRenderingContext2D | null,
    gameBoardCTX: CanvasRenderingContext2D | null;

if (playerCanvas) {
    playerCanvas.width = playerCanvas.getBoundingClientRect().width;
    playerCanvas.height = playerCanvas.getBoundingClientRect().height;
    playerCTX = playerCanvas.getContext("2d");
    gameBoardCTX = gameBoardCanvas.getContext("2d");
}
const renderSprite = (customCtx:CanvasRenderingContext2D,sprite:iSprite,x:number,y:number):void =>{
    type AssetName = keyof typeof spriteSheet.dimensions
    const typedsprite = sprite.type as AssetName
    const dimensions = spriteSheet.dimensions[typedsprite];
    customCtx.drawImage(spritesheetImage, sprite.x, sprite.y, dimensions.width, dimensions.height, x, y, dimensions.width, dimensions.height)
}
const drawGameBoard = (): void => {
    if (gameBoardCTX) {
        const boardsprite = spriteSheet.getByName("board");
        if (boardsprite) renderSprite(gameBoardCTX, boardsprite, 0, 0);
    }
}
const renderPlayerCells = (playersData:Player[],selfId:number, deleteExcess:boolean) => {
    let ready = true;
    playersData.forEach((player, id) => {
        if (player.turn < 1) ready = false;
        const cell = document.getElementById("player" + (id + 1));
        if (cell) {
            cell.innerText = player.name;
            cell.classList.remove("ready");
            cell.classList.add("unready");
            if (player.turn == 1) {
                cell.classList.remove("unready");
                cell.classList.add("ready");
            }
            if (selfId == player.id) cell.classList.add("self");
        }
    });
    if (deleteExcess){
        for (let i=playersData.length+1;i<=5;i++){
            const cell = document.getElementById("player" + i);
            if (cell) {
                cell.remove()
            }
        }
    }
    return ready
}
const renderPlayerChip = (exposed:boolean, name?:string):void =>{
    const chipCanvas = document.getElementById("playerChip") as HTMLCanvasElement
    const chipContext = chipCanvas.getContext("2d")
    let chip = null
    if (exposed && name) chip = spriteSheet.getByName(name)
    else chip = spriteSheet.getByName("chip_blank") 
    if (chipContext && chip) renderSprite(chipContext, chip, 0,0)
}
const clearCanvas = (customCTX:CanvasRenderingContext2D):void =>{
    customCTX.clearRect(0,0,2000,2000)
}
const renderPlayerHand = (hand:iSprite[], highlighted: number,initial=false): void => {
    if (playerCTX) {
        clearCanvas(playerCTX)
        const transforms:DOMMatrix[] = []
        playerCTX.save();
        playerCTX.translate(470, 700);
        
        playerCTX.rotate(-1/3*Math.PI );
        playerCTX.strokeStyle = "red";
        playerCTX.fillStyle = "red";
        playerCTX.scale(.7,.7)
        hand.forEach((card, i) => {
            transforms.push(playerCTX.getTransform())
            if (highlighted == i) {
                playerCTX.scale(1.2, 1.2);
                playerCTX.beginPath()
                playerCTX.roundRect(-5, -60, 160, 240, 15);
                playerCTX.fill();
                renderSprite(playerCTX, card, 0, -55);
                playerCTX.scale(1/1.2, 1/1.2);
            }
            else{
                renderSprite(playerCTX, card, 0, 0);
            }
            playerCTX.translate(175, 10);
            playerCTX.rotate((1/6) * Math.PI);

        });
        playerCTX.restore();
        if (initial) initLstenersForCards(transforms);
        
    }
};
export { renderPlayerCells, drawGameBoard, renderPlayerChip, renderPlayerHand };