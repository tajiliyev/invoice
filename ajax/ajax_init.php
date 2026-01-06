<?php
// ajax/ajax_init.php
// НЕ запускаем сессию здесь, она уже запущена в config.php

// Определяем корневую директорию
define('ROOT_PATH', dirname(__DIR__));

// Подключаем конфиг
$config_file = ROOT_PATH . '/config.php';
if (!file_exists($config_file)) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'message' => 'Config file not found',
        'path' => $config_file
    ]));
}

require_once $config_file;

// Подключаем функции авторизации
$auth_file = ROOT_PATH . '/includes/auth.php';
if (file_exists($auth_file)) {
    require_once $auth_file;
}

// Устанавливаем заголовок JSON
header('Content-Type: application/json; charset=utf-8');

// Проверяем авторизацию
function checkAjaxAuth($requireAdmin = false) {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        die(json_encode(['success' => false, 'message' => 'Не авторизован']));
    }
    
    if ($requireAdmin && !function_exists('isAdmin')) {
        http_response_code(500);
        die(json_encode(['success' => false, 'message' => 'Функция isAdmin не найдена']));
    }
    
    if ($requireAdmin && !isAdmin()) {
        http_response_code(403);
        die(json_encode(['success' => false, 'message' => 'Доступ запрещен. Требуются права администратора']));
    }
    
    return true;
}
?>
