<?php
$status = TRUE;
$res = array();
foreach ($_GET as $key => $value) {
    $res['items'][$key] = array();	
    $index = strpos($value,"bad"); 	
    if($index !== FALSE){
        $status = FALSE;
        $res['items'][$key]['status'] = "FAILED";
        $res['items'][$key]['message'] = "$key is wrong";
    }
    else {
        $res['items'][$key]['status'] = "OK";
        $res['items'][$key]['message'] = "$key is ok";
    }    
}
$res['status'] = $status === FALSE?"FAILED":"OK";
print_r(json_encode($res));
?>
