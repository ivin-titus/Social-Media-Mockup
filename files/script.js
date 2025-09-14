// LocalStorage keys
const POSTS_STORAGE_KEY = 'socialPosts';

// Initialize posts from localStorage or fetch from API if empty
async function initializePosts() {
    const storedPosts = getStoredPosts();
    
    if (storedPosts && storedPosts.length > 0) {
        // If we have stored posts, use them
        showPost(storedPosts);
        showStatusMessage('Posts loaded from local storage', 'info');
    } else {
        // Otherwise fetch from API
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) throw new Error('Failed to fetch posts');
            
            const data = await response.json();
            const initialPosts = data.slice(0, 4);
            
            // Store fetched posts in localStorage
            savePostsToStorage(initialPosts);
            showPost(initialPosts);
            showStatusMessage('Initial posts loaded from API', 'info');
        } catch (error) {
            console.error("Error fetching posts:", error);
            document.getElementById("posts").innerHTML = `
                <div class="glass">
                    <p>Failed to load posts. Please try again later.</p>
                </div>
            `;
            showStatusMessage('Failed to load posts from API', 'error');
        }
    }
}

// Get posts from localStorage
function getStoredPosts() {
    const postsJson = localStorage.getItem(POSTS_STORAGE_KEY);
    return postsJson ? JSON.parse(postsJson) : null;
}

// Save posts to localStorage
function savePostsToStorage(posts) {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

// Display posts in the UI
function showPost(posts) {
    const postDiv = document.getElementById("posts");
    postDiv.innerHTML = "";
    postDiv.classList.remove("loading");

    if (posts.length === 0) {
        postDiv.innerHTML = `
            <div class="glass">
                <p>No posts found. Be the first to create one!</p>
            </div>
        `;
        return;
    }

    // Sort posts to show newest first (if there's a timestamp)
    posts.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
            return b.timestamp - a.timestamp;
        }
        return 0;
    });

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post glass";
        
        // Create post HTML content
        let postContent = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.body}</p>
        `;
        
        // Add server response if available
        if (post.serverResponse) {
            postContent += `
                <div class="status-message success">
                    <strong>Server Response:</strong> ${post.serverResponse}
                </div>
            `;
        }
        
        // Add delete button
        postContent += `
            <div class="post-actions">
                <button class="delete-btn" data-id="${post.id}">Delete Post</button>
            </div>
        `;
        
        postElement.innerHTML = postContent;
        postDiv.appendChild(postElement);
        
        // Add event listener to delete button
        const deleteBtn = postElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deletePost(post.id));
    });
}

// Create new post
async function createPost(e) {
    e.preventDefault();
    
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    
    if (!title || !body) return;
    
    try {
        // Make API request to JSONPlaceholder
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body, userId: 1 })
        });
        
        if (!response.ok) throw new Error('Failed to create post');
        
        const data = await response.json();
        console.log("API Response:", data);
        
        // Create a new post object with timestamp and server response
        const newPost = {
            id: Date.now(), // Use timestamp as unique ID since JSONPlaceholder IDs aren't persisted
            title,
            body,
            userId: 1,
            timestamp: Date.now(),
            serverResponse: `Post created successfully with ID: ${data.id} (Note: This is a simulated response from JSONPlaceholder)`
        };
        
        // Get existing posts and add the new one
        const existingPosts = getStoredPosts() || [];
        existingPosts.unshift(newPost);
        
        // Save updated posts list
        savePostsToStorage(existingPosts);
        
        // Clear form fields
        titleInput.value = "";
        bodyInput.value = "";
        
        // Show success message
        showStatusMessage('Post created successfully!', 'success');
        
        // Update UI
        showPost(existingPosts);
        
        // Scroll to the top to see the new post
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error("Error creating post:", error);
        showStatusMessage('Failed to create post. Please try again.', 'error');
    }
}

// Delete a post by ID
async function deletePost(postId) {
    try {
        // Get the post element from the DOM
        const postElement = document.querySelector(`.post .delete-btn[data-id="${postId}"]`).closest('.post');
        
        // Make API request to JSONPlaceholder
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE"
        });
        
        if (!response.ok) throw new Error('Failed to delete post');
        
        // Get the server response
        const responseStatus = response.status;
        console.log("Delete response status:", responseStatus);
        
        // Add deletion status to the post before removing it
        const statusMessage = document.createElement('div');
        statusMessage.className = 'status-message success';
        statusMessage.innerHTML = `<strong>Server Response:</strong> Post deleted successfully (Status: ${responseStatus})`;
        
        // Insert status message at the beginning of the post
        postElement.insertBefore(statusMessage, postElement.firstChild);
        
        // Update the appearance of the post
        postElement.style.opacity = "0.7";
        postElement.style.borderColor = "rgba(255, 59, 59, 0.3)";
        
        // Disable the delete button
        const deleteBtn = postElement.querySelector('.delete-btn');
        deleteBtn.disabled = true;
        deleteBtn.textContent = "Deleted";
        deleteBtn.style.opacity = "0.5";
        
        // Show status message at the top
        showStatusMessage(`Post deleted successfully (Server Status: ${responseStatus})`, 'success');
        
        // Update localStorage after a short delay
        setTimeout(() => {
            // Get existing posts
            let existingPosts = getStoredPosts() || [];
            
            // Remove the deleted post
            existingPosts = existingPosts.filter(post => post.id !== postId);
            
            // Save updated posts list
            savePostsToStorage(existingPosts);
            
            // Remove the post from UI
            postElement.style.height = "0";
            postElement.style.padding = "0";
            postElement.style.margin = "0";
            
            setTimeout(() => {
                postElement.remove();
                
                // Show message if no posts left
                const postDiv = document.getElementById("posts");
                if (postDiv.children.length === 0) {
                    postDiv.innerHTML = `
                        <div class="glass">
                            <p>No posts found. Be the first to create one!</p>
                        </div>
                    `;
                }
            }, 500);
        }, 3000);
        
    } catch (error) {
        console.error("Error deleting post:", error);
        showStatusMessage('Failed to delete post. Please try again.', 'error');
    }
}

// Display status messages
function showStatusMessage(message, type = 'info') {
    const statusContainer = document.getElementById('status-container');
    
    const statusElement = document.createElement('div');
    statusElement.className = `status-message ${type}`;
    statusElement.textContent = message;
    
    statusContainer.appendChild(statusElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        statusElement.style.opacity = "0";
        statusElement.style.transform = "translateY(-10px)";
        setTimeout(() => {
            statusElement.remove();
        }, 500);
    }, 5000);
}

// Clear all posts (for testing)
function clearAllPosts() {
    localStorage.removeItem(POSTS_STORAGE_KEY);
    document.getElementById("posts").innerHTML = `
        <div class="glass">
            <p>No posts found. Be the first to create one!</p>
        </div>
    `;
    showStatusMessage('All posts cleared from local storage', 'info');
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPost");
    form.addEventListener("submit", createPost);
    
    initializePosts();
    
    // Add clear button to footer for testing
    const footer = document.querySelector('footer');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Reset All Posts';
    clearButton.style.marginTop = '10px';
    clearButton.addEventListener('click', clearAllPosts);
    footer.appendChild(clearButton);
});
