<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\EntityComment;
use League\Fractal\TransformerAbstract;

class CommentTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'user'
    ];

    protected $availableIncludes = [
        'entity'
    ];

    public function transform(EntityComment $comment)
    {
        return [
            'id' => $comment->id,
            'entityId' => $comment->entity_id,
            'userId' => $comment->user,
            'comment' => $comment->comment,
            'deletedAt' => $comment->deleted_at,
            'createdAt' => $comment->created_at,
            'updatedAt' => $comment->updated_at
        ];
    }

    public function includeEntity(EntityComment $comment)
    {
        return $this->item($comment->entity, new EntityTransformer(), 'entity');
    }

    public function includeUser(EntityComment $comment)
    {
        return $this->item($comment->user, new UserTransformer(), 'user');
    }
}
