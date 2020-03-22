<?php

function autoload($classname) {
    if (file_exists($file = MODEL . '/' . $classname . '.php')) {
        require $file;
    }
}

spl_autoload_register('autoload');

