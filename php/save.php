<?php

require("world_data_parser.php"); 
	
$world_data_parser = new WorldDataParser();

//Pfad	
$path = "../world_data_v1.csv";

//Die geparste CSV in Array speichern
$worldData = $world_data_parser->parseCSV($path);

//$world_data_parser->saveXML($worldData);
/*
// Get the headers of the file
$headers = fgetcsv($worldData);

// Erstelle ein neues DomDocument
		$doc = new DomDocument();
		$doc->formatOutput = true;

		// Add a root node to the document
		$root = $doc->createElement('rows');
		$root = $doc->appendChild($root);

		// Loop through each row creating a <row> node with the correct data
		while (($row = fgetcsv($worldData)) !== FALSE){
			$container = $doc->createElement('row');
				foreach($headers as $i => $header){
					$child = $doc->createElement($header);
					$child = $container->appendChild($child);
					$value = $doc->createTextNode($row[$i]);
					$value = $child->appendChild($value);
				}

			$root->appendChild($container);
		}

		$strxml = $doc->saveXML();
		$handle = fopen($world_data, "w");
		fwrite($handle, $strxml);
		fclose($handle);
*/

function csv2xml($file, $container = 'data', $rows = 'row')
{
        $r = "<{$container}>\n";
        $row = 0;
        $cols = 0;
        $titles = array();

        $handle = @fopen($file, 'r');
        if (!$handle) return $handle;

        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE)
        {
             if ($row > 0) $r .= "\t<{$rows}>\r";
             if (!$cols) $cols = count($data);
             for ($i = 0; $i < $cols; $i++)
             {
                  if ($row == 0)
                  {
                       $titles[$i] = $data[$i];
                       continue;
                  }

                  $r .= "\t\t<{$titles[$i]}>";
                  $r .= $data[$i];
                  $r .= "</{$titles[$i]}>\r";
             }
             if ($row > 0) $r .= "\t</{$rows}>\r";
             $row++;
        }
        fclose($handle);
        $r .= "</{$container}>";

        //return $r;
		$strxml = $doc->saveXML();
		$handle = fopen($world_data, "w");
		fwrite($handle, $strxml);
		fclose($handle);
}
?>