<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Entity;
use Indiemesh\Models\EntityTag;
use Indiemesh\Models\Tag;

class EntityTagRepository implements Repository
{
    public function findTag($id)
    {
        return EntityTag::find($id);
    }

    public function addTag(Entity $entity, Tag $tag)
    {
        $existingTag = EntityTag::where([
            ['entity_id', '=', $entity->id],
            ['tag_id', '=', $tag->id]
        ])->first();

        if(!$existingTag){
            $newTag = new EntityTag();
            $newTag->entity_id = $entity->id;
            $newTag->tag_id = $tag->id;

            if($newTag->save()){
                return $entity;
            }
        }

        return null;
    }

    public function deleteTag(Entity $entity, Tag $tag)
    {
        $existingTag = EntityTag::where([
            ['entity_id', '=', $entity->id],
            ['tag_id', '=', $tag->id]
        ])->first();

        if($existingTag && $existingTag->delete()){
            return $entity;
        }

        return null;
    }
}
