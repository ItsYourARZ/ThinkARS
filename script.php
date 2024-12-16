<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Replace with your Google reCAPTCHA Secret Key
    $secretKey = '6LdgKp0qAAAAANytDJ5K3-mk83M3iiuOMDHw26TK';

    // Get the reCAPTCHA response from the POST data
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify if the response token exists
    if (empty($recaptchaResponse)) {
        die('Please complete the reCAPTCHA.');
    }

    // Send a POST request to Google's API for verification
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR'] // Optional, but recommended
    ];

    // Use cURL to send the request
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    // Decode the JSON response
    $responseData = json_decode($response);

    // Check if the reCAPTCHA was successfully validated
    if ($responseData->success) {
        echo "Verification successful! You are not a robot.";
    } else {
        echo "Verification failed. Please try again.";
    }
} else {
    echo "Invalid request method.";
}
?>
