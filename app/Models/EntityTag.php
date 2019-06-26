<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EntityTag extends Pivot
{
    protected $table = 'entity_tags';

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
