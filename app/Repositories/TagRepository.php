<?php

namespace Indiemesh\Repositories;

use Indiemesh\Models\Tag;

class TagRepository implements Repository
{
    public function listTags(){
        return Tag::all();
    }

    public function findTag($id){
        return Tag::find($id);
    }
}
