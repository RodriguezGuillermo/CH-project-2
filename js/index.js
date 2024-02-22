document.getElementById("loginForm").addEventListener('submit',function(e){
    e.preventDefault()

    const user = document.getElementById('user').value.toLowerCase();
    const password = document.getElementById('password').value.toLowerCase();

    if(user === "admin" && password === "admin"){
        localStorage.setItem('correctLog',true);
        window.location.href = 'pages/store.html';
    }
    else{
        document.getElementById("message").innerHTML=`User not registered or not found`
    }

});

window.addEventListener('load', ()=>{
        if(localStorage.getItem('correctLog')){
            window.location.href = 'pages/store.html';
        }
    });