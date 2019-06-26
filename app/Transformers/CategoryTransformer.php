<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\Category;
use League\Fractal\TransformerAbstract;

class CategoryTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Category $category)
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'createdAt' => $category->created_at,
            'updatedAt' => $category->updated_at
        ];
    }
}
