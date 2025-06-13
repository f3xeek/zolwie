<?php
    include "hidden.php";
    include "joinGame.php";
    include "lobby.php";

    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli->query("set names utf8");
    header('Content-Type: application/json');
    session_start();

    if (isset($_POST['acc']) && $_POST['acc'] == 'joinNewGame') {
        joinNewGame($mysqli,$_POST['nickname']);
    } else if ((isset($_GET['acc']) && $_GET['acc'] == 'getPlayerGame')) {
        getPlayerGame($mysqli);
    } else if (isset($_POST['acc']) && $_POST['acc'] == 'playerReadySwap') {
        playerReady($mysqli);
    } else {
        echo json_encode("NIE DZIALA");
    }
    $mysqli->close();
?>