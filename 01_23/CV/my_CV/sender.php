<?php

if($_POST["comment"]) {
    mail(
        "xianzhi.ye@imt-atlantique.net", 
        "Mail from my web",
        $_POST["comment"], 
        "From: ".$_POST["email"]." By ".$_POST["name"]);
}

?>