<?php

use Illuminate\Database\Seeder;
use indiemesh\Models\Country;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            'US' => 'USA',
            'EN' => 'England',
            'CA' => 'Canada'
        ];

        foreach ($countries as $code => $country) {
            Country::create([
                'id' => $code,
                'name' => $country,
            ]);
        }
    }
}
