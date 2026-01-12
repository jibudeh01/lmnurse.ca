// Track which step we are on
let currentStep = 0;
const steps = document.querySelectorAll(".form-step");

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

showStep(currentStep);

// Convert file to Base64
const fileToBase64 = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });

// Submit application (AXIOS)
async function submitApplication() {
  try {
    const resumeFile = document.getElementById("resume").files[0];
    const certFiles = [...document.getElementById("certs").files];

    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      role: document.getElementById("role").value,
      availability: [...document.getElementById("availability").selectedOptions].map(o => o.value),
      eligibility: document.getElementById("eligibility").value,
      experience: document.getElementById("experience").value,

      resume: resumeFile ? {
        name: resumeFile.name,
        mimeType: resumeFile.type,
        data: await fileToBase64(resumeFile)
      } : null,

      certificates: await Promise.all(
        certFiles.map(async f => ({
          name: f.name,
          mimeType: f.type,
          data: await fileToBase64(f)
        }))
      )
    };

    const response = await axios.post(
      // "http://localhost:2080/nurse/carer/apply",
      "https://server.lmnurse.ca/nurse/carer/apply",
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 60000 // optional (60s)
      }
    );

    if (response.data.status === "success") {
      alert("Application submitted successfully!");
      window.location.href = "confirmation.html?id=" + response.data.applicantId;
    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (error) {
    console.error("Submission error:", error);

    alert(
      error.response?.data?.message ||
      "Unable to submit application. Please try again later."
    );
  }
}
