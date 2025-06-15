import {iSprite, iSpritesheet} from "./interfaces"

class Sprite implements iSprite {
    name: string;
    type: string;
    x: number;
    y: number;
    constructor(name: string,type: string, x: number, y: number) {
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
    }
}
class Spritesheet implements iSpritesheet {
    src: string = "../turtles.gif";
    sprites: Sprite[] = [];
    dimensions: { 
        card: {width:number, height:number}; chip: {width:number, height:number}; turtle: {width:number, height:number}; board: {width:number, height:number}
    } = {
        card:{width:150,height:230}, chip:{width:150,height:150},turtle:{width:100,height:150}, board:{width:660,height:1330}
    }

    getByName(name: string): Sprite | undefined {
        return this.sprites.find((sprite) => sprite.name == name);
    }

    async load(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            const colors = ["blue","green","red","purple","yellow","rainbow"]
            colors.forEach((color,i)=>{
                
                if(color.startsWith("rainbow")){
                    //rainbow cards
                    this.sprites.push(new Sprite(`card_${color}_minus`,"card", 0, i*this.dimensions.card.height,) )
                    this.sprites.push(new Sprite(`card_${color}_plus`,"card", this.dimensions.card.width, i*this.dimensions.card.height) )
                    this.sprites.push(new Sprite(`card_${color}_up`,"card", 0, (i+1)*this.dimensions.card.height) )
                    this.sprites.push(new Sprite(`card_${color}_doubleUp`,"card", this.dimensions.card.width, (i+1)*this.dimensions.card.height) )

                    //blank chip
                    this.sprites.push(new Sprite(`chip_blank`,"chip", this.dimensions.card.width*2, i*this.dimensions.card.height,) )
                }else{
                    // adding cards
                    this.sprites.push(new Sprite(`card_${color}_minus`,"card", 0, i*this.dimensions.card.height))
                    this.sprites.push(new Sprite(`card_${color}_plus`,"card", this.dimensions.card.width, i*this.dimensions.card.height) )
                    this.sprites.push(new Sprite(`card_${color}_doublePlus`,"card", this.dimensions.card.width*2, i*this.dimensions.card.height))
                    
                    // adding chips
                    const chipStartX = this.dimensions.card.width * 3;

                    if (i!=4) this.sprites.push(new Sprite(`chip_${color}`,"chip", chipStartX+i*this.dimensions.chip.width,0))
                    else this.sprites.push(new Sprite(`chip_${color}`,"chip", chipStartX,this.dimensions.chip.height))

                    // adding turtles
                    const turlteStartx = this.dimensions.card.width * 3 + this.dimensions.chip.width

                    this.sprites.push(new Sprite(`turtle_${color}`,"turtle", turlteStartx+i*this.dimensions.turtle.width,this.dimensions.chip.height))
                }
            })
            this.sprites.push(new Sprite(`board`,"board",this.dimensions.card.width*3, this.dimensions.chip.height*2))
            resolve()
        });
    }
}

const spritesheet = new Spritesheet()
spritesheet.load();

export default spritesheet;