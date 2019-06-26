<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\ProjectService;
use Indiemesh\Transformers\ProjectTransformer;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    private $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function store(Request $request)
    {
        $categoryId = $request->categoryId;
        $title = $request->title;
        $tagline = $request->tagline;
        $description = $request->description;
        $fileUrl = $request->fileUrl;
        $coverPhotoUrl = $request->coverPhotoUrl;
        $tags = $request->tags;
        $photos = $request->photos;

        $project = $this->projectService->uploadProject(
            $categoryId,
            $title,
            $tagline,
            $description,
            $fileUrl,
            $coverPhotoUrl,
            $tags,
            $photos
        );

        if($project){
            return fractal()->item($project, new ProjectTransformer(), 'project');
        }

        return response()->json(null);
    }
}
