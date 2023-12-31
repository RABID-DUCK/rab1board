<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function addComment(Request $request){
        $data = $request->validate(['title' => 'required|string', 'user_id' => 'required|integer', 'desk_id' => 'required|integer']);
        $comment = Comments::create([
            'title' => $data['title'],
            'user_id' => $data['user_id'],
            'desk_id' => $data['desk_id'],
            'count_likes' => 0
        ]);

        return response()->json(['comment' => $comment]);
    }

    public function update(Request $request){
        $data = $request->validate(['id' => 'required|integer', 'title' => 'required|string', 'like' => 'nullable|string']);
        if($comment = Comments::where('id', $data['id'])->first()){
            if($comment !== $data['title']){
                $comment->title = $data['title'];
            }
            if(isset($data['like']) && !empty($data['like'])){
                $data['like'] === 'plus' ? $comment->count_likes += 1 : $comment->count_likes -= 1;
            }
            $comment->save();
            return response()->json($comment);
        }

        return response()->json(['status' => 404, 'message' => 'Произошла ошибка...попробуйте позже!']);
    }

    public function delete(Request $request){
        $id = $request->validate(['id' => 'required|integer']);
        if ($dash = Comments::where('id', $id)->first()){
            $dash->delete();
            return response()->json(['status' => 200]);
        }
        return response()->json(['message' => 'Произошла ошибка! Не найден проект...']);
    }

    public function getComments(Request $request){
        $data = $request->validate(['desk_id' => 'required|integer']);

        return Comments::with('getUsers')->whereHas('getUsers', function ($query) use ($data){
            $query->where('desk_id', $data['desk_id']);
        })->get();
    }
}
