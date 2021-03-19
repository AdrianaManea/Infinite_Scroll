const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');
const filter = document.getElementById('filter');

let limit = 7;
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

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  // posts gives a NodeList which basically Array
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }

  });
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


filter.addEventListener('input', filterPosts);