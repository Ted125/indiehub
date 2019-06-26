<?php

namespace Indiemesh\Http\Controllers\Api\v1;

use Indiemesh\Http\Controllers\Controller;
use Indiemesh\Services\CategoryService;
use Indiemesh\Transformers\CategoryTransformer;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function list(Request $request)
    {
        $categories = $this->categoryService->list();

        if($categories){
            return fractal()->collection($categories, new CategoryTransformer(), 'category');
        }else{
            return response()->json(null);
        }
    }

    public function find(Request $request)
    {
        $category = $this->categoryService->find($request->id);

        if($category){
            return fractal()->item($category, new CategoryTransformer(), 'category');
        }else{
            return response()->json(null);
        }
    }
}
