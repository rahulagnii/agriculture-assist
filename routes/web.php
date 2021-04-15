<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminFarmerController;
use App\Http\Controllers\AdminOfficerController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\FarmerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfficerController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Auth::routes([
    'register' => false
]);

Route::group(['middleware' => ['role:admin']], function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');

    Route::get('/admin/officer', [AdminOfficerController::class, 'index'])->name('admin.officer.index');
    Route::get('/admin/officer/create', [AdminOfficerController::class, 'create'])->name('admin.officer.create');
    Route::post('/admin/officer', [AdminOfficerController::class, 'store'])->name('admin.officer.store');
    Route::get('/admin/officer/{user}/edit', [AdminOfficerController::class, 'edit'])->name('admin.officer.edit');
    Route::put('/admin/officer/{user}', [AdminOfficerController::class, 'update'])->name('admin.officer.update');
    Route::delete('/admin/officer/{user}', [AdminOfficerController::class, 'destroy'])->name('admin.officer.destroy');

    Route::get('/admin/farmer', [AdminFarmerController::class, 'index'])->name('admin.farmer.index');
    Route::get('/admin/farmer/create', [AdminFarmerController::class, 'create'])->name('admin.farmer.create');
    Route::post('/admin/farmer', [AdminFarmerController::class, 'store'])->name('admin.farmer.store');
    Route::get('/admin/farmer/{user}/edit', [AdminFarmerController::class, 'edit'])->name('admin.farmer.edit');
    Route::put('/admin/farmer/{user}', [AdminFarmerController::class, 'update'])->name('admin.farmer.update');
    Route::delete('/admin/farmer/{user}', [AdminFarmerController::class, 'destroy'])->name('admin.farmer.destroy');
});



Route::group(['middleware' => ['role:officer']], function () {
    Route::get('/officer', [OfficerController::class, 'index'])->name('officer.index');
    Route::get('/officer/profile', [OfficerController::class, 'profile'])->name('officer.profile');
    Route::put('/officer/profile/{officer}', [OfficerController::class, 'update'])->name('officer.update');

    Route::get('/officer/notification', [ApplicationController::class, 'index'])->name('officer.notification.index');
    Route::post('/officer/notification', [ApplicationController::class, 'store'])->name('officer.notification.store');
    Route::get('/officer/notification/create', [ApplicationController::class, 'create'])->name('officer.notification.create');
    Route::get('/officer/notification/{application}/edit', [ApplicationController::class, 'edit'])->name('officer.notification.edit');
    Route::put('/officer/notification/{application}', [ApplicationController::class, 'update'])->name('officer.notification.update');
    Route::delete('/officer/notification/{application}', [ApplicationController::class, 'destroy'])->name('officer.notification.destroy');

    Route::get('/officer/farmer/list', [OfficerController::class, 'farmerList'])->name('officer.farmer.list');
    Route::get('/officer/pending-application/{farmer}/{application}/view', [OfficerController::class, 'pendingView'])->name('officer.pending.view');
    Route::get('/officer/pending-application/list', [OfficerController::class, 'pendingList'])->name('officer.pending.list');
    Route::put('/officer/reject-application/{farmer}', [OfficerController::class, 'reject'])->name('officer.reject');
    Route::put('/officer/approve-application/{farmer}', [OfficerController::class, 'approve'])->name('officer.approve');
    Route::get('/officer/approved-application', [OfficerController::class, 'approvedView'])->name('officer.approved.view');
});

Route::get('/user/register', [FarmerController::class, 'register'])->name('user.register');
Route::post('/user/register', [FarmerController::class, 'store'])->name('user.store');
Route::group(['middleware' => ['role:farmer']], function () {
    Route::get('/farmer', [FarmerController::class, 'index'])->name('farmer.index');
    Route::get('/farmer/profile', [FarmerController::class, 'profile'])->name('farmer.profile');
    Route::put('/farmer/profile/{farmer}', [FarmerController::class, 'update'])->name('farmer.update');
    Route::get('/farmer/notification', [FarmerController::class, 'notification'])->name('farmer.notification');
    Route::get('/farmer/notification/{application}/view', [FarmerController::class, 'notificationView'])->name('farmer.notification.view');
    Route::get('/farmer/application/status', [FarmerController::class, 'status'])->name('farmer.application.status');
    Route::post('/farmer/application/apply', [FarmerController::class, 'apply'])->name('farmer.notification.apply');
});
