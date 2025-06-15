import { renderPlayerHand } from "./render";
import spritesheet from "./spritesheet";
const playerSpace = document.getElementById("playerSpace") as HTMLCanvasElement;
const cardIdFromPixel = (x:number, y:number, transforms:DOMMatrix[]): number =>{
    for (let i =4; i>=0;i--){
        const transform = transforms[i]
        const inv = transform.inverse()
        const point = new DOMPoint(x,y).matrixTransform(inv)
        if (point.x>=0 && point.x<=150 && point.y>=0 && point.y<=230) return i
    }
    return -1;

}
const initLstenersForCards = (transforms:DOMMatrix[]) => {
    let lastId = -1
    playerSpace.addEventListener("mousemove", (e) => {
        const id = cardIdFromPixel(e.offsetX,e.offsetY,transforms)
        if (id!=-1 && id!=lastId){
            lastId= id
            const test = spritesheet.getByName("card_blue_plus");
            if (test) renderPlayerHand([test,test,test,test,test], id)
        }else if(id==-1 && id!=lastId){
            lastId= id
            const test = spritesheet.getByName("card_blue_plus");
            if (test) renderPlayerHand([test, test, test, test, test], -1);
        }
    });
}

export {initLstenersForCards}