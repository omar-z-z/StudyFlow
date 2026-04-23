<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GenerateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'syllabus' => ['required', 'string', 'min:20', 'max:20000'],
        ];
    }

    public function messages(): array
    {
        return [
            'syllabus.required' => 'Syllabus text is required.',
            'syllabus.min'      => 'Syllabus is too short to generate a course.',
            'syllabus.max'      => 'Syllabus text is too long. Please trim it down.',
        ];
    }
}
