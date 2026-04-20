<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    protected $fillable = ['course_id', 'title', 'due_date', 'completed'];

    protected $casts = [
        'due_date'      => 'date',  
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
