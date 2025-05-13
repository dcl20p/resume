<?php

return [
    'title' => 'Contact Form Submission',
    'success' => 'New Message Received',
    'fields' => [
        'name' => 'Name',
        'email' => 'Email',
        'subject' => 'Subject',
        'message' => 'Message'
    ],
    'footer' => 'This email was sent from your website\'s contact form.',
    'message' => [
        'success' => 'Your message has been sent successfully!',
        'error' => 'There was an error sending your message. Please try again.',
        'recaptcha' => 'Please complete the reCAPTCHA verification.',
        'network' => 'Network error occurred. Please check your connection and try again.',
        'recaptcha_error' => 'reCAPTCHA verification failed'
    ]
]; 