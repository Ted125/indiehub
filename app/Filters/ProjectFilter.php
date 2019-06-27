<?php

namespace Indiemesh\Filters;

use Illuminate\Database\Eloquent\Builder;

class ProjectFilter implements Filter
{
    private $userIds;
    private $lastProjectId = 0;
    private $recentFirst = false;

    function build(Builder $builder): Builder
    {
        $builder->join('entities', 'entities.id', '=', 'projects.entity_id');

        if($this->userIds){
            $builder->whereIn('entities.user_id', $this->userIds);
        }

        if($this->lastProjectId){
            $builder->where('projects.entity_id', '<', $this->lastProjectId);
        }

        if ($this->recentFirst){
            $builder->orderByDesc('projects.created_at');
        }

        return $builder;
    }

    public function setRecentFirst($recentFirst)
    {
        $this->recentFirst = $recentFirst;
    }

    public function setLastProjectId($id)
    {
        $this->lastProjectId = $id;
    }

    public function setUserIds($userIds)
    {
        $this->userIds = $userIds;
    }
}
