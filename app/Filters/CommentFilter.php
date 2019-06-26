<?php

namespace Indiemesh\Filters;

use Illuminate\Database\Eloquent\Builder;

class CommentFilter implements Filter
{
    private $entityId;
    private $recentFirst = false;
    private $lastComment;

    function build(Builder $builder): Builder
    {
        $builder->when($entityId = $this->entityId, function(Builder $q) use ($entityId) {
            return $q->where('entity_id', $entityId);
        });

        if($this->lastComment){
            $builder->where('id', '<', $this->lastComment);
        }

        if ($this->recentFirst) {
            $builder->orderByDesc('created_at');
        }

        $builder->orderByDesc('entity_comments.id');

        return $builder;
    }

    public function setRecentFirst(bool $recentFirst)
    {
        $this->recentFirst = $recentFirst;
    }

    public function setEntityId(int $entityId): void
    {
        $this->entityId = $entityId;
    }

    public function setLastComment(int $commentId)
    {
        $this->lastComment = $commentId;
    }
}
