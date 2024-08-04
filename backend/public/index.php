<?php
require __DIR__ . '/../vendor/autoload.php';

use DI\Container;
use Slim\Factory\AppFactory;
use App\Core\Database;
use App\Controllers\AuthController;
use App\Controllers\DocumentController;

// Создание контейнера
$container = new Container();

// Настройка контейнера
$container->set('db', function () {
    return (new Database())->getConnection();
});

// Создание приложения с контейнером
AppFactory::setContainer($container);
$app = AppFactory::create();

// Подключение маршрутов
(require __DIR__ . '/../src/routes.php')($app);

// Запуск приложения
$app->run();
