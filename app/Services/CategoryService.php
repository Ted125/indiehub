<?php

namespace Indiemesh\Services;

use Indiemesh\Repositories\CategoryRepository;

class CategoryService implements Service
{
    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function list(){
        return $this->categoryRepository->listCategories();
    }

    public function find($id){
        return $this->categoryRepository->findCategory($id);
    }
}
