<?php 
include "game.php";
class Player
{
    public $id;
    public $name;
    public $turn = 0;
    public $startOfTurn = 0;
    public function __construct($id, $name)
    {
        $this->name = $name;
        $this->id = $id;
    }
}
function joinNewGame($mysqli,$nickname)
{
    global $mysqli;
    if (!isset($_SESSION["gameId"])) {
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
        $players[] = new Player($count, $nickname);
        $turtles = [["color"=>"blue", "position"=>[0,0]],["color"=>"green", "position"=>[0,1]],["color"=>"red", "position"=>[0,2]],["color"=>"purple", "position"=>[0,3]],["color"=>"yellow", "position"=>[0,4]]];
        $data = json_encode(["players" => $players, "turtles"=>$turtles]);
        $state = 0;
        if ($count >= 4){
            $state = 1;
            beginGame($mysqli);
        }
        if ($ingame) {
            $gameId = $row["id"];
            updateGameData($mysqli,$row["id"],$data, $state);
        } else {
            $query = "INSERT INTO gry(data,state) VALUES(?,?) ";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("si", $data, $state);
            $stmt->execute();
            $gameId = $stmt->insert_id;
        }
        $_SESSION["gameId"] = $gameId;
        $_SESSION["playerId"] = $count;
        echo json_encode(['status' => 'success']);
    }else echo json_encode(['status' => "fail", 'message' => "Ta przeglądarka jest już w grze."]);
};
?>