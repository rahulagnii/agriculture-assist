<?php

namespace App\Http\Controllers;

use App\Models\People;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::join('people', 'users.id', '=', 'people.user_id')->get();
        return Inertia::render('Admin/Users/List/index', compact('users'));
    }


    public function edit(User $user)
    {
        $people = People::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Users/Edit/index', compact('user', 'people'));
    }


    public function update(User $user, Request $request)
    {
        $people = People::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $people->phone = $request->phone;
        $people->aadhar_id = $request->aadhar_id;
        $user->update();
        $people->update();
        return redirect()->back();
    }


    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.user.index');
    }
}
