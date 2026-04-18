<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\Progress\ProgressResource;
use App\Services\ProgressService;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function index(ProgressService $service)
    {
        $data = $service->getUserProgress(Auth::id());

        return new ProgressResource($data);
    }
}
