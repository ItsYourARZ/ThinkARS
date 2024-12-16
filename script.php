<?php
// Get the JSON payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Extract the reCAPTCHA response token
$recaptchaResponse = $data['recaptchaResponse'] ?? '';

// Your secret key
$secretKey = '6LdgKp0qAAAAANytDJ5K3-mk83M3iiuOMDHw26TK';

// Verify the response with Google's API
$url = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($url . '?secret=' . $secretKey . '&response=' . $recaptchaResponse);
$responseData = json_decode($response, true);

// Return the verification result as JSON
header('Content-Type: application/json');
echo json_encode($responseData);
