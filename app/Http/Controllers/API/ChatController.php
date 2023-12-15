<?php

namespace App\Http\Controllers\API;

use App\Events\ChatGet;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\MessagesResource;
use App\Http\Resources\API\UserResource;
use App\Models\ChatDashboard;
use App\Models\MessagesChatDashboard;
use App\Models\UserDashboards;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function createMessage(Request $request){
        $data = $request->validate(['chat_dashboard_id' => 'required|integer', 'text' => 'required|string|max:500', 'user_id' => 'required|integer']);

        if(!UserDashboards::where('user_id', $data['user_id'])->where('confirmed', true)->first()) return response(['error' => 'Ошибка!'], 401);

        $message = MessagesChatDashboard::create([
           'chat_dashboard_id' => ChatDashboard::where('dashboard_id', $data['chat_dashboard_id'])->first()->id,
            'user_id' => $data['user_id'],
            'text' => $data['text'],
        ]);

        broadcast(new ChatGet($message))->toOthers();

        return new MessagesResource($message);
    }

    public function getMessages(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer', 'offset' => 'nullable|integer',]);

        $chat_id = ChatDashboard::where('dashboard_id', $data['dashboard_id'])->first();
        $messages = MessagesChatDashboard::where('chat_dashboard_id', $chat_id->id)->latest()->skip($data['offset'] ?? 0)->take(10)->get();
        $format_messages = collect([]);

        foreach ($messages->sortBy('created_at') as $message){
            $date_form = Carbon::parse($message->created_at)->isoFormat('Do MMMM YYYY');

            if($format_messages->has($date_form)){
                $existingMessage = $format_messages->get($date_form);
                $existingMessage->messages[] = (object)[
                    'text' => $message->text,
                    'user' => new UserResource($message->getUser),
                    'created_at' => $date_form,
                    'time_created' => Carbon::parse($message->created_at)->format('H:i'),
                ];
            }else{
                $format_messages->put($date_form, (object)[
                    'group_time' => $date_form,
                    'chat_dashboard_id' => $message->chat_dashboard_id,
                    'messages' => [
                        (object)[
                            'text' => $message->text,
                            'user' => new UserResource($message->getUser),
                            'created_at' => $date_form,
                            'time_created' => Carbon::parse($message->created_at)->format('H:i'),
                        ]
                    ]
                ]);
            }
        }


        return MessagesResource::collection($format_messages);
    }
}
