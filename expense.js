/* block page if not logged in */
if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
}


fetch("http://localhost:3000/expense")
    .then(res => res.json())
    .then(data => {
        data.forEach(addRow);
    });

document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value
    };

    fetch("http://localhost:3000/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    })
    .then(() => {
        addRow(expense);
        expenseForm.reset();
    });
});

function addRow(exp) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${exp.amount}</td>
        <td>${exp.description}</td>
        <td>${exp.category}</td>
    `;
    document.getElementById("expenseTable").appendChild(row);
}
