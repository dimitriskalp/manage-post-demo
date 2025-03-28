
This is a web application for managing posts fetched from JSONPlaceholder. The application allows users to create, like, and search posts.
The technnologies i used for development were for backend php(Laravel Framework), the frontend React.js, Bootstrap and a Database SQlite.

To see the code and the running application you need to follow these steps:

1. Clone the repository -> "git clone https://github.com/dimitriskalp/manage-post-demo.git" 
2. Copy the env.example in the project folder with name .env and do the same for the frontend folder his own .env.example.
3. In the project folder run the command -> "composer install"
4. Migrate the db -> "php artisan migrate" -> It will to recreate the db, just type yes.
5. I created a command to populate the posts before starting the backend. Run this command -> "php artisan app:populate-posts"
6. For seeing the posts in database follow these commands:
    - php artisan tinker
    - App\Models\Post::all();
    - Ctrl ^ C
7. Now start the backend with this command -> "php artisan serve"
8. Open a new terminal and go to the frontend folder -> "cd frontend" 
9. Run -> "npm install"
10. Run -> "npm run dev"
11. Hit in the browser: http://localhost:3000/


To access the application, you must first register. On the homepage, all fetched posts are displayed in descending order.
In the top right corner, there is a "Create Post" button that redirects you to the post creation page. In the middle of the 
header, a search input allows you to search for posts by title or body content. You can like any post, and the page will 
automatically update to display only unliked posts.To view your liked posts, navigate to the "Liked Posts" section in the 
left menu. From there, you can unlike individual posts or clear all liked posts at once. 


Bonus Features Implemented: 
- A search bar to allow users to search posts by title or content.
- Lazy loading for better performance
- Modern UI with responsive design both mobile and desktop


Note: For running this application you need at least php version 8.
