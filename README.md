# Social Media Demo Project

![Social Glass Preview](https://via.placeholder.com/800x400?text=Social+Glass+Demo)

## Overview

Social-Media-Mockup is a beginner-friendly social media demo application that illustrates the fundamentals of making API requests and managing client-side data persistence. This project demonstrates GET, POST, and DELETE operations with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API while implementing local data persistence using browser localStorage.

### Features

- 🔄 Fetch and display posts from a remote API
- ✏️ Create new posts and persist them locally
- 🗑️ Delete posts with visual feedback
- 💾 Local storage integration for data persistence
- 🎨 Modern glassmorphism UI design
- 📱 Fully responsive layout
- 📊 Display server responses for educational purposes

## Demo

You can view a live demo of the application at: [https://yourusername.github.io/social-glass](https://yourusername.github.io/social-glass)

## Technologies Used

- HTML5
- CSS3 (with modern features like backdrop-filter)
- Vanilla JavaScript (ES6+)
- localStorage for client-side data persistence
- Fetch API for AJAX requests
- JSONPlaceholder for simulated backend API

## How It Works

### API Integration

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - a free fake API for testing and prototyping. Since JSONPlaceholder doesn't actually save data on their server, we've implemented client-side persistence using localStorage.

**Important Note:** JSONPlaceholder simulates successful API responses but doesn't actually store your data. This is explained in the status messages displayed within the application.

### Key JavaScript Concepts Demonstrated

1. **Asynchronous Functions (async/await)**
   ```javascript
   async function getPosts() {
       const response = await fetch("https://jsonplaceholder.typicode.com/posts");
       const data = await response.json();
       // Process data
   }
   ```

2. **HTTP Methods with Fetch API**
   ```javascript
   // GET request
   fetch("https://jsonplaceholder.typicode.com/posts")
   
   // POST request
   fetch("https://jsonplaceholder.typicode.com/posts", {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ title, body, userId: 1 })
   })
   
   // DELETE request
   fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
       method: "DELETE"
   })
   ```

3. **Local Storage Operations**
   ```javascript
   // Save data
   localStorage.setItem('socialGlassPosts', JSON.stringify(posts));
   
   // Retrieve data
   const posts = JSON.parse(localStorage.getItem('socialGlassPosts'));
   ```

4. **DOM Manipulation**
   ```javascript
   // Create element
   const postElement = document.createElement("div");
   postElement.className = "post glass";
   
   // Add content
   postElement.innerHTML = `<h3>${post.title}</h3>...`;
   
   // Append to parent
   postDiv.appendChild(postElement);
   ```

5. **Event Handling**
   ```javascript
   form.addEventListener("submit", createPost);
   deleteBtn.addEventListener('click', () => deletePost(post.id));
   ```

### Data Flow

1. **Initial Load:**
   - Check localStorage for existing posts
   - If empty, fetch initial posts from JSONPlaceholder API
   - Display posts in UI

2. **Creating Posts:**
   - Collect user input from form
   - Send POST request to JSONPlaceholder API
   - Display API response as a status message
   - Create post object with unique ID and timestamp
   - Save to localStorage
   - Update UI

3. **Deleting Posts:**
   - Send DELETE request to JSONPlaceholder API
   - Display server response status above the post
   - Update localStorage after a brief delay
   - Remove post from UI with animation

## CSS Features

The project includes modern CSS techniques:

- **Glassmorphism Effect:** Creates frosted glass appearance with backdrop-filter
- **CSS Variables:** For consistent theming and easier modifications
- **Flexbox Layout:** For responsive design
- **CSS Animations:** For smooth transitions and loading indicators
- **CSS Gradients:** For attractive visual elements

## Project Structure

```
Social-Media-Mockup/
├── files/
|   ├── script.js       # Javascript code : Logic behind page working
|   └── style.css       # CSS code : Page Styles 
├── index.html          # HTML file : Page Structure
├── README.md           # Project documentation
└── LICENSE             # MIT License
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Open `index.html` in your browser.

That's it! No server setup, dependencies, or build process required.

## Understanding the Code

### `initializePosts()`
Loads posts either from localStorage or from the API if localStorage is empty.

### `createPost(e)`
Handles new post creation, sends data to API, and updates local storage.

### `deletePost(postId)`
Processes post deletion and displays server response.

### `showStatusMessage(message, type)`
Displays temporary status messages to the user.

### `savePostsToStorage(posts)` and `getStoredPosts()`
Handle interaction with localStorage.

## Future Enhancements

- User authentication system
- Comment functionality
- Post categories or tags
- Rich text editor for post content
- Image uploads
- Search functionality

## Deployment Options

This project can be easily deployed on:

1. **GitHub Pages:**
   - Push to a GitHub repository
   - Enable GitHub Pages in repository settings

2. **Netlify:**
   - Connect your GitHub repository
   - Set build command to: `N/A` (No build needed)
   - Set publish directory to: `.` (Root directory)

3. **Vercel:**
   - Import your GitHub repository
   - No configuration required

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing a free testing API
- Inspired by modern web design trends and glassmorphism UI

---

Created by Ivin Titus | © 2025 under MIT License