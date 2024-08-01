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

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT password FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo json_encode(["message" => "Login successful"]);
        } else {
            echo json_encode(["error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["error" => "No user found with that email"]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
