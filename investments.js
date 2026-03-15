// investments.js
document.addEventListener('DOMContentLoaded', function() {
    loadInvestments();
    document.getElementById('investment-form').addEventListener('submit', addInvestment);
});

function loadInvestments() {
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    const tbody = document.querySelector('#investment-table tbody');
    tbody.innerHTML = '';
    investments.forEach((item, index) => {
        const profitLoss = parseFloat(item.current) - parseFloat(item.amount);
        const row = `<tr>
            <td>${item.investment}</td>
            <td>${item.amount}</td>
            <td>${profitLoss.toFixed(2)}</td>
            <td>
                <button onclick="editInvestment(${index})">Edit</button>
                <button onclick="deleteInvestment(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function addInvestment(e) {
    e.preventDefault();
    const investment = document.getElementById('investment').value;
    const amount = document.getElementById('amount').value;
    const current = document.getElementById('current').value;
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    investments.push({investment, amount, current});
    localStorage.setItem('investments', JSON.stringify(investments));
    loadInvestments();
    document.getElementById('investment-form').reset();
}

function editInvestment(index) {
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    const item = investments[index];
    document.getElementById('investment').value = item.investment;
    document.getElementById('amount').value = item.amount;
    document.getElementById('current').value = item.current;
    deleteInvestment(index);
}

function deleteInvestment(index) {
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    investments.splice(index, 1);
    localStorage.setItem('investments', JSON.stringify(investments));
    loadInvestments();
}