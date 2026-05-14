const STORAGE_KEY = "latestautotech_admin_blogs";

function readStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read blog storage", error);
    return [];
  }
}

function writeStorage(posts) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to write blog storage", error);
  }
}

function createId() {
  return Date.now();
}

export function loadBlogPosts() {
  return readStorage();
}

export function getBlogPostById(id) {
  return readStorage().find((post) => post.id === Number(id)) || null;
}

export function saveBlogPost(post) {
  const posts = readStorage();
  if (post.id) {
    const existingIndex = posts.findIndex((item) => item.id === post.id);
    if (existingIndex !== -1) {
      posts[existingIndex] = post;
    } else {
      posts.unshift(post);
    }
  } else {
    post.id = createId();
    posts.unshift(post);
  }
  writeStorage(posts);
  return post;
}

export function deleteBlogPost(id) {
  const posts = readStorage().filter((post) => post.id !== Number(id));
  writeStorage(posts);
  return posts;
}
