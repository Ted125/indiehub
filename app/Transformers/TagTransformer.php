<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\Tag;
use League\Fractal\TransformerAbstract;

class TagTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Tag $tag)
    {
        return [
            'id' => $tag->id,
            'name' => $tag->name,
            'createdAt' => $tag->created_at,
            'updatedAt' => $tag->updated_at
        ];
    }
}
