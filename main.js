let users = [{
    name: "User 1",
    password: "pass123",
    age: 30,
    isLogin: false,
    getMessage: [],
    sendMessage: []
},
{
    name: "User 2",
    password: "pass124",
    age: 33,
    isLogin: false,
    getMessage: [],
    sendMessage: []
},
];

let inSystem = "";

let changeInSystemUser = function (userName = "") {
    inSystem = userName;
    let h3 = document.querySelector("h3");
    inSystem ? (h3.innerText = `User: ${inSystem} in system`) : (h3.innerText = "No users in system");
};

function checkUniqUsername(username) {
    return users.some(item => item.name === username)
}

function register() {
    let username = prompt('Введите ваше имя');
    if (checkUniqUsername(username)) {
        alert('Имя занято')
        return
    }
    let password = prompt('Введите пароль');
    let confirmPassword = prompt("Подтвердите пароль")
    if (password != confirmPassword) {
        alert('Пароли не совпадают')
        return
    }
    let age = prompt('Введите ваш возраст');
    let userObj = {
        name: username,
        password: password,
        age: age,
        isLogin: false,
        getMessage: [],
        sendMessage: []
    }
    users.push(userObj)
    alert('Вы зарегистрированы')
    console.log(users)
}

function getUserObj(username) {
    return users.find(item => item.name == username)
}

function checkPassword(username, password) {
    let user = getUserObj(username);
    return user.password == password
}

function login() {
    let username = prompt('Введите ваше имя');
    if (!checkUniqUsername(username)) {
        alert('Пользоветель с таким именем не найден')
        return
    }
    let password = prompt('Введите ваш пароль');
    if (!checkPassword(username, password)) {
        alert('Пароли не совпадают')
        return
    }
    let user = getUserObj(username);
    user.isLogin = true;
    changeInSystemUser(username)
    alert('Вы вошли в аккаунт')
    console.log(users)
}

function findUserIndex(username) {
    return users.findIndex(item => item.name == username)
}

function deleteUser() {
    if (!inSystem) {
        alert('Вы не авторизованы')
        return
    }
    let password = prompt("Для удаления аккаунта подтвердите пароль");
    if (!checkPassword(inSystem, password)) {
        alert('Пароли не совпадают')
        return
    }
    let userIndex = findUserIndex(inSystem)
    users.splice(userIndex, 1)
    alert('Аккаунт удален')
    inSystem = '';
    changeInSystemUser(inSystem)
    console.log(users)
}

function update() {
    if (!inSystem) {
        alert('Вы не авторизованы')
        return
    }
    let user = getUserObj(inSystem);
    let choice = prompt('Что вы хотите изменить - имя, пароль или возраст?');
    if (choice.toLowerCase() == 'имя') {
        let newUsername = prompt('Введите новое имя');
        if (checkUniqUsername(newUsername)) {
            alert('Имя занято')
            return
        }
        user.name = newUsername;
        changeInSystemUser(newUsername)
        alert('Имя изменено')
        console.log(users)
        return
    }
    if (choice.toLowerCase() == 'пароль') {
        let oldPassword = prompt('Введите старый пароль')
        if (!checkPassword(inSystem, oldPassword)) {
            alert('Неверный старый пароль')
            return
        }
        let newPassword = prompt('Введите новый пароль');
        user.password = newPassword;
        alert('Пароль изменен')
        console.log(users)
        return
    }
    if (choice.toLowerCase() == 'возраст') {
        let newAge = prompt('Введите новый возраст');
        user.age = newAge;
        alert('Возраст изменен')
        console.log(users)
        return
    }
}


function sendMessage() {
    if (!inSystem) {
        alert('Вы не авторизованы')
        return
    }
    let usernameGetMessage = prompt('Введите имя пользователя, которому хотите отправить сообщение')
    let getUser = getUserObj(usernameGetMessage);
    let sendUser = getUserObj(inSystem);
    let messageContent = prompt('Введите сообщение');
    let messageObj = {
        id: Date.now(),
        content: messageContent,
        from: `${sendUser.name} отправил сообщение`,
        to: `${getUser.name} получил сообщение`
    }

    getUser.getMessage.push(messageObj)
    sendUser.sendMessage.push(messageObj)
    console.log(users)
    return
}


function checkIdMs(id) {
    return (users.some(item => item.sendMessage.some(item1 => item1.id === id)) || users.some(item => item.getMessage.some(item1 => item1.id === id)));
}

function checkUserIdMs(userName, id) {
    let user = getUserObj(userName);
    return (user.sendMessage.some(item => item.id === id) || user.getMessage.some(item => item.id === id));
}

function getMessageObj(userName, id) {
    let obj = getUserObj(userName);
    return (obj.sendMessage.find(item => item.id === id) || obj.getMessage.find(item => item.id === id));
}

function messageFindSent(obj1, obj2) {
    return obj1.sendMessage.some(item => item === obj2);
}
function messageFindGet(obj1, obj2) {
    return obj1.getMessage.some(item => item === obj2);
}

function deleteMessage() {
    if (!inSystem) {
        alert('Вы не авторизованы')
        return
    };
    let idMessage = +prompt("Введите Id сообщения, который  хотите удалить");
    if (!checkIdMs(idMessage)) {
        alert('Сообщение с таким Id не существует');
        return;
    }
    if (!checkUserIdMs(inSystem, idMessage)) {
        alert("Не принадлежит сообщение");
        return;
    }
    let userObj = getUserObj(inSystem);
    let messageObj = getMessageObj(inSystem, idMessage);
    console.log(messageObj);
    if (messageFindSent(userObj, messageObj)) {
        userObj.sendMessage.splice(userObj.sendMessage.indexOf(messageObj), 1);
        alert("Успешно удалено!");
    }
    else if (messageFindGet(userObj, messageObj)) {
        userObj.getMessage.splice(userObj.getMessage.indexOf(messageObj), 1);
        alert("Успешно удалено!");
    }

    console.log(users)

}
