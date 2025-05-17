<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $phone;
    public $subject;
    public $messageContent;
    public $translations;

    /**
     * Create a new message instance.
     */
    public function __construct($name, $email, $phone, $subject, $message)
    {
        Log::info('ContactFormMail constructor:', [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => $subject,
            'message' => $message,
            'message_type' => gettype($message)
        ]);

        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->subject = $subject;
        $this->messageContent = (string) $message;
        
        // Get translations for the current locale
        $currentLocale = App::getLocale();
        $this->translations = [
            'title' => trans('contact.title', [], $currentLocale),
            'success' => trans('contact.success', [], $currentLocale),
            'fields' => [
                'name' => trans('contact.fields.name', [], $currentLocale),
                'email' => trans('contact.fields.email', [], $currentLocale),
                'phone' => trans('contact.fields.phone', [], $currentLocale),
                'subject' => trans('contact.fields.subject', [], $currentLocale),
                'message' => trans('contact.fields.message', [], $currentLocale)
            ],
            'footer' => trans('contact.footer', [], $currentLocale)
        ];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        Log::info('ContactFormMail content:', [
            'message' => $this->messageContent,
            'message_type' => gettype($this->messageContent)
        ]);

        return new Content(
            view: 'emails.contact-form',
            with: [
                'name' => $this->name,
                'email' => $this->email,
                'phone' => $this->phone,
                'subject' => $this->subject,
                'messageContent' => $this->messageContent,
                'translations' => $this->translations
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
} 