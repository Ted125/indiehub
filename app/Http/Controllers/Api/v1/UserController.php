<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\UserService;
use Indiemesh\Transformers\UserTransformer;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(Request $request)
    {
        $user = $this->userService->login($request->email, $request->password);

        if($user){
            return fractal()
                    ->item($user, new UserTransformer(), 'user')
                    ->respond();
        }else{
            return response()->json(null);
        }
    }

    public function register(Request $request)
    {
        $user = $this->userService->register(
                                        $request->firstName,
                                        $request->lastName,
                                        $request->username,
                                        $request->email,
                                        $request->birthdate,
                                        $request->password
                                    );

        if($user){
            return fractal()
                    ->item($user, new UserTransformer(), 'user')
                    ->respond();
        }else{
            return response()->json(null);
        }
    }

    public function find(Request $request)
    {
        $user = $this->userService->findUser($request->id);

        if($user){
            return fractal()
                    ->item($user, new UserTransformer(), 'user')
                    ->respond();
        }else{
            return response()->json(null);
        }
    }

    public function follow(Request $request)
    {
        $user = $this->userService->followUser($request->id);

        if($user){
            return fractal()
                    ->item($user, new UserTransformer(), 'user')
                    ->includeFollowers()
                    ->includeFollowing()
                    ->respond();
        }else{
            return response()->json(null);
        }
    }

    public function unfollow(Request $request)
    {
        $user = $this->userService->unfollowUser($request->id);

        if($user){
            return fractal()
                    ->item($user, new UserTransformer(), 'user')
                    ->includeFollowers()
                    ->includeFollowing()
                    ->respond();
        }else{
            return response()->json(null);
        }
    }
}
