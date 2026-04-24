<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'user_id', 'name', 'color', 'exam_date'
    ];

    // A course belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A course has many topics
    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    // A course has many assignments
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    // A course has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
