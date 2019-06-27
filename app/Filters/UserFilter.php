<?php

namespace Indiemesh\Filters;

use Illuminate\Database\Eloquent\Builder;

class UserFilter implements Filter
{
    private $excludeIds;
    private $randomize = false;

    function build(Builder $builder): Builder
    {
        if($this->excludeIds){
            $builder->whereNotIn('id', $this->excludeIds);
        }

        if ($this->randomize) {
            $builder->shuffle();
        }

        return $builder;
    }

    public function setExcludes($excludeIds)
    {
        $this->excludeIds = $excludeIds;
    }

    public function randomize($randomize)
    {
        $this->randomize = $randomize;
    }
}
