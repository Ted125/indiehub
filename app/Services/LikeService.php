<?php

namespace Indiemesh\Services;

use Indiemesh\Models\EntityLike;
use Indiemesh\Repositories\EntityRepository;
use Indiemesh\Repositories\LikeRepository;
use JWTAuth;

class LikeService implements Service
{
    private $entityRepository;
    private $likeRepository;

    public function __construct(EntityRepository $entityRepository, LikeRepository $likeRepository)
    {
        $this->entityRepository = $entityRepository;
        $this->likeRepository = $likeRepository;
    }

    public function findLike($id)
    {
        return $this->likeRepository->findLike($id);
    }

    public function addLike($entityId)
    {
        $user = JWTAuth::user();
        $entity = $this->entityRepository->findEntity($entityId);

        if(!$user || !$entity){
            return null;
        }

        return $this->likeRepository->addLike($entity, $user);
    }

    public function deleteLike($entityId)
    {
        $user = JWTAuth::user();
        $entity = $this->entityRepository->findEntity($entityId);

        if(!$user || !$entity){
            return null;
        }

        return $this->likeRepository->deleteLike($entity, $user);
    }
}
