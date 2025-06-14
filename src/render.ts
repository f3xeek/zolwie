import { Player,iSprite } from "./interfaces"
import spriteSheet from "./spritesheet"

const spritesheetImage = document.getElementById("spritesheet") as HTMLImageElement
const canvas = document.getElementById("gameBoard") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
const render_sprite = (customCtx:CanvasRenderingContext2D,sprite:iSprite,x:number,y:number):void =>{
    type AssetName = keyof typeof spriteSheet.dimensions
    const typedsprite = sprite.type as AssetName
    const dimensions = spriteSheet.dimensions[typedsprite];
    customCtx.drawImage(spritesheetImage, sprite.x, sprite.y, dimensions.width, dimensions.height, x, y, dimensions.width, dimensions.height)
}
const drawGameBoard = (): void => {
    if (ctx) {
        const boardsprite = spriteSheet.getByName("board")
        if (boardsprite ) render_sprite(ctx,boardsprite, 0,0);
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
    if (chipContext && chip){
        render_sprite(chipContext, chip, 0,0)
        
    }
}

export { renderPlayerCells, drawGameBoard, renderPlayerChip };