<?php 
function getUsersFromGame($mysqli, $id)
{
    $query = 'Select * from gry where id = ?';
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    return json_decode($row["data"])->players;
}
?>