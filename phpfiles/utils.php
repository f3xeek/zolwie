<?php 
function getGameData($mysqli, $id)
{
    $query = 'Select * from gry where id = ?';
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    return (array)json_decode($row["data"]);
}
function updateGameData($mysqli, $id,$data,$state=1)
{
    $query = "UPDATE gry SET state = ?, data = ? WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("isi", $state, $data, $id);
    $stmt->execute();
}
?>