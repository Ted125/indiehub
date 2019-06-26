<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Entity;

class EntityRepository implements Repository
{
    public function findEntity($id)
    {
        return Entity::find($id);
    }

    public function createEntity($userId, $categoryId)
    {
        $newEntity = new Entity();
        $newEntity->like_count = 0;
        $newEntity->user_id = $userId;
        $newEntity->category_id = $categoryId;

        if($newEntity->save()){
            return $newEntity;
        }

        return null;
    }
}
