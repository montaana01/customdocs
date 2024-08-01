<?php
// check-auth.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();

if (isset($_SESSION['user'])) {
    echo json_encode(['user' => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'User not authenticated']);
}