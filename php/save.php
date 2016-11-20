<?php

require("world_data_parser.php"); 
	
$world_data_parser = new WorldDataParser();

//Pfad	
$path = "../world_data_v1.csv";

//Die geparste CSV in Array speichern
$world_data_array = $world_data_parser->parseCSV($path);

$result = $world_data_parser->saveXML($world_data_array);
	
//Ausgabe des Ergebnisses
if($result == true){
	echo "XML Savestatus: erfolgreich (1)";
} 
else{
	echo "XML Savestatus: fehlerhaft!";
}
		
?>