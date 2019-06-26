<?php

namespace Indiemesh\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProjectFilter implements Filter
{
    private $userIds;
    private $blacklist;
    private $recentFirst = false;

    function build(Builder $builder): Builder
    {
        if($this->userIds){
            $builder->whereIn('user_id', $this->userIds);
        }

        if($this->blacklist){
            $builder->whereNotIn('user_id', $this->blacklist);
        }

        if ($this->recentFirst){
            $builder->orderByDesc('created_at');
        }

        return $builder;
    }

    public function setRecentFirst(bool $recentFirst)
    {
        $this->recentFirst = $recentFirst;
    }

    public function setUserIds(array $userIds)
    {
        $this->userIds = $userIds;
    }

    public function setBlacklist(array $blacklist)
    {
        $this->blacklist = $blacklist;
    }
}
