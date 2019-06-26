<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EntityLike extends Pivot
{
    protected $table = 'entity_likes';

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
