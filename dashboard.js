// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

function loadDashboard() {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const savings = JSON.parse(localStorage.getItem('savings')) || [];
    const investments = JSON.parse(localStorage.getItem('investments')) || [];

    const totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalSavings = savings.reduce((sum, item) => sum + parseFloat(item.saved), 0);
    const totalInvestments = investments.reduce((sum, item) => sum + parseFloat(item.amount) + parseFloat(item.profitLoss), 0);
    const netBalance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = `KES ${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `KES ${totalExpenses.toFixed(2)}`;
    document.getElementById('total-savings').textContent = `KES ${totalSavings.toFixed(2)}`;
    document.getElementById('total-investments').textContent = `KES ${totalInvestments.toFixed(2)}`;
    document.getElementById('net-balance').textContent = `KES ${netBalance.toFixed(2)}`;

    // Expense pie chart
    const expenseCategories = {};
    expenses.forEach(exp => {
        expenseCategories[exp.category] = (expenseCategories[exp.category] || 0) + parseFloat(exp.amount);
    });
    const ctxPie = document.getElementById('expense-chart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: Object.keys(expenseCategories),
            datasets: [{
                data: Object.values(expenseCategories),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        }
    });

    // Monthly spending bar chart
    const monthlyExpenses = {};
    expenses.forEach(exp => {
        const month = new Date(exp.date).getMonth() + 1;
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + parseFloat(exp.amount);
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((_, i) => monthlyExpenses[i+1] || 0);
    const ctxBar = document.getElementById('monthly-chart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: '#36A2EB'
            }]
        }
    });
}