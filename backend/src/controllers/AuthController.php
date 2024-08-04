<?php
namespace App\Controllers;

use App\Models\User;

class AuthController {
    private $user;

    public function __construct($db) {
        $this->user = new User($db);
    }

// AuthController.php
    public function register($email, $password) {
        $result = $this->user->register($email, $password);
        if ($result) {
            return ['status' => 'success', 'message' => 'Registration successful'];
        } else {
            return ['status' => 'error', 'message' => 'Registration failed'];
        }
    }


    public function login($email, $password) {
        return $this->user->login($email, $password);
    }
}
?>
