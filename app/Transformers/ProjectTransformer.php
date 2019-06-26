<?php

namespace Indiemesh\Transformers;

use Indiemesh\Models\Project;
use League\Fractal\TransformerAbstract;

class ProjectTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'entity'
    ];

    protected $availableIncludes = [
        'user'
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Project $project)
    {
        return [
            'id' => $project->entity_id,
            'title' => $project->title,
            'tagline' => $project->tagline,
            'description' => $project->description,
            'fileUrl' => $project->file_url,
            'coverPhotoUrl' => $project->cover_photo_url,
            'created_at' => $project->created_at,
            'updated_at' => $project->updated_at,
            'deleted_at' => $project->deleted_at
        ];
    }

    public function includeEntity(Project $project)
    {
        return $this->item($project->entity, new EntityTransformer(), 'entity');
    }

    public function includeUser(Project $project)
    {
        return $this->item($project->user, new UserTransformer(), 'user');
    }
}
