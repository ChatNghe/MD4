function showHome() {
    let token = localStorage.getItem('token');
    if (token) {
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

}

function showList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
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

function showFormLogin() {
    $('#body').html(`
<input type="text" id="username" placeholder="username">
<input type="text" id="password" placeholder="password">
<button onclick="login()">confirm</button>`)
}

function login() {
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/auth/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),
        success: (token) => {
            localStorage.setItem('token', token)
            showHome();
            showNav();
        }
    })
}

function showFormRegister() {
    $('#body').html(`
<input type="text" id="username" placeholder="username">
<input type="text" id="password" placeholder="password">
<button onclick="register()">confirm</button>`)
}

function register() {
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/auth/register',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),
        success: () => {
            showFormLogin()
        }
    })
}

function logOut() {
    localStorage.clear()
    showNav()
}

function showFind(value) {
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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

function showFormAdd() {
    let token = localStorage.getItem('token');
    if (token) {
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
                Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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
            Authorization: 'Bearer ' + localStorage.getItem('token')
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