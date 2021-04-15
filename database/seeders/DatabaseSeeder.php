<?php

namespace Database\Seeders;

use App\Models\Farmer;
use App\Models\Officer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'officer']);
        $hospital = Role::create(['name' => 'farmer']);

        $superAdmin = User::factory()->create([
            'name' => 'Rahul R',
            'email' => 'rahul@app.com',
            'password' => \bcrypt('password'),
        ]);
        $superAdmin->assignRole($admin);

        Farmer::factory()->create([
            'place' => 'Kayamkulam',
            'address' => 'Sreeragam Kandalloor South',
            'district' => 'Alappuzha',
            'phone' => '8547211245',
            'pincode' => '690535',
            'gender' => 'male',
            'agriculture_type' => 'Domestic',
            'dob' => '13/07/2001',
            'aadhar_id' => '321423453433565445',
            'user_id' => function () {
                $user = User::factory()->create(
                    [
                        'name' => 'Rahul R',
                        'email' => 'farmer@app.com',
                        'password' => \bcrypt('password'),
                    ]
                );
                $user->assignRole('farmer');
                return $user->id;
            },
        ]);
        Officer::factory()->create([
            'place' => 'Kayamkulam',
            'address' => 'Sreeragam Kandalloor South',
            'district' => 'Alappuzha',
            'phone' => '8547211245',
            'pincode' => '690535',
            'user_id' => function () {
                $user = User::factory()->create(
                    [
                        'name' => 'Akhil R',
                        'email' => 'officer@app.com',
                        'password' => \bcrypt('password'),
                    ]
                );
                $user->assignRole('officer');
                return $user->id;
            },
        ]);
    }
}
