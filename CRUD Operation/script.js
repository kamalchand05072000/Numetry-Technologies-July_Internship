document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let isNewUser = true;
    users.forEach((user, index) => {
        if (user.username === username) {
            isNewUser = false;
            user.fullName = fullName;
            user.email = email;
            user.mobile = mobile;
            user.password = password;
            users[index] = user;
        }
    });

    if (isNewUser) {
        users.push({ fullName, email, mobile, username, password });
    }

    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();
    if (isNewUser) {
        document.getElementById('successMessage').textContent = "Registration successful!";
    } else {
        document.getElementById('successMessage').textContent = "Update successful!";
    }
    document.getElementById('submitButton').style.display = 'inline-block';
    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('registrationForm').reset();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach(function(user, index) {
        let row = document.createElement('tr');
        let fullNameCell = document.createElement('td');
        let emailCell = document.createElement('td');
        let mobileCell = document.createElement('td');
        let usernameCell = document.createElement('td');
        let actionCell = document.createElement('td');

        fullNameCell.textContent = user.fullName;
        emailCell.textContent = user.email;
        mobileCell.textContent = user.mobile;
        usernameCell.textContent = user.username;

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editUser(index);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteUser(index);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(fullNameCell);
        row.appendChild(emailCell);
        row.appendChild(mobileCell);
        row.appendChild(usernameCell);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users[index];

    document.getElementById('fullName').value = user.fullName;
    document.getElementById('email').value = user.email;
    document.getElementById('mobile').value = user.mobile;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;

    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('updateButton').style.display = 'inline-block';

    document.getElementById('updateButton').onclick = function() {
        user.fullName = document.getElementById('fullName').value;
        user.email = document.getElementById('email').value;
        user.mobile = document.getElementById('mobile').value;
        user.username = document.getElementById('username').value;
        user.password = document.getElementById('password').value;

        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();

        document.getElementById('successMessage').textContent = "Update successful!";
        document.getElementById('registrationForm').reset();
        document.getElementById('submitButton').style.display = 'inline-block';
        document.getElementById('updateButton').style.display = 'none';
    };
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

document.addEventListener('DOMContentLoaded', displayUsers);
