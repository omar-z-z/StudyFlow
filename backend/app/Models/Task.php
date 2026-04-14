<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id', 'course_id', 'title', 'completed',
        'estimated_time', 'priority', 'type', 'date'
    ];

    // A task belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A task belongs to a course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
