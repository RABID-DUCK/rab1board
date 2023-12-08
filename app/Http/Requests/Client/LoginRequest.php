<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /*
      В данном регулярном выражении:
        - "^" - означает начало строки
        - ".+" - означает один или более любых символов
        - "@" - символ "@"
        - ".+" - означает один или более любых символов
        - "\." - символ "."
        - ".+" - означает один или более любых символов
        - "$" - означает конец строки
     */
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|regex:/^.+@.+\..+$/',
            'password' => 'required',
            'checked' => 'required|boolean'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Почта обязательно к заполнению!',
            'password.required' => 'Пароль обязателен к заполеннию!',
            'email.regex' => 'Введите свою настоящую почту!'
        ];
    }
}
