import { Player } from "./interfaces";

interface BasicResponse {
    status: "fail" | "success";
    message?: string;
}

interface PlayerGameResponse extends BasicResponse {
    players?: Player[];
    selfId?: number;
}
interface PlayerReadyResponse extends BasicResponse {
    ready?: boolean;
}
const gets = {
    joinGame: async function (nickname: string): Promise<BasicResponse> {
        const data = await fetch("ajax.php", {
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
    getPlayerLobby: async function (): Promise<PlayerGameResponse> {
        const params = new URLSearchParams({ acc: "getPlayerGame" });
        const data = await fetch("ajax.php?" + params.toString());
        return await data.json();
    },
    postPlayerReady: async function (): Promise<PlayerReadyResponse> {
        const data = await fetch("ajax.php", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ acc: "playerReadySwap" }),
        });
        return await data.json();
    },
};

export { gets };
