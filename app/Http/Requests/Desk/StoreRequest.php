<?php

namespace App\Http\Requests\Desk;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'title' => 'required|string',
            'description' => 'nullable|string',
            'task_id' => 'nullable',
            'image' => 'nullable|string',
            'data_start'=> 'nullable|datetime',
            'data_end' =>'nullable|datetime',
            'status' => 'nullable|string'
        ];
    }
}
