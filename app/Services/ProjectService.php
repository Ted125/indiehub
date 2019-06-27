<?php

namespace Indiemesh\Services;

use Illuminate\Pagination\AbstractPaginator;
use Indiemesh\Filters\ProjectFilter;
use Indiemesh\Repositories\EntityRepository;
use Indiemesh\Repositories\EntityTagRepository;
use Indiemesh\Repositories\ProjectRepository;
use Indiemesh\Repositories\TagRepository;
use Indiemesh\Services\PhotoService;
use JWTAuth;

class ProjectService implements Service
{
    private $entityRepository;
    private $entityTagRepository;
    private $projectRepository;
    private $photoService;

    public function __construct(EntityRepository $entityRepository, EntityTagRepository $entityTagRepository, ProjectRepository $projectRepository, TagRepository $tagRepository, PhotoService $photoService)
    {
        $this->entityRepository = $entityRepository;
        $this->entityTagRepository = $entityTagRepository;
        $this->projectRepository = $projectRepository;
        $this->tagRepository = $tagRepository;
        $this->photoService = $photoService;
    }

    public function find($id)
    {
        return $this->projectRepository->findProject($id);
    }

    public function list($length = self::DEFAULT_LIST_LENGTH, ProjectFilter $filter) : AbstractPaginator
    {
        return $this->projectRepository->list($length, $filter);
    }

    public function uploadProject($categoryId, $title, $tagline, $description, $fileUrl, $coverPhotoUrl, $tags, $photos)
    {
        $user = JWTAuth::user();

        if($user){
            $entity = $this->entityRepository->createEntity($user->id, $categoryId);

            if($entity){
                $project = $this->projectRepository->createProject(
                    $entity,
                    $title,
                    $tagline,
                    $description,
                    $fileUrl,
                    $coverPhotoUrl
                );

                if($project){
                    foreach ($tags as $tagString) {
                        $tag = $this->tagRepository->findTag($tagString);
                        $temp = $this->entityTagRepository->addTag($entity, $tag);

                        if(!$temp){
                            return null;
                        }
                    }

                    foreach ($photos as $photo) {
                        $temp = $this->photoService->uploadPhoto($entity->id, $photo);

                        if(!$temp){
                            return null;
                        }
                    }

                    return $project;
                }
            }
        }

        return null;
    }
}
