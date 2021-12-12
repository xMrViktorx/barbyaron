<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class MailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|string|min:6',
            'body' => 'required|string|min:10',
            'email' => 'required|email'
        ]);

        $niceNames = array(
            'name' => 'név',
            'body' => 'üzenet',
            'path' => 'útvonal'
        );

        $validator->setAttributeNames($niceNames);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()]);
        }

        Mail::to('barbyaronphoto@gmail.com')->send(new ContactMail($data));
        return response()->json(['success' => "Success"], 200);
    }
}