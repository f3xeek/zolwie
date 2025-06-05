<?php
include "hidden.php";
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");
header('Content-Type: application/json');
session_start();

class Player
{
    public $id;
    public $name;
    public $turn = 0;
    public function __construct($id, $name)
    {
        $this->name = $name;
        $this->id = $id;
    }
}

if (isset($_POST['acc']) && $_POST['acc'] == 'joinNewGame') {
    if(!isset($_SESSION["gameId"])){
        $query = 'Select * from gry where state=0';
        $stmt = $mysqli->prepare($query);

        $stmt->execute() or die("" . $mysqli->error);
        $res = $stmt->get_result();
        $ingame = false;
        $row = $res->fetch_assoc();
        if ($row) {
            $ingame = true;
            $players = json_decode($row["data"])->players;
        }
        if (!$ingame) {
            $players = [];
            $state = 0;
        }

        $count = sizeof($players);
        $players[] = new Player($count, $_POST['nickname']);
        $data = json_encode(["players" => $players]);
        $state = 0;
        if ($count >= 4)
            $state = 1;
        if ($ingame) {
            $query = "UPDATE gry SET state = ?, data = ? WHERE id = ?";
            $stmt = $mysqli->prepare($query);
            $gameId =  $row["id"];
            $stmt->bind_param("iss", $state, $data,$gameId);
            $stmt->execute();
        } else {
            $query = "INSERT INTO gry(data,state) VALUES(?,?) ";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("si", $data, $state);
            $stmt->execute();
            $gameId = $stmt -> insert_id;
        }
        $_SESSION["gameId"] = $gameId;
        $_SESSION["playerId"] = $count;
        echo json_encode(['status'=>'success']);
    }else echo json_encode(['status'=>"fail",'message'=>"Ta przeglądarka jest już w grze."]);

}else if((isset($_GET['acc']) && $_GET['acc'] == 'getPlayerGame')) {
    if(!isset($_SESSION["gameId"])){
        echo json_encode(['status'=>"fail",'message'=>"Ta przeglądarka nie jest obecnie w żadnej grze."]);
    }else{
        $query = 'Select * from gry where id = ?';
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("s", $_SESSION["gameId"]);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        echo json_encode( ['status'=>'success', 'players'=>json_decode($row["data"])->players,'selfId'=>$_SESSION["playerId"]]);
    }
}else {
    echo json_encode("NIE DZIALA");
}
// $kraj = rawurldecode($_POST["kraje"]);
// $stmt->bind_param("issii", $kraj, $nominal, $kategoria, $stopy, $rok);
?>