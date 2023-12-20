<?php

namespace App\Http\Requests\Desk;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'data_start'=> 'nullable|date',
            'data_end' =>'nullable|date',
            'status' => 'nullable|boolean',
            'column_id' => 'nullable|integer',
            'done' => 'nullable|boolean',
            'task_id' => 'nullable|integer'
        ];
    }
}
