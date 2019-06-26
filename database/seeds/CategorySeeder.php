<?php

use Indiemesh\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Games',
            'Assets'
        ];

        foreach($categories as $category){
            Category::create([
                'name' => $category
            ]);
        }
    }
}
