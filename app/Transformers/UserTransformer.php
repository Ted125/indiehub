<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id' => $user->id,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'emailVerifiedAt' => $user->email_verified_at,
            'birthdate' => $user->birthdate,
            'profilePhotoUrl' => $user->profile_photo_url,
            'coverPhotoUrl' => $user->cover_photo_url,
            'authToken' => $user->auth_token,
            'createdAt' => $user->created_at,
            'updatedAt' => $user->updated_at
        ];
    }
}
