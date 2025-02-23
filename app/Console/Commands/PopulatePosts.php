<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class PopulatePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:populate-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate posts from JSONPlaceholder API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Fetch posts from the JSONPlaceholder API
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is successful
        if ($response->successful()) {
            $posts = $response->json();

            foreach ($posts as $postData) {
                // Ensure the user exists
                $user = User::firstOrCreate(
                    ['id' => $postData['userId']], // Match by ID
                    ['name' => 'User ' . $postData['userId'], 'email' => 'user'.$postData['userId'].'@example.com', 'password' => bcrypt('password')]
                );

                // Insert the post
                Post::updateOrCreate(
                    ['id' => $postData['id']], // Prevent duplicates
                    [
                        'user_id' => $user->id,
                        'title' => $postData['title'],
                        'body' => $postData['body']
                    ]
                );
            }

            $this->info('Posts populated successfully!');
        } else {
            $this->error('Failed to fetch posts.');
        }
    }
}
