// income.js
document.addEventListener('DOMContentLoaded', function() {
    loadIncome();
    document.getElementById('income-form').addEventListener('submit', addIncome);
});

function loadIncome() {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    const tbody = document.querySelector('#income-table tbody');
    tbody.innerHTML = '';
    income.forEach((item, index) => {
        const row = `<tr>
            <td>${item.source}</td>
            <td>${item.amount}</td>
            <td>${item.date}</td>
            <td>${item.category}</td>
            <td>
                <button onclick="editIncome(${index})">Edit</button>
                <button onclick="deleteIncome(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function addIncome(e) {
    e.preventDefault();
    const source = document.getElementById('source').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const income = JSON.parse(localStorage.getItem('income')) || [];
    income.push({source, amount, date, category});
    localStorage.setItem('income', JSON.stringify(income));
    loadIncome();
    document.getElementById('income-form').reset();
}

function editIncome(index) {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    const item = income[index];
    document.getElementById('source').value = item.source;
    document.getElementById('amount').value = item.amount;
    document.getElementById('date').value = item.date;
    document.getElementById('category').value = item.category;
    // For simplicity, remove and add new
    deleteIncome(index);
}

function deleteIncome(index) {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    income.splice(index, 1);
    localStorage.setItem('income', JSON.stringify(income));
    loadIncome();
}