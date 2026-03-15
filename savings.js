// savings.js
document.addEventListener('DOMContentLoaded', function() {
    loadSavings();
    document.getElementById('savings-form').addEventListener('submit', addGoal);
});

function loadSavings() {
    const savings = JSON.parse(localStorage.getItem('savings')) || [];
    const container = document.getElementById('savings-list');
    container.innerHTML = '';
    savings.forEach((goal, index) => {
        const progress = (parseFloat(goal.saved) / parseFloat(goal.target)) * 100;
        const div = document.createElement('div');
        div.className = 'goal';
        div.innerHTML = `
            <h3>${goal.goal}</h3>
            <p>Target: ${goal.target}</p>
            <p>Saved: ${goal.saved}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
            <p>${progress.toFixed(1)}%</p>
            <button onclick="addSavings(${index})">Add Savings</button>
            <button onclick="deleteGoal(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function addGoal(e) {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    const target = document.getElementById('target').value;
    const savings = JSON.parse(localStorage.getItem('savings')) || [];
    savings.push({goal, target, saved: 0});
    localStorage.setItem('savings', JSON.stringify(savings));
    loadSavings();
    document.getElementById('savings-form').reset();
}

function addSavings(index) {
    const amount = prompt('Enter amount to add:');
    if (amount) {
        const savings = JSON.parse(localStorage.getItem('savings')) || [];
        savings[index].saved = parseFloat(savings[index].saved) + parseFloat(amount);
        localStorage.setItem('savings', JSON.stringify(savings));
        loadSavings();
    }
}

function deleteGoal(index) {
    const savings = JSON.parse(localStorage.getItem('savings')) || [];
    savings.splice(index, 1);
    localStorage.setItem('savings', JSON.stringify(savings));
    loadSavings();
}