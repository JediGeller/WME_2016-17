<?php

include ("world_data_parser.php");

$world_data_parser = new WorldDataParser();

$path = "../world_data_v1.csv";

$world_data_array = $world_data_parser->parseCSV($path);

?>