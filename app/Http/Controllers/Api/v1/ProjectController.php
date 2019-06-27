<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use Indiemesh\Filters\ProjectFilter;
use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\ProjectService;
use Indiemesh\Transformers\ProjectTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ProjectController extends Controller
{
    private $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function find(Request $request)
    {
        $project = $this->projectService->find($request->id);

        if($project){
            return fractal()->item($project, new ProjectTransformer(), 'project')->respond();
        }

        return response()->json(null);
    }

    public function list(Request $request)
    {
        $userIds = $request->userIds;
        $recentFirst = $request->recentFirst;
        $lastProjectId = $request->lastProjectId;

        $filter = new ProjectFilter();
        $filter->setUserIds($userIds);
        $filter->setLastProjectId($lastProjectId);
        $filter->setRecentFirst($recentFirst);

        $projects = $this->projectService->list(50, $filter);

        if($projects){
            return fractal()
                ->collection($projects, new ProjectTransformer(), 'project')
                ->paginateWith(new IlluminatePaginatorAdapter($projects))
                ->respond();
        }

        return response()->json(null);
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
