<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use App\Controllers\AuthController;
use App\Controllers\DocumentController;

require __DIR__ . '/../vendor/autoload.php';

return function (App $app) {
    $container = $app->getContainer();

    $authController = new AuthController($container->get('db'));
    $documentController = new DocumentController($container->get('db'));

    // Middleware для добавления CORS заголовков
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        $response = $response->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    });

    $app->options('/{routes:.+}', function (Request $request, Response $response) {
        return $response;
    });

    // Главная страница
    $app->get('/', function ($request, $response, $args) {
        $response->getBody()->write("Welcome to CustomDocs API");
        return $response;
    });

    // Наши маршруты API
    $app->post('/api/register', function (Request $request, Response $response) use ($authController) {
        $data = $request->getParsedBody();
        $result = $authController->register($data['email'], $data['password']);

        // Отправляем результат как JSON
        $response->getBody()->write(json_encode($result));
        error_log("Response: " . print_r($result, true));
        return $response->withHeader('Content-Type', 'application/json');
    });



    $app->post('/api/login', function (Request $request, Response $response) use ($authController) {
        $data = $request->getParsedBody();
        $result = $authController->login($data['email'], $data['password']);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/api/documents', function (Request $request, Response $response) use ($documentController) {
        $documents = $documentController->getAllDocuments();
        $response->getBody()->write(json_encode($documents));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/api/documents/{id}', function (Request $request, Response $response, $args) use ($documentController) {
        $document = $documentController->getDocumentById($args['id']);
        $response->getBody()->write(json_encode($document));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/api/documents', function (Request $request, Response $response) use ($documentController) {
        $data = $request->getParsedBody();
        $result = $documentController->createDocument($data['title'], $data['content']);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->put('/api/documents/{id}', function (Request $request, Response $response, $args) use ($documentController) {
        $data = $request->getParsedBody();
        $result = $documentController->updateDocument($args['id'], $data['title'], $data['content']);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->delete('/api/documents/{id}', function (Request $request, Response $response, $args) use ($documentController) {
        $result = $documentController->deleteDocument($args['id']);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/api/documents/{id}/download/pdf', function (Request $request, Response $response, $args) use ($documentController) {
        $pdf = $documentController->downloadDocumentAsPDF($args['id']);
        if ($pdf) {
            $response = $response->withHeader('Content-Type', 'application/pdf')
                ->withHeader('Content-Disposition', 'attachment; filename="document.pdf"');
            $response->getBody()->write($pdf);
            return $response;
        } else {
            $response->getBody()->write(json_encode(['error' => 'Document not found']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    });

    $app->get('/api/documents/{id}/download/xml', function (Request $request, Response $response, $args) use ($documentController) {
        $xml = $documentController->downloadDocumentAsXML($args['id']);
        if ($xml) {
            $response = $response->withHeader('Content-Type', 'application/xml')
                ->withHeader('Content-Disposition', 'attachment; filename="document.xml"');
            $response->getBody()->write($xml);
            return $response;
        } else {
            $response->getBody()->write(json_encode(['error' => 'Document not found']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
    });

    // Middleware для обработки неверных URL
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        if ($response->getStatusCode() == 404) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write("The requested API endpoint does not exist.");
            return $response->withStatus(404);
        }
        return $response;
    });
};
