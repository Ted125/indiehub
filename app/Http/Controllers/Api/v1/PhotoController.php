<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\PhotoService;
use Indiemesh\Transformers\PhotoTransformer;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    private $photoService;

    public function __construct(PhotoService $photoService)
    {
        $this->photoService = $photoService;
    }

    public function store(Request $request)
    {
        $file = $request->photo;
        $caption = $request->caption;

        if($file){
            $path = $this->photoService->simpleUpload($file, $caption);

            return response()->json([
                'path' => $path
            ]);
        }

        return response()->json(null);
    }

    public function upload(Request $request)
    {
        $file = $request->photo;
        $entityId = $request->entityId;
        $caption = $request->caption;

        if($file){
            $photo = $this->photoService->uploadPhoto($entityId, $file, $caption);

            if($photo){
                return fractal()->item($photo, new PhotoTransformer(), 'photo');
            }
        }

        return response()->json(null);
    }
}
