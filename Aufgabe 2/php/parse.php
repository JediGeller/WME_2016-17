<?php

require("world_data_parser.php");

$world_data_parser = new WorldDataParser();

//Pfad
$path = "../world_data_v1.csv";

//Die geparste CSV in Array speichern
$world_data_array = $world_data_parser->parseCSV($path);

//Arrayausgabe
echo '<pre>';
print_r($world_data_array);
echo '</pre>';

?>