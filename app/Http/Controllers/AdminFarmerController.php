<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminFarmerController extends Controller
{
    public function index()
    {
        $farmers = User::join('farmers', 'users.id', '=', 'farmers.user_id')->get();
        return Inertia::render('Admin/Farmer/List/index', compact('farmers'));
    }


    public function create()
    {
        return Inertia::render('Admin/Farmer/Add/index');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('farmer');
        Farmer::create([
            'user_id' => $user->id,
            'place' => $request->place,
            'phone' => $request->phone,
            'address' => $request->address,
            'pincode' => $request->pincode,
            'gender' => $request->gender,
            'district' => $request->district,
            'document' => $request->document,
            'aadhar_id' => $request->aadhar_id,
            'dob' => $request->dob,
            'agriculture_type' => $request->agriculture_type,
        ]);
        return redirect()->route('admin.farmer.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        $farmer = Farmer::where('user_id', '=', $user->id)->firstOrFail();
        return Inertia::render('Admin/Farmer/Edit/index', compact('user', 'farmer'));
    }


    public function update(User $user, Request $request)
    {
        $farmer = Farmer::where('user_id', '=', $user->id)->firstOrFail();
        $user->name = $request->name;
        $user->email = $request->email;
        $farmer->place = $request->place;
        $farmer->phone = $request->phone;
        $farmer->address = $request->address;
        $farmer->pincode = $request->pincode;
        $farmer->gender = $request->gender;
        $farmer->district = $request->district;
        $farmer->document = $request->document;
        $farmer->aadhar_id = $request->aadhar_id;
        $farmer->dob = $request->dob;
        $farmer->agriculture_type = $request->agriculture_type;
        $user->update();
        $farmer->update();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.farmer.index');
    }
}
