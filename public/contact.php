<?php 

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if(empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Form incomplete";
        exit;
    }

    $to = "info@floriansalvi.ch";
    $subject = "New Website Message";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: no-reply@floriansalvi.ch\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if(mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Message successfuly sent";
    } else {
        http_response_code(500);
        echo "The message could not be sent.";
    }
} else {
    http_response_code(403);
    echo "Action unauthorized";
}
?>