<?php


require("world_data_parser.php"); 

$world_data_parser = new WorldDataParser();
	
//Pfad
$path = "../world_data_v1.csv";
	
//Die geparste CSV in Array speichern
$worldData = $world_data_parser->parseCSV($path);
	
$world_data_parser->printXML();

?>