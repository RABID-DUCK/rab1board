<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string',
            'login' => 'required|string|unique:users',
            'email' => 'required|regex:/^.+@.+\..+$/|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Поле имени обязательно!',
            'login.required' => 'Поля логина обязательно к заполнению!',
            'email.required' => 'Почта обязательно к заполнению!',
            'password.required' => 'Пароль обязателен к заполеннию!',
            'password.confirmed' => 'Пароли не совпадают!',
            'email.unique' => 'Пользователь с такой почтой уже существует!',
            'login.unique' => 'Пользователь с таким логином уже существует!',
            'email.regex' => 'Введите свою настоящую почту!',
            'password.min' => 'Пароль должен состоять минимум из 6 символов!',
        ];
    }
}
