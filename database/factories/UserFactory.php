<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use Indiemesh\Models\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'username' => $faker->unique()->word,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'birthdate' => $faker->dateTimeBetween($startDate = '-50 years', $endDate = '-20 years', $timezone = null),
        'profile_photo_url' => null,
        'cover_photo_url' => null,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => Str::random(10),
        'auth_token' => null
    ];
});
