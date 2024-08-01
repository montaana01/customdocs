<?php
// Например, в начале каждого PHP файла API, такого как register.php, login.php и check-auth.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Обработка предзапроса CORS
    exit(0);
}
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM documents WHERE id = $id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $document = $result->fetch_assoc();
            echo json_encode($document);
        } else {
            echo json_encode(["error" => "Document not found"]);
        }
    } else {
        echo json_encode(["error" => "Document ID missing"]);
    }
    $search = $_GET['search'];
    $sql = "SELECT * FROM documents WHERE title LIKE '%$search%'";
    $result = $conn->query($sql);

    $documents = [];
    while($row = $result->fetch_assoc()) {
        $documents[] = $row;
    }
    echo json_encode($documents);
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $content = $data['content'];

    $sql = "INSERT INTO documents (title, content) VALUES ('$title', '$content')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}

$conn->close();