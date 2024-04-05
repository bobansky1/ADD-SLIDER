<?php
$target_dir = "img/";
$uploadedImages = [];

// Проверяем, был ли отправлен файл
if(isset($_FILES['image'])) {
    // Проверяем наличие ошибок при загрузке файла
    if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $tempFilePath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $targetFilePath = $target_dir . $fileName;

        // Проверяем размер файла
        if ($_FILES['image']['size'] <= 5000000) { // Предположим, что максимальный размер файла - 5 МБ
            // Сохраняем файл на сервере
            if (move_uploaded_file($tempFilePath, $targetFilePath)) {
                $uploadedImages[] = [
                    'src' => $targetFilePath,
                    'alt' => $fileName
                ];
            } else {
                $uploadedImages[] = [
                    'error' => 'Sorry, there was an error uploading your file.'
                ];
            }
        } else {
            $uploadedImages[] = [
                'error' => 'Sorry, your file is too large.'
            ];
        }
    } else {
        $uploadedImages[] = [
            'error' => 'Sorry, there was an error uploading your file.'
        ];
    }
} else {
    $uploadedImages[] = [
        'error' => 'No file uploaded.'
    ];
}

// Возвращаем данные в формате JSON
header('Content-Type: application/json');
echo json_encode($uploadedImages);
?>

