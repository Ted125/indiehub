<?php

use Indiemesh\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            '2D',
            'Pixel Art',
            'Adventure',
            'Singleplayer',
            'Roleplaying',
            'Horror',
            '3D',
            'Visual Novel',
            'Action',
            'Platformer',
            'Puzzle',
            'Unity',
            'Retro',
            'Fantasy',
            'Simulation',
            'Story Rich',
            'Short',
            'Psychological Horror',
            'Shooter',
            'Survival',
            'Arcade',
            'Cute',
            'Casual',
            'RPG Maker',
            'Atmospheric',
            'LGBT',
            'First-person',
            'Interactive Fiction',
            'Romance',
            'Sci-fi',
            'Female Protagonist',
            '8-Bit',
            'Funny',
            'Exploration',
            'Anime',
            'Strategy',
            'Multiplayer',
            'Erotic',
            'GameMaker'
        ];

        foreach($tags as $tag){
            Tag::create([
                'name' => $tag
            ]);
        }
    }
}
