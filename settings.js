// settings.js
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    document.getElementById('currency').addEventListener('change', saveCurrency);
    document.getElementById('dark-mode').addEventListener('change', toggleDarkMode);
    document.getElementById('export-data').addEventListener('click', exportData);
    document.getElementById('reset-data').addEventListener('click', resetData);
});

function loadSettings() {
    const currency = localStorage.getItem('currency') || 'KES';
    document.getElementById('currency').value = currency;
    const darkMode = localStorage.getItem('darkMode') !== 'false'; // Default to true
    document.getElementById('dark-mode').checked = darkMode;
    if (darkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

function saveCurrency() {
    const currency = document.getElementById('currency').value;
    localStorage.setItem('currency', currency);
    // Update displays if needed, but for simplicity, assume static
}

function toggleDarkMode() {
    const darkMode = document.getElementById('dark-mode').checked;
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

function exportData() {
    const data = {
        income: JSON.parse(localStorage.getItem('income')) || [],
        expenses: JSON.parse(localStorage.getItem('expenses')) || [],
        budgets: JSON.parse(localStorage.getItem('budgets')) || [],
        savings: JSON.parse(localStorage.getItem('savings')) || [],
        debts: JSON.parse(localStorage.getItem('debts')) || [],
        investments: JSON.parse(localStorage.getItem('investments')) || []
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance-data.json';
    a.click();
}

function resetData() {
    if (confirm('Are you sure you want to reset all data?')) {
        localStorage.clear();
        location.reload();
    }
}