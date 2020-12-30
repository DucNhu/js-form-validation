<?php 
    $serverName = "localhost";
    $userName = "root";
    $passWord = "";
    $dbName = "ebookshop";

    $conn = mysqli_connect($serverName, $userName, $passWord, $dbName);

    if($conn) {
        if(isset($_POST["Email"]) && isset($_POST["User"]) && isset($_POST["Pass"])) {
            $email = $_POST["Email"];
            $user = $_POST["User"];
            $pass = $_POST["Pass"];

            $insert = "INSERT INTO customers (`User`, `Pass`, `email`) VALUES ('".$user."','".$pass."','".$email."')";

            if(mysqli_query($conn, $insert)) {
                echo "<b>OK</b>";
            }
            else {
                 echo "<b>False</b>";
            }
        }
    }
    else {
        die("Connect Error" + mysqli_connect_error);
    }
?>