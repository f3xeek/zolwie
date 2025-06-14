interface Player {
    id: number | string;
    name: string;
    turn: number;
}
interface iSprite {
    name: string;
    type:string;
    x: number;
    y: number;
}
interface iSpritesheet {
    src: string;
    sprites: iSprite[];
    dimensions: {
        card: { width: number; height: number };
        chip: { width: number; height: number };
        turtle: { width: number; height: number };
        board: { width: number; height: number };
    };
    getByName(name: string): iSprite | undefined;
}
export { Player, iSprite, iSpritesheet };
