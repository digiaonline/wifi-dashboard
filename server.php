<?php

require_once(__DIR__ . '/src/server/vendor/autoload.php');

try {
    $dotenv = new Dotenv\Dotenv(__DIR__);
    $dotenv->load();

    $application = new \Digia\WifiDashboard\Server\Application();
    $application->run();
} catch (\Throwable $e) {
    var_dump($e);
    exit;
}
