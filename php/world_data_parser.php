<?php
	
class WorldDataParser{
		
	function parseCSV($path){
		$csv = fopen($path, "r");	//CSV öffnen und nur zum lesen
		while(!feof($csv)){		//Dateizeiger in der CSV darf nicht am Ende stehen, um alles auslesen zu können
			$text[] = fgetcsv($csv);
		}
		fclose($csv);
		return $text;	//Ausgabe
	}
		
	function saveXML($parsedCSV){
		$success = false;
		$success = true;
		/*
		// Erstelle ein neues DomDocument
		$doc = new DomDocument();
		$doc->formatOutput = true;

		// Add a root node to the document
		$root = $doc->createElement('rows');
		$root = $doc->appendChild($root);

		// Loop through each row creating a <row> node with the correct data
		while (($row = fgetcsv($inputFile)) !== FALSE){
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
		if($success){
			echo "Daten erfolgreich als XML gespeichert.";
		}
		else{
			echo "Es ist ein Fehler aufgetreten.";
		}	
	}
		
	function printXML(){
		echo "Es wird gedruckt...";
	}
}
?>