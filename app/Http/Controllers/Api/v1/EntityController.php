<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\EntityService;
use Indiemesh\Services\LikeService;
use Indiemesh\Services\CommentService;
use Indiemesh\Transformers\EntityTransformer;
use Illuminate\Http\Request;

class EntityController extends Controller
{
    private $entityService;
    private $likeService;
    private $commentService;

    public function __construct(EntityService $entityService, LikeService $likeService, CommentService $commentService)
    {
        $this->entityService = $entityService;
        $this->likeService = $likeService;
        $this->commentService = $commentService;
    }

    public function like(Request $request)
    {
        $entityId = $request->id;

        $entity = $this->likeService->addLike($entityId);

        if($entity){
            return fractal()->item($entity, new EntityTransformer(), 'entity');
        }

        return response()->json(null);
    }

    public function unlike(Request $request)
    {
        $entityId = $request->id;

        $entity = $this->likeService->deleteLike($entityId);

        if($entity){
            return fractal()->item($entity, new EntityTransformer(), 'entity')->respond();
        }

        return response()->json(null);
    }

    public function comment(Request $request)
    {
        $entityId = $request->id;
        $comment = $request->comment;

        $entity = $this->commentService->addComment($entityId, $comment);

        if($entity){
            return fractal()->item($entity, new EntityTransformer(), 'entity')->respond();
        }

        return response()->json(null);
    }
}
