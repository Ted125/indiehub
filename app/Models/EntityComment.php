<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EntityComment extends Model
{
    use SoftDeletes;

    protected $table = 'entity_comments';

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
