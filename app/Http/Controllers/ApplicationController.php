<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationController extends Controller
{

    public function index()
    {
        $notifications = Application::where('user_id', '=', Auth::user()->id)->get();
        return Inertia::render('Officer/Notification/List/index', compact('notifications'));
    }


    public function create()
    {
        return Inertia::render('Officer/Notification/Add/index');
    }


    public function store(Request $request)
    {
        Application::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'subject' => $request->subject,
            'description' => $request->description,
            'date' => $request->date,
            'last_date' => $request->last_date,
        ]);
        return redirect()->route('officer.notification.index');
    }


    public function show(Application $application)
    {
        //
    }


    public function edit(Application $application)
    {
        return Inertia::render('Officer/Notification/Edit/index', compact('application'));
    }


    public function update(Request $request, Application $application)
    {
        $application->update($request->all());
        return redirect()->back();
    }


    public function destroy(Application $application)
    {

        $application->delete();
        return redirect()->route('officer.notification.index');
    }
}
