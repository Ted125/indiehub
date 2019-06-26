<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\TagService;
use Indiemesh\Transformers\TagTransformer;
use Illuminate\Http\Request;

class TagController extends Controller
{
    private $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function list(Request $request)
    {
        $tags = $this->tagService->list();

        if($tags){
            return fractal()->collection($tags, new TagTransformer(), 'tag');
        }else{
            return response()->json(null);
        }
    }

    public function find(Request $request)
    {
        $tag = $this->tagService->find($request->id);

        if($tag){
            return fractal()->item($tag, new TagTransformer(), 'tag');
        }else{
            return response()->json(null);
        }
    }
}
