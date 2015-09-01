<?php
    
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    $foldername = 'itemSets/'.$objData->userNameSet.'_'.$objData->championName.'_'.time();
    if (!is_dir($foldername)){
        mkdir($foldername, 0777, true);
    }
    $fp = fopen($foldername.'/'.$objData->jsonFileName, 'w');
    fwrite($fp, $objData->data);
    fclose($fp);

    $fp = fopen($foldername.'/like.txt', 'w');
    fwrite($fp, '0');
    fclose($fp);

?>