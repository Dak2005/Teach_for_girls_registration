let clickCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const shareBtn = document.getElementById("shareBtn");
  const clickCountText = document.getElementById("clickCount");
  const form = document.getElementById("registrationForm");
  const successMsg = document.getElementById("successMsg");
  const submitBtn = document.getElementById("submitBtn");

  // Prevent resubmission
  if (localStorage.getItem("submitted") === "true") {
    form.style.display = "none";
    successMsg.classList.remove("hidden");
  }

  shareBtn.addEventListener("click", () => {
    if (clickCount < 5) {
      const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
      const whatsappUrl = `https://wa.me/?text=${message}`;
      window.open(whatsappUrl, "_blank");

      clickCount++;
      clickCountText.textContent = `Click count: ${clickCount}/5`;

      if (clickCount === 5) {
        clickCountText.textContent += " - Sharing complete. Please continue.";
      }
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (clickCount < 5) {
      alert("Please share on WhatsApp 5 times before submitting.");
      return;
    }

    const formData = new FormData(form);

    fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      form.reset();
      form.style.display = "none";
      successMsg.classList.remove("hidden");
      localStorage.setItem("submitted", "true");
    })
    .catch(err => console.error("Error:", err));
  });
});
