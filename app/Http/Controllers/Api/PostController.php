<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth();
        return PostResource::collection(
            Post::whereDoesntHave('likes', function($query) use ($user) {
                return $query->where('user_id', $user->id());
            }
            )->orderBy('created_at','desc')
                ->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $data['user_id'] = auth()->id();

        $post = Post::create($data);
        return response(new PostResource($post), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
    public function search(Request $request)
    {
        $search = $request->input('input');
        $results = Post::where('title', 'like', "%$search%")
                            ->orWhere('body', 'like', "%$search%")
                            ->orderBy('created_at','desc')
                            ->get();
        return PostResource::collection($results);
    }
}
