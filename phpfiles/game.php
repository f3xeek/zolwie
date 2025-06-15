<?php 
    function gameState($mysqli){
        $query = "SELECT * FROM gry  where id = " . $_SESSION["gameId"];
        $result = $mysqli -> query($query);
        $row = $result -> fetch_assoc();
        $data = $row["data"];
        echo $data;
    }
    function beginGame($mysqli){
        $data = getGameData($mysqli, $_POST["gameId"]);
        var_dump($data);
        $players = $data["players"];
        $players[0] -> turn = 2;
        $players[0] -> startOfTurn = time();
        updateGameData($mysqli, $_SESSION["gameId"],array_merge($data,$players));
    }
    
?>