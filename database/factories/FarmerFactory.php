<?php

namespace Database\Factories;

use App\Models\Farmer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FarmerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Farmer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'place' => $this->faker->state,
            'address' => $this->faker->address,
            'district' => $this->faker->state,
            'phone' => $this->faker->phoneNumber,
            'pincode' => $this->faker->buildingNumber,
            'gender' => "male",
            'agriculture_type' => "domestic",
            'dob' => $this->faker->date(),
            'aadhar_id' => $this->faker->unique()->creditCardNumber(),
            'user_id' => function () {
                $user = User::factory()->create();
                $user->assignRole('farmer');
                return $user->id;
            },
        ];
    }
}
