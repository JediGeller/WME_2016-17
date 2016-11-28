<?php
	
class WorldDataParser{
		
	function parseCSV($path){
		$csv = fopen($path, "r");	//CSV öffnen und nur zum lesen
		while(!feof($csv)){		//Dateizeiger in der CSV darf nicht am Ende stehen, um alles auslesen zu können
			$daten[] = fgetcsv($csv);
		}
		fclose($csv);	//schließt die CSV-Datei am Ende
		return $daten;	//Ausgabe der Daten als Array
	}
		
	function saveXML($daten){
		
		$xmlFile = 'world_data.xml';	//XML-Dateiname
		$dom = new domDocument('1.0');
		$dom->encoding = 'UTF-8';
		$dom->formatOutput = true;
		$root = $dom->appendChild($dom->createElement("Countries"));
		
		$xml = simplexml_import_dom($dom); 
		
		//Funktion um Leerzeichen zu löschen
		//TODO
		
		//Arrays in xml
		function array2xml($array, $xml){				
			foreach($array as $key => $value){
				if(is_array($value)){	
					if(is_numeric($key)){
						$key = "Country";	//Country trennt Datensätze/Arrays --> Umbenennung		
					}
					$subnode = $xml->addChild($key);	
					array2xml($value, $subnode);	//Rekursiver Aufbau
				}else{
					$xml->addChild("$key","$value");	//hinzufügen eines childs
				}
			}						
		}			
		array2xml($daten, $xml);	
		return $xml->asXML($xmlFile);
	}

	function printXML(){
		/*
		$xslDom = new DOMDocument(); 
		$xslDom->load($path_xslt); //XSLT STylesheet laden
			
		$xmlDom = new DOMDocument();
		$xmlDom->load($path_xml); //XML Doc laden
			
		$xsltProcessor = new XSLTProcessor();
		$xsltProcessor->importStylesheet($xslDoc); //Processor lädt Stylesheet
		*/	
	}
}
?>