<?php

require 'vendor/twig/Twig.php';
require "lib/utils.php";


$dir = get_safe_path($_GET['p'], './data');

if (isset($_POST['move_from']) && isset($_POST['move_to'])) {
    $from = get_safe_path($_POST['move_from'], './data');
    $to = get_safe_path($_POST['move_to'], './data');
    rename($from, $to);
} elseif (isset($_POST['del'])) {
    $path = get_safe_path($_GET['p'], './data');
    if ($path != './data') {
        if (is_file($path)) {
            unlink($_POST['del']);
        }
    }
} elseif (isset($_POST['folder_name'])) {
    $name = preg_replace('[^0-9a-z _()]', '_', $_POST['folder_name']);
    mkdir($dir . DIRECTORY_SEPARATOR . $name);
} elseif (isset($_FILES['images'])) {
    foreach (get_uploaded_files_array($_FILES['images']) as $image) {
        switch( $image['error'] ) {
            case UPLOAD_ERR_OK:
                $path = get_safe_path($dir . '/' . $image['name'], './data');
                if ($path === $dir . '/' . $image['name']) {
                    if (move_uploaded_file($image['tmp_name'], $dir . '/' . $image['name'])) {
                    } else {
                        var_dump($image);
                        echo "\n";
                    }
                }
                break;
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
}

$twig = new Twig_Environment(new Twig_Loader_Filesystem('./tpl'), array());
die($twig->render('index.twig', array('dir_and_files' => get_dir_and_files($dir))));