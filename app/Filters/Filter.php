<?php

namespace Indiemesh\Filters;

use Illuminate\Database\Eloquent\Builder;

interface Filter
{
    function build(Builder $builder) : Builder;
}
