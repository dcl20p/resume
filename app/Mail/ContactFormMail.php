<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $subject;
    public $messageContent;

    /**
     * Create a new message instance.
     */
    public function __construct($name, $email, $subject, $message)
    {
        Log::info('ContactFormMail constructor:', [
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message,
            'message_type' => gettype($message)
        ]);

        $this->name = $name;
        $this->email = $email;
        $this->subject = $subject;
        $this->messageContent = (string) $message;
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
                'subject' => $this->subject,
                'message' => $this->messageContent
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