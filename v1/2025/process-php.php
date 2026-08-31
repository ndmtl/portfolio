<?php
// Verify reCAPTCHA
$recaptcha_secret = "6LdWh70qAAAAANP1qFAhRmNiAZXLj3H4q0tuKHmd";
$recaptcha_response = $_POST['g-recaptcha-response'];

$verify_response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
$response_data = json_decode($verify_response);

if (!$response_data->success) {
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed']);
    exit;
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Email headers
$to = "contact@dblocs.com";
$subject = "New Contact Form Submission";
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Email content
$email_content = "Name: " . $name . "\n";
$email_content .= "Email: " . $email . "\n\n";
$email_content .= "Message:\n" . $message . "\n";

// Send email
$mail_sent = mail($to, $subject, $email_content, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error sending message']);
}
?>