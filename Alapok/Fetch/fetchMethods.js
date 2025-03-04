
//GET
fetch('https://jsonplaceholder.typicode.com/todos/1', {
method: "GET"
})
.then(response => response.json())
.then((json) => console.log(json));


//POST
fetch('https://jsonplaceholder.typicode.com/todos', {
    method: "POST",
    body: JSON.stringify({
        userId: 1,
        title: 'New Todo',
        completed: false,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => response.json())
    .then((json) => console.log(json));

//PUT
fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: "PUT",
    body: JSON.stringify({
        id: 1,
        userId: 1,
        title: 'idk',
        completed: true,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => response.json())
    .then((json) => console.log(json));

//PATCH
fetch('https://jsonplaceholder.typicode.com/todos/2', {
    method: "PUT",
    body: JSON.stringify({
        title: 'idk2',
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => response.json())
    .then((json) => console.log(json));

//DELETE
fetch('https://jsonplaceholder.typicode.com/todos/3', {
    method: "DELETE",
});
    
