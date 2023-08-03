<?php

namespace App\Http\Requests\User;

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
        $userId = $this->user_id;

        return [
            'user_id' => 'nullable|integer|exists:users,id',
            'name' => 'required|string',
            'login' => "required|string|unique:users,login,{$userId}",
            'email' => "required|string|unique:users,email,{$userId}",
            'password' => 'nullable|string|confirmed',
            "role_id" => "required"
        ];
    }
}
