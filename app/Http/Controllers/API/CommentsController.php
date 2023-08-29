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
        $data = $request->validate(['id' => 'required|integer', 'title' => 'required|string', 'like' => 'nullable|integer']);
        if($comment = Comments::where('id', $data['id'])->first()){
            if($comment !== $data['title']){
                $comment->title = $data['title'];
            }
            if(isset($data['like']) && !empty($data['like'])){
                $comment->count_likes += 1;
            }
            $comment->save();
            return response()->json($comment);
        }

        return response()->json(['status' => 404, 'message' => 'Произошла ошибка...попробуйте позже!']);
    }
}
