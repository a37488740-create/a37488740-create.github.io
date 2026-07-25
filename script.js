// ===== Contact Form - FormSubmit AJAX Submission =====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = new FormData(contactForm);

    // Show loading state
    const submitBtn = contactForm.querySelector('input[type="submit"]');
    const originalBtnValue = submitBtn.value;
    submitBtn.value = "SENDING...";
    submitBtn.disabled = true;
    formMessage.className = "form-message";
    formMessage.style.display = "none";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.success === true || response.ok) {
        // Success
        formMessage.textContent =
          "✅ Message sent successfully! We'll get back to you soon.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";
        contactForm.reset();
      } else {
        // Error from FormSubmit
        formMessage.textContent =
          "❌ " + (data.message || "Something went wrong. Please try again.");
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
      }
    } catch (error) {
      // Network or other error
      formMessage.textContent =
        "❌ Network error. Please check your connection and try again.";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
    } finally {
      // Restore button state
      submitBtn.value = originalBtnValue;
      submitBtn.disabled = false;
    }
  });
});

// ===== Newsletter Subscribe Form - FormSubmit AJAX =====
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribeForm");
  if (!subscribeForm) return;

  const subMessage = document.getElementById("subMessage");

  subscribeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(subscribeForm);

    const submitBtn = subscribeForm.querySelector('input[type="submit"]');
    const originalBtnValue = submitBtn.value;
    submitBtn.value = "SUBSCRIBING...";
    submitBtn.disabled = true;
    subMessage.className = "form-message";
    subMessage.style.display = "none";

    try {
      const response = await fetch(subscribeForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.success === true || response.ok) {
        subMessage.textContent = "✅ Subscribed successfully! Thank you.";
        subMessage.className = "form-message success";
        subMessage.style.display = "block";
        subscribeForm.reset();
      } else {
        subMessage.textContent =
          "❌ " + (data.message || "Subscription failed. Please try again.");
        subMessage.className = "form-message error";
        subMessage.style.display = "block";
      }
    } catch (error) {
      subMessage.textContent =
        "❌ Network error. Please check your connection and try again.";
      subMessage.className = "form-message error";
      subMessage.style.display = "block";
    } finally {
      submitBtn.value = originalBtnValue;
      submitBtn.disabled = false;
    }
  });
});
