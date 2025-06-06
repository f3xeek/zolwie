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
function getUsersFromGame($mysqli, $id)
{
    $query = 'Select * from gry where id = ?';
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    return json_decode($row["data"])->players;
}
if (isset($_POST['acc']) && $_POST['acc'] == 'joinNewGame') {
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
        $players[] = new Player($count, $_POST['nickname']);
        $data = json_encode(["players" => $players]);
        $state = 0;
        if ($count >= 4)
            $state = 1;
        if ($ingame) {
            $query = "UPDATE gry SET state = ?, data = ? WHERE id = ?";
            $stmt = $mysqli->prepare($query);
            $gameId = $row["id"];
            $stmt->bind_param("iss", $state, $data, $gameId);
            $stmt->execute();
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
    } else
        echo json_encode(['status' => "fail", 'message' => "Ta przeglądarka jest już w grze."]);

} else if ((isset($_GET['acc']) && $_GET['acc'] == 'getPlayerGame')) {
    if (!isset($_SESSION["gameId"])) {
        echo json_encode(['status' => "fail", 'message' => "Ta przeglądarka nie jest obecnie w żadnej grze."]);
    } else {
        $players = getUsersFromGame($mysqli, $_SESSION["gameId"]);
        echo json_encode(['status' => 'success', 'players' => $players, 'selfId' => $_SESSION["playerId"]]);
    }
} else if (isset($_POST['acc']) && $_POST['acc'] == 'playerReadySwap') {
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


} else {
    echo json_encode("NIE DZIALA");
}
// $kraj = rawurldecode($_POST["kraje"]);
// $stmt->bind_param("issii", $kraj, $nominal, $kategoria, $stopy, $rok);
?>