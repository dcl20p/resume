<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ __('contact.title') }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4f46e5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
        }
        .content {
            padding: 20px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #4f46e5;
            margin-bottom: 5px;
            display: block;
        }
        .value {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e9ecef;
        }
        .message-content {
            white-space: pre-wrap;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #e9ecef;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ __('contact.success') }}</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">{{ __('contact.fields.name') }}:</span>
                <div class="value">{{ $name }}</div>
            </div>

            <div class="field">
                <span class="label">{{ __('contact.fields.email') }}:</span>
                <div class="value">{{ $email }}</div>
            </div>

            <div class="field">
                <span class="label">{{ __('contact.fields.subject') }}:</span>
                <div class="value">{{ $subject }}</div>
            </div>

            <div class="field">
                <span class="label">{{ __('contact.fields.message') }}:</span>
                <div class="message-content">{{ $messageContent }}</div>
            </div>
        </div>

        <div class="footer">
            {{ __('contact.footer') }}
        </div>
    </div>
</body>
</html> 