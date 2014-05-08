<?php
$status = TRUE;
$res = array();
foreach ($_POST as $key => $value) {
    $res['items'][$key] = array();	
    $index = strpos($value,"bad"); 	
    if($index !== FALSE){
        $status = FALSE;
        $res['items'][$key]['status'] = "FAILED";
        $res['items'][$key]['message'] = "$key is FAILED";
    }
    else {
        $res['items'][$key]['status'] = "OK";
        $res['items'][$key]['message'] = "$key is OK";
    }    
}
$res['status'] = $status === FALSE?"FAILED":"OK";
print_r(json_encode($res));
?>
