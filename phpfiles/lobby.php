<?php 
    include "utils.php";
    function getPlayers($mysqli){
        if (!isset($_SESSION["gameId"]) || !$_SESSION["gameId"]) {
            echo json_encode(['status' => "fail", 'message' => "Ta przeglądarka nie jest obecnie w żadnej grze."]);
        } else {
            $players = getGameData($mysqli, $_SESSION["gameId"])["players"];
            echo json_encode(['status' => 'success', 'players' => $players, 'selfId' => $_SESSION["playerId"]]);
        }
    }
    function playerReady($mysqli){
        $data = getGameData($mysqli, $_SESSION["gameId"]);
        $players = $data["players"];
        $filtered = array_filter($players, function ($player) {
            return $player->id == $_SESSION['playerId'];
        });

        $key = array_keys($filtered)[0];

        if ($filtered[$key]->turn == 0)
            $players[$key]->turn = 1;
        else
            $players[$key]->turn = 0;
        $data = json_encode(array_merge($data,["players" => $players]));
        

        if ($players[$key]->turn == 0)
            echo json_encode(['status' => 'success', 'ready' => false]);
        else if ($players[$key]->turn == 1)
            echo json_encode(['status' => 'success', 'ready' => true]);
        else
            echo json_encode(['status' => 'fail', 'message' => "readying up failed"]);

        $ready = true;
        foreach ($players as $player) {
            if ($player->turn == 0)
                $ready = false;
        }

        if ($ready && sizeof($players) > 1) {
            updateGameData($mysqli,$_SESSION["gameId"],$data,1);
        }else{
            updateGameData($mysqli,$_SESSION["gameId"],$data,0);
        }
    }
?>