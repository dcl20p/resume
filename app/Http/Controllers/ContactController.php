<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|min:2|max:255',
            'message' => 'required|string|min:10|max:1000',
            'recaptcha_token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Verify reCAPTCHA
        $recaptcha = $request->input('recaptcha_token');
        $secret = config('services.recaptcha.secret_key');
        $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$recaptcha}");
        $captcha_success = json_decode($verify);

        if (!$captcha_success->success) {
            return response()->json([
                'success' => false,
                'message' => 'reCAPTCHA verification failed'
            ], 422);
        }

        try {
            // Debug: Log the message value
            Log::info('Message value:', [
                'type' => gettype($request->message),
                'value' => $request->message
            ]);

            // Ensure message is a string
            $message = (string) $request->message;

            Mail::to(config('mail.admin_email'))->send(new ContactFormMail(
                $request->name,
                $request->email,
                $request->subject,
                $message
            ));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Contact form error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message. Please try again later.'
            ], 500);
        }
    }
} 