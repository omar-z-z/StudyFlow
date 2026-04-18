<?php

namespace App\Http\Requests\Topic;

use App\Models\Course;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTopicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $course = Course::findOrFail($this->route('course')->id);
        return $course->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'title'     => 'sometimes|string|max:255',
            'week'      => 'sometimes|integer|min:1',
            'completed' => 'sometimes|boolean',
        ];
    }
}
