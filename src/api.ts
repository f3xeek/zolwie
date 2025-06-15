import { Player,iTurtle } from "./interfaces";

interface BasicResponse {
    status: "fail" | "success";
    message?: string;
}

interface getPlayersResponse extends BasicResponse {
    players?: Player[];
    selfId?: number;
}
interface gamestateResponse extends BasicResponse {
    turtles?: [iTurtle, iTurtle, iTurtle, iTurtle, iTurtle];
    selfColor?: string;
}
interface PlayerReadyResponse extends BasicResponse {
    ready?: boolean;
}
const hostname = "phpfiles/"
const gets = {
    joinGame: async function (nickname: string): Promise<BasicResponse> {
        const data = await fetch(hostname + "ajax.php", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                acc: "joinNewGame",
                nickname: nickname,
            }),
        });
        return await data.json();
    },
    getPlayerLobby: async function (): Promise<getPlayersResponse> {
        const params = new URLSearchParams({ acc: "getPlayers" });
        const data = await fetch(hostname + "ajax.php?" + params.toString());
        return await data.json();
    },
    clearSession: async function():Promise<void>{
        await fetch(hostname + "ajax.php", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                acc: "clearSession",
            }),
        });
    },
    postPlayerReady: async function (): Promise<PlayerReadyResponse> {
        const data = await fetch(hostname + "ajax.php", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ acc: "playerReadySwap" }),
        });
        return await data.json();
    },
    getGamestate: async function (): Promise<gamestateResponse> {
        const params = new URLSearchParams({ acc: "getGamestate" });
        const data = await fetch(hostname + "ajax.php?" + params.toString());
        return await data.json();
    },
};

export { gets };