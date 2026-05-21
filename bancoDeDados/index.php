<?php
    $servername = "localhost:3306";
    $username = "root";
    $password = "lua56sol2003";
    $dbname = "novo_usuarionetflix";

    $conn = new mysqli($servername, $username, $password, $dbname);

    //Parte da imagem a ser programada
    /*$image = '';
    if(isset($_GET['perfil'])){

        $image = $_GET['perfil'];

    }*/

    //Caixa do nome
    if(isset($_GET['name'])){$name = $_GET['name'];}

    //Caixa do checkbox
    if(
        
        isset($_GET['check'])){$check = $_GET['check'];
        
    }else{$check = 'off';}

    //Inserindo dados
    $add = "INSERT INTO usuarios (nome, pagina_infantil) VALUES ('$name', '$check')";

    //Testando se foi enviado corretamente
    if ($conn->query($add) === TRUE) {

        header("Location: ../usuario.php");
        exit(); 

    }