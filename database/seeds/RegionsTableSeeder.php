<?php

use Illuminate\Database\Seeder;
use Indiemesh\Models\Country;
use Indiemesh\Models\Region;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usaRegions = [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Washington D.C.',
            'Delaware',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming',
        ];

        $usa = Country::find('US');

        if($usa != null){
            foreach($usaRegions as $region){
                Region::create([
                    'name' => $region,
                    'country_id' => $usa->id,
                ]);
            }
        }

        // England regions

        $englandRegions = [
            'East Midlands',
            'East of England',
            'Greater London',
            'North East',
            'North West',
            'South East',
            'South West',
            'West Midlands',
            'Yorkshire and Humber',
        ];

        $england = Country::find('EN');

        if($england != null){
            foreach($englandRegions as $region){
                Region::create([
                    'name' => $region,
                    'country_id' => $england->id,
                ]);
            }
        }

        // Canada regions

        $canadaRegions = [
            'Alberta',
            'British Columbia',
            'Newfoundland and Labrador',
            'Manitoba',
            'New Brunswick',
            'Northwest Territories',
            'Nova Scotia',
            'Nunavut',
            'Ontario',
            'Prince Edward Island',
            'Quebec',
            'Saskatchewan',
            'Yukon',
        ];

        $canada = Country::find('CA');

        if($canada != null){
            foreach($canadaRegions as $region){
                Region::create([
                    'name' => $region,
                    'country_id' => $canada->id,
                ]);
            }
        }
    }
}
