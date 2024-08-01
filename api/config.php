<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Обработка предзапроса CORS
    exit(0);
}
$servername = "localhost";
$username = "customuser";
$password = "GbtYhN211";
$dbname = "custom_docs";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
