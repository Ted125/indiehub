<?php

use Indiemesh\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userCount = 100;

        factory(User::class, $userCount)->create();
    }
}
