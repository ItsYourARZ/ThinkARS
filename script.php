<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Secret key from Google reCAPTCHA
    $secretKey = '6LdgKp0qAAAAANytDJ5K3-mk83M3iiuOMDHw26TK';

    // Get the reCAPTCHA response token
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Check if the response token is empty
    if (empty($recaptchaResponse)) {
        echo "Please complete the reCAPTCHA.";
        exit;
    }

    // Verify the reCAPTCHA response with Google's API
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR'] // Optional but recommended
    ];

    // Use cURL to send the POST request to Google's API
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
        echo "reCAPTCHA verified successfully. You are not a robot!";
        // You can now process the form data (e.g., save to database, send an email, etc.)
    } else {
        echo "reCAPTCHA verification failed. Please try again.";
    }
} else {
    echo "Invalid request method.";
}
