<?php

namespace Indiemesh\Services;

use Carbon\Carbon;
use Indiemesh\Repositories\EntityRepository;
use Indiemesh\Repositories\FileRepository;
use Indiemesh\Repositories\PhotoRepository;
use Illuminate\Http\UploadedFile;
use JWTAuth;

class PhotoService implements Service
{
    private $entityRepository;
    private $fileRepository;
    private $photoRepository;

    public function __construct(EntityRepository $entityRepository, FileRepository $fileRepository, PhotoRepository $photoRepository)
    {
        $this->entityRepository = $entityRepository;
        $this->fileRepository = $fileRepository;
        $this->photoRepository = $photoRepository;
    }

    public function uploadPhoto($entityId, UploadedFile $file, $caption = null)
    {
        $fileName = str_slug(sha1(Carbon::now())) . '.' . $file->guessExtension();

        $path = $this->fileRepository->save($file, $fileName, 'photos');
        $entity = $this->entityRepository->findEntity($entityId);

        if($path && $entity){
            $photo = $this->photoRepository->addPhoto($entity, '/uploads/' . $path, $caption);

            if($photo){
                return $photo;
            }
        }

        return null;
    }
}
