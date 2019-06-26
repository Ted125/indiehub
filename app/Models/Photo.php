<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Photo extends Model
{
    use SoftDeletes;

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }
}
