<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth();

        $likedPosts = Post::whereHas('likes', function ($query) use ($user) {
            $query->where('user_id', $user->id());
        })->get();

        return PostResource::collection($likedPosts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $post)
    {
        $userId = auth()->id();

        $existingLike = Like::where('user_id', $userId)
            ->where('post_id', $post)
            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'You already liked this post'], 400);
        }

        Like::create([
            'user_id' => $userId,
            'post_id' => $post,
        ]);

        return response()->json(['message' => 'Post liked!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $likeId = null)
    {
        $userId = auth()->id();

        if ($likeId) {
            $removeLike = Like::where('user_id', $userId)
                ->where('post_id', $likeId)
                ->delete();

            return response()->json(['message' => 'Liked removed!']);
        } else {
            $removeAllLikes = Like::where('user_id', $userId)
                ->delete();
            return response()->json(['message' => 'All Liked Posts has been removed!']);
        }

    }
}
