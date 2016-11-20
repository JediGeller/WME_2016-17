<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
	<meta name="author" content="Stefanie Macak & André Gleißner">
	<meta name="description" content="Aufgabe 1 der WME Übung an der TU Dresden im Wintersemester 2016/17. Eine Seite um Daten der Welt anzuzeigen.">
	<meta name="keywords" content="WME, World Data Overview, TUD, Dresden">
	<title>World Data Overview</title>
	<link rel="stylesheet" href="reset.css" type="text/css" media="screen"/>
	<link rel="stylesheet" href="style.css" type="text/css" media="screen"/>
	<link rel="stylesheet" href="font-awesome.css" type="text/css" media="screen"/>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"> 
	<link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">
	<script>
	<!-- Javascript-Bereich -->
	/*
	var db = new Array();
	//Datenbank
	db[0] = new Array("009", "DTL", "lel", "666", "67", "45", "34");
	db[1] = new Array("010", "Werdsd", "sflel", "65666", "6677", "4655", "34212");
	db[2] = new Array("011", "Prtz", "eerl", "644566", "67", "457", "7034");
	
	//dynamisches Füllen
	function tabledynamic () {
            for (i = 1; i < db.length; i++) {
				document.getElementsByTagName("tr")[i].innerHTML = document.getElementsByTagName("tr")[i].innerHTML;
				for (j = 1; j < db.length; j++) {  
				document.getElementsByTagName("td")[i][j].innerHTML = document.getElementsByTagName("td")[i][j].innerHTML + db[i][j];
				}
			}
        } */
	</script>
</head>

<body onload="tabledynamic ()">
<div class="body">
<div class="sticky">
<header>
<div id="logo">
<a href="index.html"><img src="images/logo_bunt.png" alt="Logo" width="148" height="70" align="left" 
			onmouseover="src='images/logo_grau.png'" onmouseout="src='images/logo_bunt.png'" /></a>
</div>
	<nav id="nav">
		<ul>
			<li><a href="javascript:void(0)"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A1 - Table</a><li>
			<li><a href="php/parse.php"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A2 - Parse</a><li>
			<li><a href="php/save.php"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A2 - Save</a><li>
			<li><a href="php/print.php"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A2 - Print</a><li>
			<li><a href="javascript:void(0)"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A3 - REST</a><li>
			<li><a href="javascript:void(0)"><i class="fa fa-list-ul" aria-hidden="true"></i>
				A4 - Vis</a><li>
		</ul>
	</nav>
</header>
</div>

<div class="website">
<h1 id="h1">World Data Overview ...</h1>

<!-- Textbox -->
<div id="textbox">
<p id="text">Mavericks reality distortion gradients attenuation. Thought through and through notifications transparency game center multitasking aluminum 
advanced desktop operating system genius bar. This changes everything designed by Apple in California passbook. Control center photos all-new design SDK 
technology clock. Simplicity is actually quite complicated. Functional layers 9:41am partly cloudy minimalism. Dock airdrop slide to answer music. Video 
multitouch iTunes compass. Harmonious finder grid system retina animation compressor experience keynote.

Redesign services API notes system preferences. Features siri flat buttons airplane mode calculator. Missed call cover flow compare models. Wi-Fi apple 
care volume reminder controls. My stations folders mac power ultimate upgrade. Shop online quicktime trackpad server aperture rumors education safari one 
to one. Remote desktop motion business. Backlit keyboard chess phone airport extreme support iPad. Accessories magsafe terminal final cut pro. Featured TV 
shows downloads digital color meter. Glossy tech specs bluetooth manuals. OpenGL products FaceTime free shipping recycling mission control applications. from: <a href="javascript:void(0)">jony_ipsum</a></p>
</div>

<div class="filter">
<p><font color=#919995>Show/Hide:</font> <a href="javascript:void(0)">birth rate</a> | <a href="javascript:void(0)">cellphones</a> | 
	<a href="javascript:void(0)">children/woman</a> | <a href="javascript:void(0)">electric usage</a> | <a href="javascript:void(0)">internet usage</a></p>
</div>
<!-- Tabelle -->
<?php

require("world_data_parser.php"); 
	
$world_data_parser = new WorldDataParser();

//Pfad	
$path = "../world_data_v1.csv";

//Die geparste CSV in Array speichern
$world_data_array = $world_data_parser->parseCSV($path);

$result = $world_data_parser->saveXML($world_data_array);
	

$world_data_parser->printXML("world_data.xml", "world_data.xsl");

?>

<div class="filter">
<p><font color=#919995>Show/Hide:</font> <a href="javascript:void(0)">birth rate</a> | <a href="javascript:void(0)">cellphones</a> | 
	<a href="javascript:void(0)">children/woman</a> | <a href="javascript:void(0)">electric usage</a> | <a href="javascript:void(0)">internet usage</a></p>
</div>


<div id="platz">
</div>

<div id="footer">
<div id="left">Copyright <i class="fa fa-copyright" aria-hidden="true"></i> 2016 world_data <br>
			   First course exercise <strong>HTML, CSS and JS</strong> of the lecture Web and Multimedia Engineering.</div>
<div id="center"></div>
<div id="right">This solution has been created by:<br>
				Stefanie Macak (s5208632) and André Gleißner (s1840921) - Team 19</div>
<div id="clear"></div>
</div>
</div>
</div>
</body>
</html>