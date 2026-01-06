<?php
// includes/auth.php

// Проверка авторизации
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Проверка роли
function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] == 'admin';
}

// Получение информации о пользователе
function getCurrentUser() {
    global $pdo;
    
    if (!isLoggedIn()) return null;
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch();
}

// Выход из системы
function logout() {
    session_destroy();
    redirect('login.php');
}

// Инициализация администратора при первом запуске
function initializeAdmin() {
    global $pdo;
    
    // Проверяем, есть ли пользователи
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    if ($stmt->fetchColumn() == 0) {
        // Создаем администратора по умолчанию
        $username = 'admin';
        $password = password_hash('admin123', PASSWORD_DEFAULT);
        $role = 'admin';
        
        $stmt = $pdo->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        $stmt->execute([$username, $password, $role]);
    }
}

?>
