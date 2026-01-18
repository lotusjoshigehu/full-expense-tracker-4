document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(async res => {
        const data = await res.json();

        if (res.status === 404) {
            alert("User not found");
            return;
        }

        if (res.status === 401) {
            alert("User not authorized");
            return;
        }

        if (res.status === 200) {
            alert("User login successful");

            localStorage.setItem("loggedIn", "true");
            window.location.href = "expense.html";
        }
    })
    .catch(err => {
        console.error(err);
    });
});

function goToSignup() {
    window.location.href = "signup.html";
}
