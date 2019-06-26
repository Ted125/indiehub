<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Category;

class CategoryRepository implements Repository
{
    public function listCategories(){
        return Category::all();
    }

    public function findCategory($id){
        return Category::find($id);
    }
}
