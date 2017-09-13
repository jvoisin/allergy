<?php
require 'vendor/twig/Twig.php';
require "lib/utils.php";

$loader = new Twig_Loader_Filesystem('./tpl');
$twig = new Twig_Environment($loader, array());

$dir = get_safe_path($_GET['p'], './data');

if (isset($_POST['move_from']) && isset($_POST['move_to'])) {
    $from = get_safe_path($_POST['move_from'], './data');
    $to = get_safe_path($_POST['move_to'], './data');
}

if (isset($_POST['del'])) {
    $path = get_safe_path($_GET['p'], './data');
    if ($path != './data') {
        if (is_file($path)) {
            unlink($_POST['del']);
        }
    }
}

if (isset($_POST['folder_name'])) {
    $name = preg_replace('[^0-9a-z _()]', '_', $_POST['folder_name']);
    mkdir($dir . DIRECTORY_SEPARATOR . $name);
}

if (isset($_FILES['images'])) {
    foreach (get_uploaded_files_array($_FILES['images']) as $image) {
        if (move_uploaded_file($image['tmp_name'], $dir . '/' . $image['name'])) {
        } else {
            var_dump($image); echo "\n";
        }
    }
}

echo $twig->render('index.twig', array(
    'dir_and_files' => get_dir_and_files($dir)));