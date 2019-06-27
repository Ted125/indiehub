<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Entity;
use Indiemesh\Models\EntityLike;
use Indiemesh\Models\User;

class LikeRepository implements Repository
{
    public function findLike($id)
    {
        return EntityLike::find($id);
    }

    public function addLike(Entity $entity, User $user)
    {
        $existingLike = EntityLike::where([
            ['entity_id', '=', $entity->id],
            ['user_id', '=', $user->id]
        ])->first();

        if(!$existingLike){
            $like = new EntityLike();
            $like->entity_id = $entity->id;
            $like->user_id = $user->id;

            if($like->save()){
                $entity->like_count = count($like->entity->likes);

                if($entity->save()){
                    return $entity;
                }
            }
        }

        return null;
    }

    public function deleteLike(Entity $entity, User $user)
    {
        $existingLike = EntityLike::where([
            ['entity_id', '=', $entity->id],
            ['user_id', '=', $user->id]
        ])->first();

        if($existingLike && $existingLike->delete()){
            $entity->like_count = count($existingLike->entity->likes);

            if($entity->save()){
                return $entity;
            }
        }

        return null;
    }
}
