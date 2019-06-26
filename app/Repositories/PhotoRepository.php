<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Entity;
use Indiemesh\Models\Photo;

class PhotoRepository implements Repository
{
    public function addPhoto(Entity $entity, $fileUrl, $caption)
    {
        $newPhoto = new Photo();
        $newPhoto->file_url = $fileUrl;
        $newPhoto->caption = $caption;
        $newPhoto->entity_id = $entity->id;

        if($newPhoto->save()){
            return $newPhoto;
        }

        return null;
    }
}
