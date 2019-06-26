<?php

namespace Indiemesh\Services;

use Indiemesh\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class UserService implements Service
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register($firstName, $lastName, $username, $email, $birthdate, $password)
    {
        $user = $this->userRepository->createUser(
                                            $firstName,
                                            $lastName,
                                            $username,
                                            $email,
                                            $birthdate,
                                            Hash::make($password)
                                        );

        if($user){
            $token = $this->getToken($email, $password); // generate user token

            $user->auth_token = $token; // update user token
            $user->save();
        }

        return $user;
    }

    public function login($email, $password)
    {
        $user = $this->userRepository->findUserViaEmail($email);

        if($user && Hash::check($password, $user->password)){
            $token = $this->getToken($email, $password);
            $user->auth_token = $token;
            $user->save();
        }else{
            return null;
        }

        return $user;
    }

    public function findUser($id)
    {
        return $this->userRepository->findUser($id);
    }

    public function followUser($userId)
    {
        $follower = JWTAuth::user();
        $userToFollow = $this->findUser($userId);

        if(!$follower || !$userToFollow || $follower->id == $userToFollow->id){
            return null;
        }

        return $this->userRepository->followUser($userToFollow, $follower);
    }

    public function unfollowUser($userId)
    {
        $follower = JWTAuth::user();
        $userToUnfollow = $this->findUser($userId);

        if(!$follower || !$userToUnfollow || $follower->id == $userToUnfollow->id){
            return null;
        }

        return $this->userRepository->unfollowUser($userToUnfollow, $follower);
    }

    private function getToken($email, $password)
    {
        $token = JWTAuth::attempt([
            'email' => $email,
            'password' => $password
        ]);

        return $token;
    }
}
