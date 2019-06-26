<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\EntityLike;
use League\Fractal\TransformerAbstract;

class LikeTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'entity', 'user'
    ];

    public function transform(EntityLike $like)
    {
        return [
            'id' => $like->id,
            'entityId' => $like->entity_id,
            'userId' => $like->user_id,
            'createdAt' => $like->created_at,
            'updatedAt' => $like->updated_at
        ];
    }

    public function includeEntity(EntityLike $like)
    {
        return $this->item($like->entity, new EntityTransformer(), 'entity');
    }

    public function includeUser(EntityLike $like)
    {
        return $this->item($like->user, new UserTransformer(), 'user');
    }
}
