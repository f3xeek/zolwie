<?php
    include "hidden.php";
    include "joinGame.php";
    include "lobby.php";

    $mysqli = new mysqli($host, $user, $passwd, $dbname);
    $mysqli->query("set names utf8");
    header('Content-Type: application/json');
    session_start();
    if (isset($_POST['acc'])){
        if (  $_POST['acc'] == 'joinNewGame') {
            joinNewGame($mysqli,$_POST['nickname']);
        }else if ( $_POST['acc'] == 'playerReadySwap') {
            playerReady($mysqli);
        }else if ($_POST['acc'] == "clearSession"){
            session_unset();
        } else{
            echo json_encode("taki acc nie istnieje");
        }
    }else if(isset($_GET["acc"])){
        if (  $_GET['acc'] == 'getPlayers') {
            getPlayers($mysqli);
        }else if($_GET["acc"]=='getGamestate'){
            gameState($mysqli);
        }else{
            echo json_encode("taki acc nie istnieje");
        }
    }else{
        echo json_encode("acc nie zostało ustawione");
    }
    $mysqli->close();
?>