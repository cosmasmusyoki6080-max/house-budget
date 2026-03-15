// reports.js
document.addEventListener('DOMContentLoaded', function() {
    populateMonths();
    loadReports();
    document.getElementById('month-select').addEventListener('change', loadReports);
    document.getElementById('year-select').addEventListener('change', loadReports);
});

function populateMonths() {
    const select = document.getElementById('month-select');
    const now = new Date();
    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const option = document.createElement('option');
        option.value = date.toISOString().slice(0, 7); // YYYY-MM
        option.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        select.appendChild(option);
    }
}

function loadReports() {
    const month = document.getElementById('month-select').value;
    const year = document.getElementById('year-select').value;

    const income = JSON.parse(localStorage.getItem('income')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    let filteredIncome, filteredExpenses;
    if (month !== 'current') {
        filteredIncome = income.filter(i => i.date.startsWith(month));
        filteredExpenses = expenses.filter(e => e.date.startsWith(month));
    } else {
        const currentMonth = new Date().toISOString().slice(0, 7);
        filteredIncome = income.filter(i => i.date.startsWith(currentMonth));
        filteredExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
    }

    const totalIncome = filteredIncome.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

    const categories = {};
    filteredExpenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + parseFloat(e.amount);
    });
    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, '');

    document.getElementById('monthly-report').innerHTML = `
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Savings Rate: ${savingsRate}%</p>
        <p>Top Spending Category: ${topCategory}</p>
    `;

    // Yearly similar, but for year
    const currentYear = new Date().getFullYear().toString();
    const yearlyIncome = income.filter(i => i.date.startsWith(currentYear)).reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const yearlyExpenses = expenses.filter(e => e.date.startsWith(currentYear)).reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const yearlySavingsRate = yearlyIncome > 0 ? ((yearlyIncome - yearlyExpenses) / yearlyIncome * 100).toFixed(1) : 0;

    document.getElementById('yearly-report').innerHTML = `
        <p>Total Income: ${yearlyIncome.toFixed(2)}</p>
        <p>Total Expenses: ${yearlyExpenses.toFixed(2)}</p>
        <p>Savings Rate: ${yearlySavingsRate}%</p>
    `;
}