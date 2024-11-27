<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $secretKey = '6LfDZHsqAAAAACLAlt_aiaxL3vN0TFGyVkW5VEV-';
    $recaptchaResponse = $_POST['recaptcha_response'];
    $userIP = $_SERVER['REMOTE_ADDR'];

    // Verify the response
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $userIP,
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response);

    if ($result->success && $result->score >= 0.5) {
        echo "Verification successful. Score: {$result->score}";
    } else {
        echo "Verification failed. Score: {$result->score}";
    }
}
?>
