async function main(){
    const posts = await GetAllPosts();
    console.log(posts);
}
main();

async function GetAllPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts;');
        const data = await response.json();        
        return data;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
  }
console.log( await GetAllPosts());
  
async function GetPostById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Hiba történt:', error)
    }
  }
console.log(await GetPostById(1));
  
async function CreatePost() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts&#39;', {
            method: 'POST',
            body: JSON.stringify({
                title: 'asd',
                body: 'asd',
                userId: 101,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Hiba történt:', error)
    }
}
console.log(await CreatePost());
  
async function UpdatePost(id) {  
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
          });
          const data = await response.json();
        return data;
    } catch(error) {
        console.error('Hiba történt:', error)
    }
}
console.log(await UpdatePost(1));
  
async function PatchPost(id) {  
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: 'foo',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });
            const data = await response.json();
            return data;
    } catch(error) {
        console.error('Hiba történt:', error)
    }
}
console.log(await PatchPost(1));
  
  async function deletePost(id) {  
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}
console.log(await deletePost(1));
