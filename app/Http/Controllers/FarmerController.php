<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Applied;
use App\Models\Farmer;
use App\Models\Officer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FarmerController extends Controller
{

    public function index()
    {
        $applications = Applied::where('farmer_id', Auth::user()->farmer->id)->get()->count();
        $approved = Applied::where('farmer_id', Auth::user()->farmer->id)->where('approved_status', '=', true)->get()->count();
        $pending = Applied::where('farmer_id', Auth::user()->farmer->id)->where('approved_status', '=', false)->where('rejected_status', '=', false)->get()->count();
        return Inertia::render('Farmer/index', compact('applications', 'pending', 'approved'));
    }


    public function notification()
    {
        $officer = Officer::where('pincode', Auth::user()->farmer->pincode)->firstOrFail();
        $notifications = Application::where('user_id', '=', $officer->user_id)->get();
        return Inertia::render('Farmer/Notification/List/index', compact('notifications'));
    }
    public function notificationView(Application $application)
    {
        $applied = Applied::where('farmer_id', Auth::user()->farmer->id)->where('application_id', $application->id)->get();
        return Inertia::render('Farmer/Notification/View/index', compact('application', 'applied'));
    }
    public function apply(Request $request)
    {
        Applied::create([
            'farmer_id' => Auth::user()->farmer->id,
            'application_id' => $request->application_id,
        ]);
        return redirect()->route('farmer.notification');
    }

    public function status()
    {
        $applied = Applied::where('farmer_id', Auth::user()->farmer->id)->join('applications', 'applieds.application_id', '=', 'applications.id')->get();
        return Inertia::render('Farmer/Status/List/index', compact('applied'));
    }

    public function register()
    {
        return Inertia::render('Home/Register/index');
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
        return Redirect::route('login');
    }
    public function profile()
    {
        $user = Auth::user();
        $farmer = $user->farmer;
        return inertia::render('Farmer/Profile/index', compact('user', 'farmer'));
    }

    public function update(Request $request, Farmer $farmer)
    {
        $farmer->update($request->all());
        return redirect()->back();
    }
}
