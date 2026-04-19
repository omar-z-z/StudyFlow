<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserGoal extends Model
{
    protected $fillable = ['user_id', 'weekly_task_goal', 'weekly_hours_goal'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
