<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'entity_id';
    public $incrementing = false;

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id');
    }

    public function user()
    {
        return $this->entity->user;
    }
}
