<?php

namespace Indiemesh\Services;

use Indiemesh\Repositories\TagRepository;

class TagService implements Service
{
    private $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    public function list(){
        return $this->tagRepository->listTags();
    }

    public function find($id){
        return $this->tagRepository->findTag($id);
    }
}
