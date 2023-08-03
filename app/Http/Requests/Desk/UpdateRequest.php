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
            'title' => 'required|string',
            'description' => 'nullable|string',
            'task_id' => 'nullable',
            'data_start'=> 'nullable|date_format:"Y-m-d\TH:i"',
            'data_end' =>'nullable|date_format:"Y-m-d\TH:i"',
            'status' => 'nullable|string',
            'desk_id' => 'nullable'
        ];
    }
}
