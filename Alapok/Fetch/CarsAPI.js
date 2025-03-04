async function main(){
    console.log(await getCarsAsync());
    console.log(await createCarAsync());
    console.log(await updateCarAsync(1));
    console.log(await getCarsByIdAsync(1));
    console.log(await deleteCarAsync(1));
    
}
main();

async function getCarsAsync() {
    try{
        const response = await fetch('https://surveys-5jvt.onrender.com/api/cars', {
            method: "GET"
            })
        const json = await response.json();
        return json;
    }
    catch(err){
        console.log(err);
    }
}

async function getCarsByIdAsync(id) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`, {
                        method: "GET"
                        })
        const json = await response.json();
        return json;
    }
    catch(err){
        console.log(err);
    }
}


async function createCarAsync() {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars`, {
            method: "POST",
            body: {
                "model": "Model neve",
                "brand": "Autómárka",
                "year": 2024,
            }
        })
        const json = await response.json();
        return json;
    }
    catch(err){
        console.log(err);
    }
}


async function updateCarAsync(id) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`, {
            method: "PUT",
            body: {
                "model": "Model neve",
                "brand": "Autómárka",
                "year": 2024,
            }
        })
        const json = await response.json();
        return json;
    }
    catch(err){
        console.log(err);
    }
}

async function deleteCarAsync(id) {
    try{
        const response = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`, {
            method: "DELETE",
        })
        const json = await response.json();
        return json;
    }
    catch(err){
        console.log(err);
    }
}


