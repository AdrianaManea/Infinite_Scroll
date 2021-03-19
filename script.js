const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;
let isLoading = false;

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

// Show 'loading' & Fetch the rest of the posts
async function showLoading() {
  if (isLoading) {
    return;
  }

  page++;
  isLoading = true;
  loading.classList.add('show');

  await showPosts(); // important

  isLoading = false; // only then do we enable further loading
  loading.classList.remove('show'); // and remove the loader

}


// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // console.log(123);

    // Show 'loading' & Fetch the rest of the posts
    showLoading();
  }
});