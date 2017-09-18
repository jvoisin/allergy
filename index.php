<?php

require 'vendor/twig/Twig.php';
require "lib/utils.php";


$dir = get_safe_path($_GET['p'], './data');

if (isset($_POST['move_from']) && isset($_POST['move_to'])) {
    $from = get_safe_path($_POST['move_from'], './data');
    $to = get_safe_path($_POST['move_to'], './data');
    rename($from, $to);
} elseif (isset($_POST['del'])) {
    $path = get_safe_path($_GET['del'], './data');
    if ($path != './data' && is_file($path)) {
        unlink($path);
    }
} elseif (isset($_POST['folder_name'])) {
    $name = preg_replace('[^0-9a-z _()]', '_', $_POST['folder_name']);
    mkdir($dir . DIRECTORY_SEPARATOR . $name);
} elseif (isset($_FILES['images'])) {
    foreach (get_uploaded_files_array($_FILES['images']) as $image) {
        handle_upload($image, $dir);
    }
}

$twig = new Twig_Environment(new Twig_Loader_Filesystem('./tpl'), array());
die($twig->render('index.twig', array('dir_and_files' => get_dir_and_files($dir))));