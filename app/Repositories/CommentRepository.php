<?php

namespace Indiemesh\Repositories;

use Indiemesh\Filters\CommentFilter;
use Indiemesh\Models\Entity;
use Indiemesh\Models\EntityComment;
use Indiemesh\Models\User;
use Illuminate\Pagination\AbstractPaginator;

class CommentRepository implements Repository
{
    public function list($length, CommentFilter $filter) : AbstractPaginator
    {
        return $filter->build(EntityComment::query())->paginate($length);
    }

    public function findComment($id)
    {
        return EntityComment::find($id);
    }

    public function addComment(Entity $entity, User $user, $comment) {
        $newComment = new EntityComment();
        $newComment->entity_id = $entity->id;
        $newComment->user_id = $user->id;
        $newComment->comment = $comment;

        if($newComment->save()){
            return $entity;
        }

        return null;
    }

    public function deleteComment(EntityComment $comment){
        if($comment->delete()){
            return $comment;
        }

        return null;
    }
}
