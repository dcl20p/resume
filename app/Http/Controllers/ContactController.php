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
            'phone' => 'required|string|min:10|max:15|regex:/^[0-9+\-\s()]*$/',
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
        $urlVerify = config('services.recaptcha.url_verify');
        $verify = file_get_contents("{$urlVerify}?secret={$secret}&response={$recaptcha}");
        $captchaSuccess = json_decode($verify);

        if (!$captchaSuccess->success) {
            return response()->json([
                'success' => false,
                'message' => __('contact.message.recaptcha_error')
            ], 422);
        }

        try {
            Mail::to(config('mail.admin_email'))->send(new ContactFormMail(
                $request->name,
                $request->email,
                $request->phone,
                $request->subject,
                $request->message
            ));

            return response()->json([
                'success' => true,
                'message' => __('contact.message.success')
            ]);
        } catch (\Exception $e) {
            Log::error('Contact form error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => __('contact.message.error')
            ], 500);
        }
    }
} 