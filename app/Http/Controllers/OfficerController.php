<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Applied;
use App\Models\Farmer;
use App\Models\Officer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OfficerController extends Controller
{
    public function index()
    {

        $farmers = Farmer::all()->count();
        $applications = Application::all()->count();
        $approved = Applied::where('approved_status', '=', true)->get()->count();
        $pending = Applied::where('approved_status', '=', false)->where('rejected_status', '=', false)->get()->count();
        return Inertia::render('Officer/index', compact('farmers', 'applications', 'pending', 'approved'));
    }


    public function farmerList()
    {
        $farmers = Farmer::where('pincode', '=', Auth::user()->officer->pincode)->join('users', 'farmers.user_id', '=', 'users.id')->get();
        return Inertia::render('Officer/Farmer/List/index', compact('farmers'));
    }


    public function pendingList()
    {
        $pending = Farmer::where('pincode', '=', Auth::user()->officer->pincode)
            ->join('users', 'farmers.user_id', '=', 'users.id')->join('applieds', 'farmers.id', '=', 'applieds.farmer_id')
            ->join('applications', 'applieds.application_id', '=', 'applications.id')
            ->where('approved_status', false)->where('rejected_status', false)->get();
        return Inertia::render('Officer/Pending/List/index', compact('pending'));
    }


    public function pendingView(Request $request, Farmer $farmer, Application $application)
    {
        $user = $farmer->user()->get();
        $user = $user->all();
        return Inertia::render('Officer/Pending/View/index', compact('application', 'user', 'farmer'));
    }


    public function approve(Request $request, Farmer $farmer)
    {
        $applied = Applied::Where('farmer_id', $farmer->id)->where('application_id', $request->application_id)->firstOrFail();
        $applied->approved_status = $request->status;
        $applied->update();
        return redirect()->route('officer.pending.list');
    }
    public function reject(Request $request, Farmer $farmer)
    {
        $applied = Applied::Where('farmer_id', $farmer->id)->where('application_id', $request->application_id)->firstOrFail();
        $applied->rejected_status = $request->status;
        $applied->update();
        return redirect()->route('officer.pending.list');
    }

    public function approvedView()
    {
        $approved = Farmer::where('pincode', '=', Auth::user()->officer->pincode)
            ->join('users', 'farmers.user_id', '=', 'users.id')->join('applieds', 'farmers.id', '=', 'applieds.farmer_id')
            ->join('applications', 'applieds.application_id', '=', 'applications.id')
            ->where('approved_status', true)->where('rejected_status', false)->get();
        return Inertia::render('Officer/Approved/List/index', compact('approved'));
    }


    public function profile()
    {
        $user = Auth::user();
        $officer = $user->officer;
        return inertia::render('Officer/Profile/index', compact('user', 'officer'));
    }

    public function update(Request $request, Officer $officer)
    {
        $officer->update($request->all());
        return redirect()->back();
    }
}
