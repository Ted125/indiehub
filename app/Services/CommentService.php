<?php

namespace Indiemesh\Services;

use Indiemesh\Filters\CommentFilter;
use Indiemesh\Repositories\CommentRepository;
use Indiemesh\Repositories\EntityRepository;
use Illuminate\Pagination\AbstractPaginator;
use JWTAuth;

class CommentService implements Service
{
    private $commentRepository;
    private $entityRepository;

    public function __construct(CommentRepository $commentRepository, EntityRepository $entityRepository)
    {
        $this->commentRepository = $commentRepository;
        $this->entityRepository = $entityRepository;
    }

    public function list($length = self::DEFAULT_LIST_LENGTH, CommentFilter $filter) : AbstractPaginator
    {
        return $this->commentRepository->list($length, $filter);
    }

    public function findComment($id)
    {
        return $this->commentRepository->findComment($id);
    }

    public function addComment($entityId, $comment) {
        $user = JWTAuth::user();
        $entity = $this->entityRepository->findEntity($entityId);

        if(!$user || !$entity){
            return null;
        }

        return $this->commentRepository->addComment($entity, $user, $comment);
    }

    public function deleteComment($commentId){
        $comment = $this->findComment($commentId);

        if(!$comment){
            return null;
        }

        return $this->commentRepository->deleteComment($comment);
    }
}
