const API_URL = 'https://your-heroku-app.herokuapp.com';

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
}

function showRegistrationForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert("Logged in successfully!");
        console.log("Token:", result.token);
    } else {
        alert(result.error);
    }
}

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (username === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert("Registered successfully!");
        showLoginForm();
    } else {
        alert(result.error);
    }
}
