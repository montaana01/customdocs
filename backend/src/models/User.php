<?php
namespace App\Models;

use App\Core\Database;

class User {
    private $conn;
    private $table_name = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($email, $password) {
        // Проверяем, существует ли уже пользователь с таким email
        $query = "SELECT COUNT(*) FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        error_log("Count: " . print_r($count, true));

        if ($count > 0) {
            error_log("Response: " . print_r('here', true));

            // Если email уже существует, возвращаем сообщение об ошибке
            return ['error' => 'Email already exists'];
            exit();
        }
        error_log("Response: " . print_r('here', true));

        // Хешируем пароль и пытаемся сохранить нового пользователя
        $password_hash = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO " . $this->table_name . " (email, password) VALUES (:email, :password)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            // Если регистрация успешна, возвращаем сообщение об успехе
            return ['success' => 'User registered successfully'];
        } else {
            // В случае ошибки возвращаем сообщение об ошибке
            return ['error' => 'Failed to register user'];
        }
    }





    public function login($email, $password) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Отладочные сообщения
        error_log("User fetched: " . print_r($user, true));
        error_log("inserted email: " . print_r($email, true));
        error_log("inserted password: " . print_r($password, true));
        error_log(password_verify($password, $user['password']));

        if ($user && password_verify($password, $user['password'])) {
            // Генерация токена (например, JWT)
            $token = bin2hex(random_bytes(16)); // Простая генерация токена, замените на JWT в реальном проекте
            // В этом примере просто возвращаем токен, в реальном проекте используйте JWT или другой метод аутентификации
            return ['token' => $token, 'user' => $user];
        } else {
            return ['error' => 'Invalid email or password'];
        }
    }


}
?>
