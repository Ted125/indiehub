<?php

namespace Indiemesh\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entity extends Model
{
    use SoftDeletes;

    public function likes()
    {
        return $this->hasMany(EntityLike::class);
    }

    public function comments()
    {
        return $this->hasMany(EntityComment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'entity_tags');
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
}
