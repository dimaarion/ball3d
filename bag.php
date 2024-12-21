<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
echo file_get_contents("./assets/bag.glb");