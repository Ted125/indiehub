<?php

use Indiemesh\Models\User;
use Indiemesh\Models\UserFollower;
use Illuminate\Database\Seeder;

class UserFollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $minFollowerCount = 0;
        $maxFollowerCount = 15;
        $users = User::all();

        foreach ($users as $user) {
            $followersCount = rand($minFollowerCount, $maxFollowerCount);
            $followers = User::where('users.id', '!=', $user->id)
                                ->inRandomOrder()
                                ->take($followersCount)
                                ->get();

            foreach($followers as $follower){
                $newFollower = new UserFollower();
                $newFollower->followed_id = $user->id;
                $newFollower->follower_id = $follower->id;
                $newFollower->save();
            }
        }
    }
}
