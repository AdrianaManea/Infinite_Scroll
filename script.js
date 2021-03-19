const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  // console.log(posts);
  posts.forEach(post => {
    const postEL = document.createElement('div');
    postEL.classList.add('post');
    postEL.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postEL);
  });
}

// Show initial posts
showPosts();