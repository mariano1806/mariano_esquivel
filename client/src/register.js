import "./style.css";

const $form = document.getElementById("register-form");

const sendRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      confirmButtonText: "Entendido",
    });

    throw error;
  }
};

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData($form);
  const entries = Object.fromEntries(formData.entries());

  try {
    const response = await sendRequest("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(entries),
    });

    const token = await response.text();
    document.cookie = `token=${token}; httpOnly`;

    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
});
