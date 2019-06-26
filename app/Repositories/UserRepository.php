<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\User;

class UserRepository implements Repository
{
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
}
