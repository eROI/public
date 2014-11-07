<?php

//getMakes()
//getModels()
include('json.php');
//print_r($_GET);

if(isset($_POST['method']) && function_exists($_POST['method']))  {
	$m = $_POST['method'];
	$json = new JSON;
	$data = $json->decode($_POST['data']);
	
	/*$m = "getModels";
	$data = 4;*/
	
	$response = $m($data);
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: ' . date('r'));
	header('Content-type: application/json');
	echo $response;
}

function getMakeList($obj)
{
	$q = "SELECT ID, MakeName FROM  Makelist ORDER BY MakeName";
	return getThis($q);
}

function getModels($obj)
{
	$q = "SELECT ID, Model FROM	Models WHERE fkMake = " . $obj;
	return getThis($q);
}

function getModelNameFromID($id)
{
	$q = "SELECT Model FROM Models WHERE id = $id";
	return getThis($q);
}

function getMakeNameFromID($id)
{
	$q = "SELECT MakeName FROM Makelist WHERE ID = $id";
	return getThis($q);
}

function updateModel($data) 
{
	$id = $data->id;
	$model = $data->model;
	
	$q = "UPDATE Models SET Model = '$model' WHERE ID = $id";
	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	
	if(!$c) {
		echo mysql_error();
		echo $q;
		return 0;
	}
	
	mysql_select_db("runni24_dubbs",  $c);
	mysql_query($q);
	
	if(mysql_affected_rows() > 0) return true;
	
	else return false;
}


function deleteModel($id)
{
	$q = "DELETE FROM Models WHERE ID = $id";
	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	
	if(!$c) {
		echo mysql_error();
		echo $q;
		return 0;
	}
	
	mysql_select_db("runni24_dubbs",  $c);
	mysql_query($q);
	
	if(mysql_affected_rows() > 0) return true;
	
	else return false;
}

function addModel($data) 
{
	$id = $data->fkMake;
	$model = $data->Model;
	
	$q = "INSERT INTO Models (ID, fkMake, Model) VALUES (NULL, $id, '$model')";
	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	
	mysql_select_db("runni24_dubbs",  $c);
	mysql_query($q);
	
	if(mysql_affected_rows() > 0) return true;
	
	else return false;
	
}

function getThis($q)  
{

	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	if(!$c) {
		echo mysql_error();
		echo $q;
		return 0;
	}
	
	$db = mysql_select_db("runni24_dubbs",  $c);
	$result = mysql_query($q);
	
	if(!$result) {
		/*$retThis['success'] = false;
		$retThis['response'] = mysql_error();
		return json_encode($retThis);
		*/
		echo mysql_error();
		return 0;
	}
	
	//print_r($result);
	if(isset($_POST['method']))
		$retThis = queryToJson($result, 'response');
	else
		$retThis = $result;
		
	mysql_close($c);
	return $retThis;

}
/*
 * class queryToJson to convert a mysql Query to JSON
 * Author : Loknath Bharti
 * email : lbharti "the letter 'at'" gmail dot com
 */

/*
 * Function: queryToJson : It converts the query result into a JSON string
 * with $header as the top header with column header as the header for other data values
 * Arguments : $result : mysql result returned by mysql_query(), $header : top header of the JSON object
 * Return : $data : the JSON string
 */
function queryToJson($r, $header)
{
	$resultArray = array();
	$count = 0;
	$json = new JSON;
	
	while($i = mysql_fetch_row($r))
	{
		for($k = 0; $k < count($i); $k++)
		{
			$resultArray[$count][mysql_field_name($r, $k)] = $i[$k];	
		}
		$count++;
	}
	$data = $json->encode($resultArray);
	$data = "{\"$header\":".$data."}";
	return $data;
}

function saveData($d) 
{
	$json = new JSON;
	$data = $json->encode($d);
	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	if(!$c) {
		echo mysql_error();
		return 0;
	}
	
	mysql_select_db("runni24_dubbs");
	
	$result = mysql_query("SELECT data FROM locdata WHERE fkSite = " . $d->fkSite);
	//print_r($result);
	if(mysql_num_rows($result) < 1) $q = "INSERT INTO locdata SET fkSite = " . $d->fkSite . ", data = '$data'";
	else $q = "UPDATE locdata SET data = '$data' WHERE fkSite = " . $d->fkSite;
	
	$result = mysql_query($q);
	$rows = mysql_affected_rows();
	
	if($rows > 0) return true;
	else return false;
}

function getSiteData($id) 
{
	$c = mysql_connect("localhost","runni24_generat","dsbna404");
	//$c = mysql_connect("lpsql01.lunariffic.com","runni24_generat","dsbna404");	
	if(!$c) {
		echo mysql_error();
		return 0;
	}
	
	mysql_select_db("runni24_dubbs");
	
	$result = mysql_query("SELECT data FROM locdata WHERE fkSite = $id");

	if(mysql_num_rows($result)) {
		$row = mysql_fetch_assoc($result);
		$retThis = $row['data'];
	}
	else $retThis = false;
	
	//mysql_close();
	
	return $retThis;
}
?>