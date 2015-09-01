<?php
    $dir="./itemSets";
    if ($handle = opendir($dir)) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                if ($handle2 = opendir($dir.'/'.$entry)) {
                    while (false !== ($entry2 = readdir($handle2))) {
                        if ($entry2 != "." && $entry2 != "..") {
                            $path_parts = pathinfo($entry2);
                            if($path_parts['extension'] == 'json'){
                                $data[$entry]['json']=json_decode(file_get_contents($dir.'/'.$entry.'/'.$entry2));
                            }
                            if($path_parts['extension'] == 'txt'){
                                $data[$entry]['like']=file_get_contents($dir.'/'.$entry.'/'.$entry2);
                            }
                        }
                    }
                    closedir($handle2);
                }
            }
        }
        closedir($handle);
    }

    echo json_encode($data);

?>