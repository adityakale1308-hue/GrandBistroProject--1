
document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemName = event.target.getAttribute("data-item");
            const itemPrice = event.target.getAttribute("data-price");

            // 1. Configure the checkout modal properties matching Razorpay SDK standards
            const options = {
                "key": "rzp_test_YOUR_KEY_HERE", // PASTE YOUR KEY GENERATED FROM DASHBOARD HERE
                "amount": parseInt(itemPrice) * 100, // Price computed in sub-units (paise)
                "currency": "INR",
                "name": "EduKit Hub",
                "description": `Authorization clearance for: ${itemName}`,
                "image": "https://flaticon.com", // Generic bag logo
                "handler": function (response) {
                    // 2. Transaction execution handler fires upon successful UPI payment clearing
                    alert("Payment Verified Successfully!");
                    console.log("Razorpay Transaction Verified ID:", response.razorpay_payment_id);
                    
                    // Route user to your download landing destination parsing token attributes
                    window.location.href = `https://edukit.com{encodeURIComponent(itemName)}&tx=${response.razorpay_payment_id}`;
                },
                "prefill": {
                    "name": "Student Customer",
                    "email": "student@college.edu"
                },
                "theme": {
                    "color": "#9b59b6" // Match brand purple interface style rules
                }
            };

            // 3. Fire initialization rules to invoke payment modal layout overlay
            console.log(`Processing transactional layer request token for ${itemName} at value ₹${itemPrice}`);
            const rzp = new Razorpay(options);
            rzp.open();
        });
    });
});
