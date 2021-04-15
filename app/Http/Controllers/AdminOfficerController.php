<?php

namespace App\Http\Controllers;

use App\Models\Officer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOfficerController extends Controller
{

    public function index()
    {
        $officers = User::join('officers', 'users.id', '=', 'officers.user_id')->get();
        return Inertia::render('Admin/Officer/List/index', compact('officers'));
    }


    public function create()
    {
        return Inertia::render('Admin/Officer/Add/index');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('officer');
        Officer::create([
            'user_id' => $user->id,
            'place' => $request->place,
            'phone' => $request->phone,
            'address' => $request->address,
            'pincode' => $request->pincode,
            'district' => $request->district,
        ]);
        return redirect()->route('admin.officer.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        $officer = Officer::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Officer/Edit/index', compact('user', 'officer'));
    }


    public function update(User $user, Request $request)
    {
        $officer = Officer::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $officer->place = $request->place;
        $officer->phone = $request->phone;
        $officer->address = $request->address;
        $officer->pincode = $request->pincode;
        $officer->district = $request->district;
        $user->update();
        $officer->update();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.officer.index');
    }
}
