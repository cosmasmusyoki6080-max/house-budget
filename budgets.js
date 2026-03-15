// budgets.js
document.addEventListener('DOMContentLoaded', function() {
    loadBudgets();
    document.getElementById('budget-form').addEventListener('submit', addBudget);
});

function loadBudgets() {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const tbody = document.querySelector('#budget-table tbody');
    tbody.innerHTML = '';
    budgets.forEach((item, index) => {
        const used = expenses.filter(exp => exp.category === item.category).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        const remaining = parseFloat(item.budget) - used;
        const row = `<tr>
            <td>${item.category}</td>
            <td>${item.budget}</td>
            <td>${used.toFixed(2)}</td>
            <td>${remaining.toFixed(2)}</td>
            <td>
                <button onclick="editBudget(${index})">Edit</button>
                <button onclick="deleteBudget(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function addBudget(e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const budget = document.getElementById('budget').value;
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const existing = budgets.find(b => b.category === category);
    if (existing) {
        existing.budget = budget;
    } else {
        budgets.push({category, budget});
    }
    localStorage.setItem('budgets', JSON.stringify(budgets));
    loadBudgets();
    document.getElementById('budget-form').reset();
}

function editBudget(index) {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const item = budgets[index];
    document.getElementById('category').value = item.category;
    document.getElementById('budget').value = item.budget;
    deleteBudget(index);
}

function deleteBudget(index) {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    budgets.splice(index, 1);
    localStorage.setItem('budgets', JSON.stringify(budgets));
    loadBudgets();
}