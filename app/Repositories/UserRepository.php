<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\User;
use Indiemesh\Models\UserFollower;

class UserRepository implements Repository
{
    public function findUser($id)
    {
        return User::find($id);
    }

    public function findUserViaEmail($email)
    {
        return User::where('email', '=', $email)
                    ->get()
                    ->first();
    }

    public function createUser($firstName, $lastName, $username, $email, $birthdate, $hashedPassword)
    {
        try{
            $newUser = new User();

            $newUser->first_name = $firstName;
            $newUser->last_name = $lastName;
            $newUser->email = $email;
            $newUser->username = $username;
            $newUser->birthdate = $birthdate;
            $newUser->password = $hashedPassword;

            $newUser->save();

            return $newUser;
        }catch(\Exception $e){
            return null;
        }
    }

    public function followUser(User $user, User $follower)
    {
        $existingFollower = UserFollower::where([
            ['followed_id', '=', $user->id],
            ['follower_id', '=', $follower->id]
        ])->first();

        if(!$existingFollower){
            $newFollower = new UserFollower();
            $newFollower->followed_id = $user->id;
            $newFollower->follower_id = $follower->id;

            if($newFollower->save()){
                return $user;
            }
        }

        return null;
    }

    public function unfollowUser(User $user, User $follower)
    {
        $existingFollower = UserFollower::where([
            ['followed_id', '=', $user->id],
            ['follower_id', '=', $follower->id]
        ])->first();

        if($existingFollower && $existingFollower->delete()){
            return $user;
        }

        return null;
    }
}
