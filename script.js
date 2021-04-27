const strengthMeter = document.getElementById('lock--image');
const passwordInput = document.getElementById('check-row--input');
const percentage = document.getElementById('results--percentage');
const reasonsBox = document.getElementById('results--commentary');
const checkButton = document.querySelector('.check-row--button-check');
const hideButton = document.querySelector('.check-row--button-hide');


function analyseStrength(password) {
    const problems = [];
    problems.push(lengthProblems(password));
    problems.push(lowerCaseProblems(password));
    problems.push(upperCaseProblems(password));
    problems.push(numberProblems(password));
    problems.push(otherProblems(password));
    problems.push(repeatSymbolsProblem(password));
    return problems;
}

function decreaseOpacity() {

    if (passwordInput.type == 'password') {
        passwordInput.type = 'string';
    }

    const problems = analyseStrength(passwordInput.value);
    console.log(problems);

    let strength = 100;
    problems.forEach(problem => {

        if (problem == null) return;
        strength -= problem.damage;
        const warning = document.createElement('div');
        warning.innerText = problem.comment;
        reasonsBox.appendChild(warning);


    });
    strengthMeter.style.setProperty('--strength', strength);
    percentage.innerText = `${strength}%`;
    if (strength == 100) {
        reasonsBox.innerText = `You've made it!`
    }


}

function lengthProblems(password) {
    const length = password.length;

    if (length <= 5) {
        return {
            comment: "You definetely must make it longer",
            damage: 50
        };
    } else if (length <= 8) {
        return {
            comment: "It is recommended to make it longer",
            damage: 25
        };
    } else if (length <= 12) {
        return {
            comment: "Almost there, but make it longer",
            damage: 15
        };
    } else {
        return {
            comment: '',
            damage: 0
        };
    }
}

function lowerCaseProblems(password) {
    return typeProblems(password, /[a-z]/g, 'lowercase letters');
}

function upperCaseProblems(password) {
    return typeProblems(password, /[A-Z]/g, 'uppercase letters');
}

function numberProblems(password) {
    return typeProblems(password, /[0-9]/g, 'numbers');
}

function otherProblems(password) {
    return typeProblems(password, /[^a-zA-Z0-9\s]/g, 'special symbols');
}

function typeProblems(password, regEx, type) {
    let matches = password.match(regEx) || [];
    let firstGates = 8;
    let secondGates = 5;

    if (password.length > 12) {
        firstGates = 12;
        secondGates = 9;
    };

    if (matches.length === 0) {
        return {
            comment: `You definetely must use some ${type}`,
            damage: 20
        };
    }
    if (matches.length < (password.length) / firstGates) {
        return {
            comment: `You should use more ${type}`,
            damage: 10
        };
    }
    if (matches.length < (password.length) / secondGates) {
        return {
            comment: `Almost there with ${type}`,
            damage: 5
        };
    }
}

function repeatSymbolsProblem(password) {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
        return {
            comment: 'Your password has repeat symbols',
            damage: matches.length * 5

        }
    }
}

checkButton.addEventListener('click', () => {
    reasonsBox.innerText = '';
});

checkButton.addEventListener('click', decreaseOpacity);

hideButton.addEventListener('click', () => {
    if (passwordInput.type === "text") {
        passwordInput.type = "password";
    } else {
        passwordInput.type = "text";
    }
});