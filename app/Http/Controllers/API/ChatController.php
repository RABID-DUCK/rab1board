<?php

namespace App\Http\Controllers\API;

use App\Events\ChatGet;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\MessagesResource;
use App\Models\ChatDashboard;
use App\Models\MessagesChatDashboard;
use App\Models\UserDashboards;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function createMessage(Request $request){
        $data = $request->validate(['chat_dashboard_id' => 'required|integer', 'text' => 'required|string|max:500', 'user_id' => 'required|integer']);

        if(!UserDashboards::where('user_id', $data['user_id'])->where('confirmed', true)->first()) return response(['error' => 'Ошибка!'], 401);

        $message = MessagesChatDashboard::create([
           'chat_dashboard_id' => ChatDashboard::where('dashboard_id', $data['chat_dashboard_id'])->first()->id,
            'user_id' => $data['user_id'],
            'text' => $data['text']
        ]);

        broadcast(new ChatGet($message))->toOthers();

        return new MessagesResource($message);
    }

    public function getMessages(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer']);

        $chat_id = ChatDashboard::where('dashboard_id', $data['dashboard_id'])->first();
        $messages = MessagesChatDashboard::where('chat_dashboard_id', $chat_id->id)->get();

        return MessagesResource::collection($messages);
    }
}
