<?php
// Get the reCAPTCHA response from the form
$recaptcha_response = $_POST['g-recaptcha-response'];

// Verify the reCAPTCHA response using Google's API
$url = 'https://www.google.com/recaptcha/api/siteverify';
$params = array(
<<<<<<< Updated upstream
    'secret' => '6LfDZHsqAAAAACLAlt_aiaxL3vN0TFGyVkW5VEV-',
=======
    'secret' => 'YOUR_SECRET_KEY',
>>>>>>> Stashed changes
    'response' => $recaptcha_response
);
$url = $url.'?'.http_build_query($params);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);

$resultJson = json_decode($result, true);

if ($resultJson['success']) {
    // reCAPTCHA is valid, process the form data
    // ...
} else {
    // reCAPTCHA is invalid, handle the error
    // ...
}