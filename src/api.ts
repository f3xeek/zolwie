import { Player } from "./interfaces";

interface BasicResponse {
  status: "fail" | "success";
  message?: string;
}

interface PlayerGameResponse extends BasicResponse {
  players?: Player[];
  selfId?: number;
}

const gets = {
  joinGame: async function (nickname: string): Promise<BasicResponse> {
    const data = await fetch("ajax.php", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ acc: "joinNewGame", nickname: nickname }),
    });
    return await data.json();
  },
  getPlayerGame: async function (): Promise<PlayerGameResponse> {
    const params = new URLSearchParams({ acc: "getPlayerGame" });
    const data = await fetch("ajax.php?" + params.toString());
    return await data.json();
  },
};

export { gets };
