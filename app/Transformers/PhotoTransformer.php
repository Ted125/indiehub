<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\Photo;
use League\Fractal\TransformerAbstract;

class PhotoTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'entity'
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Photo $photo)
    {
        return [
            'id' => $photo->id,
            'fileUrl' => $photo->file_url,
            'caption' => $photo->caption,
            'entityId' => $photo->entity_id,
            'createdAt' => $photo->created_at,
            'updatedAt' => $photo->updated_at,
            'deletedAt' => $photo->deleted_at
        ];
    }

    public function includeEntity(Photo $photo)
    {
        return $this->item($photo->entity, new EntityTransformer(), 'entity');
    }
}
