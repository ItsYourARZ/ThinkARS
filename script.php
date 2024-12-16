<?php
$secretKey = '6LdgKp0qAAAAANytDJ5K3-mk83M3iiuOMDHw26TK';
$recaptchaResponse = $_POST['g-recaptcha-response'];

// Verify with Google's API
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => $secretKey,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result);

if ($response->success) {
    echo "Verification successful!";
} else {
    echo "Verification failed!";
}
?>
