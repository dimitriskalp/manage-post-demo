
This is a web-application that you can manage post which are fetched from JSONPlaceholder. 
The technnologies i used for development were for backend php laravel framework, the frontend react and a database sqlite.

To see the code and the running application you need to follow these steps:

1. Clone the repository -> "git clone https://github.com/dimitriskalp/manage-post-demo.git" 
2. Copy the env.example in the project folder with name .env and do the same for the frontend folder his own .env.example.
3. In the project folder run the command -> "composer install"
4. Migrate the db -> "php artisan migrate" 
5. I created a command to populate the posts before starting the backend. Run this command -> "php artisan app:populate-posts"
6. For seeing the posts in database follow these commands:
    - php artisan tinker
    - App\Models\Post::all();
    - Ctrl ^ C
7. Now start the backend with this command -> "php artisan serve"
8. Open a new terminal and go to the frontend folder -> "cd frontend" 
9. Run -> "npm install"
10. Run -> "npm run dev"


To enter the application you need to register first. In the first page you will see all the fetched post in descending order.
On the top right you will see a create post button that redirects to page to create new posts. In the middle of header there is 
search input that runs search in the title and body of posts. You can like every post and it is refetching only the posts that 
are not liked. If you want to see your like-post go on the left menu and clicked on liked-post. In this page you can unlike 
post and also clear at once all the liked posts.
