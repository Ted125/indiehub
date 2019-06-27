<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\Entity;
use League\Fractal\TransformerAbstract;

class EntityTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'user', 'likes', 'comments', 'category', 'tags', 'photos'
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
     public function transform(Entity $entity)
     {
         return [
             'id' => $entity->id,
             'likeCount' => $entity->like_count,
             'userId' => $entity->user_id,
             'categoryId' => $entity->category_id,
             'createdAt' => $entity->created_at,
             'updatedAt' => $entity->updated_at,
             'deletedAt' => $entity->deleted_at
         ];
     }

    public function includeLikes(Entity $entity)
    {
        return $this->collection($entity->likes, new LikeTransformer(), 'like');
    }

    public function includeComments(Entity $entity)
    {
        return $this->collection($entity->comments, new CommentTransformer(), 'comment');
    }

    public function includeUser(Entity $entity)
    {
        return $this->item($entity->user, new UserTransformer(), 'user');
    }

    public function includeCategory(Entity $entity)
    {
        return $this->item($entity->category, new CategoryTransformer(), 'category');
    }

    public function includeTags(Entity $entity)
    {
        return $this->collection($entity->tags, new TagTransformer(), 'tag');
    }

    public function includePhotos(Entity $entity)
    {
        return $this->collection($entity->photos, new PhotoTransformer(), 'photo');
    }
}
