// expenses.js
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    document.getElementById('expense-form').addEventListener('submit', addExpense);
});

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const tbody = document.querySelector('#expense-table tbody');
    tbody.innerHTML = '';
    expenses.forEach((item, index) => {
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.amount}</td>
            <td>${item.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function addExpense(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({name, amount, category, date});
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
    document.getElementById('expense-form').reset();
}

function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const item = expenses[index];
    document.getElementById('name').value = item.name;
    document.getElementById('amount').value = item.amount;
    document.getElementById('category').value = item.category;
    document.getElementById('date').value = item.date;
    deleteExpense(index);
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}