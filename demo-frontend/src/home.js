showHome();

function showList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
            'Content-Type': 'application/json',
        },
        success: (products) => {
            let html = '';
            products.map(item => {
                html += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.image}" style="height: 100px; width: 100px"></td>
                    <td>${item.nameCategory}</td>
                    <td><button onclick="remove(${item.id})">Delete</button></td>
                    <td><button onclick="showFormEdit(${item.id})">Edit</button></td>
                </tr>`
            })
            $('#tbody').html(html)
        }
    })
}
function showFind(value){
    let name = value.toLowerCase()

    $('#body').html(`<table border="1">
    <thead>
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Price</td>
        <td>Image</td>
        <td>Category</td>
        <td colspan="2">Action</td>
    </tr>
    </thead>
    <tbody id="tbody">

    </tbody>
    </table>`)

    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/search/findByName?name=${name}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success: (products) => {
            console.log(products)
            let html = '';
            products.map(item => {
                html += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><img src="${item.image}" style="height: 100px; width: 100px"></td>
                    <td>${item.nameCategory}</td>
                    <td><button onclick="remove(${item.id})">Delete</button></td>
                    <td><button onclick="showFormEdit(${item.id})">Edit</button></td>
                </tr>`
            })
            $('#tbody').html(html)
        }
    })

}

function showHome() {
    $('#body').html(`<table border="1">
    <thead>
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Price</td>
        <td>Image</td>
        <td>Category</td>
        <td colspan="2">Action</td>
    </tr>
    </thead>
    <tbody id="tbody">

    </tbody>
    </table>`)
    showList();
}

function showFormAdd() {
    $('#body').html(`
<input type="text" id="name" placeholder="name">
<input type="text" id="price" placeholder="price">
<input type="file" id="fileButton" onchange="uploadImage(event)">
<div id="imgDiv"></div>
<select id="categoryCreate">
<option selected></option>
</select>
<button onclick="add()">confirm</button>`)
    getCategoriesCreate()
}

function add() {
    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image');
    let category = $('#categoryCreate').val();
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/products',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success: () => {
            showHome()
        }
    })

}

function showFormEdit(id) {

    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        success: (products) => {
            console.log(products)
            $('#body').html(`
<input type="text" id="name" value="${products.name}">
<input type="text" id="price" value="${products.price}">
<input type="file" id="fileButton" onchange="uploadImage(event)">
<div id="imgDiv" ><img src="${products.image}" ></div>
<select id="categoryEdit">
<option selected></option>
</select>
<button onclick="update('${id}')">confirm</button>`)
        }

    })

    getCategoriesEdit()

}

function update(id) {

    let name = $('#name').val();
    let price = $('#price').val();
    let image = localStorage.getItem('image');
    let category = $('#categoryEdit').val();
    let product = {
        name: name,
        price: price,
        image: image,
        category: category
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/products/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
        success: () => {
            showHome()
        }
    })
}

function remove(id) {
    if (confirm('Are you sure?')) {

        $.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/products/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            success: () => {
                showHome()
            }
        })
    } else {

    }
}

function getCategoriesCreate() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/categories',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        },
        success: (categories) => {
            console.log(categories)
            let htmlCategories = ``;
            for (const category of categories) {
                htmlCategories += `
                    <option value=${category.id}>${category.name}</option>
                `
            }
            $('#categoryCreate').html(htmlCategories);
        }
    })

}

function getCategoriesEdit() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/categories',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        },
        success: (categories) => {
            console.log(categories)
            let htmlCategories = ``;
            for (const category of categories) {
                htmlCategories += `
                    <option value=${category.id}>${category.name}</option>
                `
            }
            $('#categoryEdit').html(htmlCategories);
        }
    })

}