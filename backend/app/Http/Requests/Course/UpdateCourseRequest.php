<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'      => 'sometimes|string|max:255',
            'color'     => 'sometimes|string|max:7',
            'progress'  => 'sometimes|integer|min:0|max:100',
            'exam_date' => 'sometimes|date',
        ];
    }
}
