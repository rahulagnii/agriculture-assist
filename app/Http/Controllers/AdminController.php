<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Applied;
use App\Models\Farmer;
use App\Models\Officer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        
        $farmers = Farmer::all()->count();
        $officers = Officer::all()->count();
        $applications = Application::all()->count();
        $applied = Applied::all()->count();
        return Inertia::render('Admin/index', compact('farmers', 'officers', 'applications', 'applied'));
    }
}
