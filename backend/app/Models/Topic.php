<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = ['course_id', 'week', 'title', 'completed'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}