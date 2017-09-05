<?php

function get_uploaded_files_array($files) {
    $new = array();
    foreach( $files as $key => $all ){
        foreach( $all as $i => $val ){
            $new[$i][$key] = $val;
        }
    }
    return $new;
}

function get_dir_and_files($dir){
	$ret = array('folders' => array(), 'files'=> array());
	$ret['current'] = $dir;
	$cdir = scandir($dir);

	foreach ($cdir as $value) {
		if (in_array($value, ['.', '..'])) {
			continue;
		}
		$complete_path = $dir . DIRECTORY_SEPARATOR . $value;
		if (is_dir($complete_path)) {
			$ret['folders'][] = $complete_path;
		} else  {
			$ret['files'][] = $complete_path;
		}
	}
	return $ret;
}
