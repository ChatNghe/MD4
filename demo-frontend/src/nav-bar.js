showNav()
function showNav() {
    let token = localStorage.getItem('token');
    if(token){
        $('#nav').html(`
    <button onclick="showFormAdd()">Add</button>
    <button onclick="showHome()">Home</button>
    <button onclick="logOut()">Log Out</button>
    `)
    } else {
        $('#nav').html(`
    <button onclick="showFormLogin()">Login</button>
    <button onclick="showFormRegister()">Register</button>
    `)
    }
}