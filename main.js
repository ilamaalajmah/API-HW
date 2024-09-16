document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', register);
});

async function register(event) {
    event.preventDefault();  

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (name.length <= 5) {
        alert('Name must be more than 5 characters');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email');
        return;
    }

    if (password.length <= 8) {
        alert('Password must be more than 8 characters');
        return;
    }

    const userData = { name, email, password };


        const response = await fetch('https://66e87333b17821a9d9dcc228.mockapi.io/HW', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registration successfully!');
            localStorage.setItem('user', JSON.stringify(result));
            localStorage.setItem('loggedIn', true);
            window.location.href = 'profile.html';  
        } else {
            alert('error. please try again!!');
        }
    } 


async function login(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

        const response=await fetch('https://66e87333b17821a9d9dcc228.mockapi.io/HW');
        const users=await response.json();

        const user=users.find(u =>u.email===email&&u.password===password);

        if (user) {
            alert('successfully logged in!');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loggedIn', true);
            window.location.href = 'profile.html';
        } else {
            alert('Info invalid');
        }
    }



function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('profile.html')) {
        if (!localStorage.getItem('loggedIn')) {
            window.location.href = 'login.html';
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            document.getElementById('username').textContent = `Welcome  ${user.name}`;
        }
    }
});

if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit',register);
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit',login);
}

if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click',logout);
}

