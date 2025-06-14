<?php 
    include "utils.php";
    function getPlayerGame($mysqli){
        if (!isset($_SESSION["gameId"]) || !$_SESSION["gameId"]) {
            echo json_encode(['status' => "fail", 'message' => "Ta przeglądarka nie jest obecnie w żadnej grze."]);
        } else {
            $players = getUsersFromGame($mysqli, $_SESSION["gameId"]);
            echo json_encode(['status' => 'success', 'players' => $players, 'selfId' => $_SESSION["playerId"]]);
        }
    }
    function playerReady($mysqli){
        $players = getUsersFromGame($mysqli, $_SESSION["gameId"]);
        $filtered = array_filter($players, function ($player) {
            return $player->id == $_SESSION['playerId'];
        });

        $key = array_keys($filtered)[0];

        $query = "UPDATE gry SET data = ? where id = ?";
        $stmt = $mysqli->prepare($query);


        if ($filtered[$key]->turn == 0)
            $players[$key]->turn = 1;
        else
            $players[$key]->turn = 0;
        $data = json_encode(["players" => $players]);
        $stmt->bind_param("si", $data, $_SESSION["gameId"]);
        $stmt->execute();

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
            $query = "UPDATE gry SET state = 1 WHERE id = ?";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("i", $_SESSION["gameId"]);
            $stmt->execute();
        }
    }
?>