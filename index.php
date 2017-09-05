<?php
require 'vendor/twig/Twig.php';
require "lib/utils.php";

$loader = new Twig_Loader_Filesystem('./tpl');
$twig = new Twig_Environment($loader, array());

$dir = './data';
if (isset($_GET['p']) && strpos($_GET['p'], '..') === FALSE && strpos($_GET['p'], $dir) === 0) {
    $dir = $_GET['p'];
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