<?php

function get_safe_path(string $path=NULL, string $prefix): string {
    if (isset($path) && strpos($path, '..') === FALSE && strpos($path, $prefix) === 0) {
        return $path;
    }
    return $prefix;
}

function get_uploaded_files_array(array $files): array {
    $new = array();
    foreach( $files as $key => $all ){
        foreach( $all as $i => $val ){
            $new[$i][$key] = $val;
        }
    }
    return $new;
}

function get_dir_and_files(string $dir): array {
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

function handle_upload(array $image, string $dir): bool {
    switch( $image['error'] ) {
        case UPLOAD_ERR_OK:
            $path = get_safe_path($dir, './data') . '/' . preg_replace('[^0-9a-z ._]', '_', $image['name']);
            if (false === move_uploaded_file($image['tmp_name'], $path)) {
                var_dump($image);
                echo "\n";
            }
            return true;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            die('file too large');
        case UPLOAD_ERR_PARTIAL:
            die(' - file upload was not completed.');
        case UPLOAD_ERR_NO_FILE:
            die(' - zero-length file uploaded.');
        default:
            die(' - internal error #'.$image['error']);
    }
}