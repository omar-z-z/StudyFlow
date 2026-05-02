<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'week', 'title', 'completed'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}