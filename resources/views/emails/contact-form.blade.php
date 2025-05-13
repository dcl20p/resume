<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #dee2e6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="content">
            <p><strong>Name:</strong> {!! $name !!}</p>
            <p><strong>Email:</strong> {!! $email !!}</p>
            <p><strong>Subject:</strong> {!! $subject !!}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap;">{!! $message !!}</div>
        </div>

        <div class="footer">
            <p>This email was sent from your website's contact form.</p>
        </div>
    </div>
</body>
</html> 