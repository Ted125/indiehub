<?php

namespace Indiemesh\Services;

use Indiemesh\Repositories\EntityRepository;

class EntityService implements Service
{
    private $entityRepository;

    public function __construct(EntityRepository $entityRepository)
    {
        $this->entityRepository = $entityRepository;
    }

    public function findEntity($id)
    {
        return $this->entityRepository->findEntity($id);
    }

    public function createEntity($userId, $categoryId)
    {
        return $this->entityRepository->createEntity($userId, $categoryId);
    }
}
