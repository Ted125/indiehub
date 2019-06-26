<?php

namespace Indiemesh\Repositories;

use Indiemesh\Filters\ProjectFilter;
use Indiemesh\Models\Entity;
use Indiemesh\Models\Project;

class ProjectRepository implements Repository
{
    public function list($length, ProjectFilter $filter) : AbstractPaginator
    {
        return $filter->build(Project::query())->paginate($length);
    }

    public function findProject($id)
    {
        return Project::find($id);
    }

    public function createProject(Entity $entity, $title, $tagline, $description, $fileUrl, $coverPhotoUrl)
    {
        $project = new Project();
        $project->entity_id = $entity->id;
        $project->title = $title;
        $project->tagline = $tagline;
        $project->description = $description;
        $project->file_url = $fileUrl;
        $project->cover_photo_url = $coverPhotoUrl;

        if($project->save()){
            return $project;
        }
    }
}
