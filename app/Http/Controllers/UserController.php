<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

  public function login(Request $request)
  {
    if (Auth::attempt($request->only('name', 'password'), $request->remember)) {
      return response()->json(['message' => true]);
    } else {
      return response()->json(['message' => false]);
    }
  }

  public function logout()
  {
    Auth::logout();
    return response()->json(['message' => true], 201);
  }

  public function update(Request $request)
  {
    $user = User::find($request['user']['id']);
    $user->name = $request['user']['name'];
    $user->email = $request['user']['email'];
    if ($request['newPassword'] && $request['oldPassword']) {
      if (Hash::check($request['oldPassword'], $user->password)) {
        $user->password = Hash::make($request['newPassword']);
      } else {
        return response()->json(['error' => 'error']);
      }
    }
    $user->save();
    return response()->json(['success' => "Success"], 200);
  }
}