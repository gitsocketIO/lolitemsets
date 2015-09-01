<?php
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    $dir="./itemSets/".$objData->folderName;
    if ($handle = opendir($dir)) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $path_parts = pathinfo($entry);
                if($path_parts['extension'] == 'txt'){
                    $oldValue=file_get_contents($dir.'/'.$entry);
                    $newValue=$oldValue+1; 
                    file_put_contents($dir.'/'.$entry, '');
                    file_put_contents($dir.'/'.$entry, $newValue);
                }
            }
        }
        closedir($handle);
    }

    echo $newValue;

?>