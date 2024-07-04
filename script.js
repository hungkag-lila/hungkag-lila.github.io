function closeQuest() {
    document.getElementById('questBox').style.display = 'none';
}

function closeAttributes() {
    document.getElementById('attributeBox').style.display = 'none';
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function increment(goal, max, unit = '') {
    const element = document.getElementById(goal);
    let [current, total] = element.textContent.split('/').map(str => parseInt(str));
    if (current < max) {
        current++;
        element.textContent = `${current}/${total}${unit}`;
        localStorage.setItem(goal, current);
        addExperience(10);
    }
}

function loadProgress() {
    const goals = ['pushUps', 'sitUps', 'squats', 'run'];
    goals.forEach(goal => {
        const savedValue = localStorage.getItem(goal);
        if (savedValue) {
            const element = document.getElementById(goal);
            const [total] = element.textContent.split('/').slice(1);
            element.textContent = `${savedValue}/${total}`;
        }
    });

    const level = localStorage.getItem('level') || 1;
    const exp = localStorage.getItem('exp') || 0;
    const expLimit = localStorage.getItem('expLimit') || 300;
    const availablePoints = localStorage.getItem('availablePoints') || 0;
    
    document.getElementById('level').textContent = level;
    document.getElementById('exp').textContent = exp;
    document.getElementById('expLimit').textContent = expLimit;
    document.getElementById('availablePoints').textContent = availablePoints;
    updateExpBar();
}

function addExperience(points) {
    let exp = parseInt(document.getElementById('exp').textContent);
    let expLimit = parseInt(document.getElementById('expLimit').textContent);
    let level = parseInt(document.getElementById('level').textContent);
    let availablePoints = parseInt(document.getElementById('availablePoints').textContent);
    exp += points;
    if (exp >= expLimit) {
        exp -= expLimit;
        level++;
        expLimit = Math.floor(expLimit * 1.15);
        availablePoints += 2;
        // Increase all attributes by 5
        ['strength', 'agility', 'perception', 'vitality', 'intelligence'].forEach(attribute => {
            let value = parseInt(document.getElementById(attribute).textContent);
            value += 5;
            document.getElementById(attribute).textContent = value;
            localStorage.setItem(attribute, value);
        });
    }
    document.getElementById('exp').textContent = exp;
    document.getElementById('expLimit').textContent = expLimit;
    document.getElementById('level').textContent = level;
    document.getElementById('availablePoints').textContent = availablePoints;
    localStorage.setItem('exp', exp);
    localStorage.setItem('expLimit', expLimit);
    localStorage.setItem('level', level);
    localStorage.setItem('availablePoints', availablePoints);
    updateExpBar();
}
function updateExpBar() {
    const exp = parseInt(document.getElementById('exp').textContent);
    const expLimit = parseInt(document.getElementById('expLimit').textContent);
    const progress = (exp / expLimit) * 100;
    document.getElementById('expProgress').style.width = progress + '%';
}
function incrementAttribute(attribute) {
    let availablePoints = parseInt(document.getElementById('availablePoints').textContent);
    if (availablePoints > 0) {
        let value = parseInt(document.getElementById(attribute).textContent);
        value++;
        availablePoints--;
        document.getElementById(attribute).textContent = value;
        document.getElementById('availablePoints').textContent = availablePoints;
        localStorage.setItem(attribute, value);
        localStorage.setItem('availablePoints', availablePoints);
    }
}

function updateTime() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById('timer').textContent = `Time until midnight: ${hours}h ${minutes}m ${seconds}s`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    makeDraggable(document.getElementById('questBox'));
    makeDraggable(document.getElementById('attributeBox'));
    setInterval(updateTime, 1000);
        setInterval(updateTime, 1000);
        loadProgress();
    });
