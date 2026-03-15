// charts.js
document.addEventListener('DOMContentLoaded', function() {
    loadCharts();
});

function loadCharts() {
    const income = JSON.parse(localStorage.getItem('income')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const savings = JSON.parse(localStorage.getItem('savings')) || [];
    const investments = JSON.parse(localStorage.getItem('investments')) || [];

    // Expense pie
    const expenseCategories = {};
    expenses.forEach(exp => {
        expenseCategories[exp.category] = (expenseCategories[exp.category] || 0) + parseFloat(exp.amount);
    });
    const ctxPie = document.getElementById('expense-pie-chart').getContext('2d');
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

    // Monthly income
    const monthlyIncome = {};
    income.forEach(inc => {
        const month = new Date(inc.date).getMonth() + 1;
        monthlyIncome[month] = (monthlyIncome[month] || 0) + parseFloat(inc.amount);
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const incomeData = months.map((_, i) => monthlyIncome[i+1] || 0);
    const ctxIncome = document.getElementById('income-chart').getContext('2d');
    new Chart(ctxIncome, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Income',
                data: incomeData,
                backgroundColor: '#4BC0C0'
            }]
        }
    });

    // Savings progress - bar for each goal
    const savingsLabels = savings.map(s => s.goal);
    const savingsData = savings.map(s => (parseFloat(s.saved) / parseFloat(s.target)) * 100);
    const ctxSavings = document.getElementById('savings-chart').getContext('2d');
    new Chart(ctxSavings, {
        type: 'bar',
        data: {
            labels: savingsLabels,
            datasets: [{
                label: 'Progress %',
                data: savingsData,
                backgroundColor: '#FFCE56'
            }]
        }
    });

    // Investment growth - assume over time, but for simplicity, current values
    const investmentLabels = investments.map(i => i.investment);
    const investmentData = investments.map(i => parseFloat(i.current));
    const ctxInvestment = document.getElementById('investment-chart').getContext('2d');
    new Chart(ctxInvestment, {
        type: 'line',
        data: {
            labels: investmentLabels,
            datasets: [{
                label: 'Current Value',
                data: investmentData,
                borderColor: '#9966FF',
                fill: false
            }]
        }
    });
}