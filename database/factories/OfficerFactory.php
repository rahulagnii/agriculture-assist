<?php

namespace Database\Factories;

use App\Models\Officer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfficerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Officer::class;

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
            'user_id' => function () {
                $user = User::factory()->create();
                $user->assignRole('officer');
                return $user->id;
            },
        ];
    }
}
