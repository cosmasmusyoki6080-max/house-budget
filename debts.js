// debts.js
document.addEventListener('DOMContentLoaded', function() {
    loadDebts();
    document.getElementById('debt-form').addEventListener('submit', addDebt);
});

function loadDebts() {
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    const tbody = document.querySelector('#debt-table tbody');
    tbody.innerHTML = '';
    debts.forEach((item, index) => {
        const balance = parseFloat(item.amount) - parseFloat(item.paid);
        const row = `<tr>
            <td>${item.creditor}</td>
            <td>${item.amount}</td>
            <td>${item.paid}</td>
            <td>${balance.toFixed(2)}</td>
            <td>
                <button onclick="addPayment(${index})">Add Payment</button>
                <button onclick="deleteDebt(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function addDebt(e) {
    e.preventDefault();
    const creditor = document.getElementById('creditor').value;
    const amount = document.getElementById('amount').value;
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    debts.push({creditor, amount, paid: 0});
    localStorage.setItem('debts', JSON.stringify(debts));
    loadDebts();
    document.getElementById('debt-form').reset();
}

function addPayment(index) {
    const payment = prompt('Enter payment amount:');
    if (payment) {
        const debts = JSON.parse(localStorage.getItem('debts')) || [];
        debts[index].paid = parseFloat(debts[index].paid) + parseFloat(payment);
        localStorage.setItem('debts', JSON.stringify(debts));
        loadDebts();
    }
}

function deleteDebt(index) {
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    debts.splice(index, 1);
    localStorage.setItem('debts', JSON.stringify(debts));
    loadDebts();
}