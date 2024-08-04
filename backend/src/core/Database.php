<?php
namespace App\Core;

use PDO;
use PDOException;

class Database {

    // Параметры подключения к базе данных
    private $servername = "127.0.0.1";
//    private $username = "it@belgim.by";
//    private $password = "it@belgim.by";
    private $username = "customuser";
    private $password = "GbtYhN211";
    private $dbname = "custom_docs";
    public $conn;

    public function getConnection() {
//        $this->conn = null;
//        try {
//            $this->conn = new PDO("mysql:host=" . $this->servername . ";dbname=" . $this->dbname, $this->username, $this->password);
//            $this->conn->exec("set names utf8");
//        } catch(PDOException $exception) {
//            echo "Connection error: " . $exception->getMessage();
//        }
//        return $this->conn;

// Создание объекта PDO для подключения к базе данных
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host={$this->servername};dbname={$this->dbname};charset=utf8", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Ошибка подключения: " . $e->getMessage());
        }
        return $this->conn;
    }
}
?>