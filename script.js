// Form validation and progress handling
const form = document.getElementById('registrationForm');
const steps = document.querySelectorAll('.form-step');
const progressLine = document.querySelector('.progress-line-fill');
const progressSteps = document.querySelectorAll('.progress-step');

// Form validation functions
function validateStep(stepNumber) {
    const currentStep = steps[stepNumber - 1];
    const inputs = currentStep.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');

        if (input.hasAttribute('required') && !input.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                formGroup.classList.add('error');
                isValid = false;
            }
        }

        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(input.value)) {
                formGroup.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

// Navigation functions
function nextStep(currentStep) {
    if (validateStep(currentStep)) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep].classList.add('active');
        updateProgress(currentStep);
    }
}

function prevStep(currentStep) {
    steps[currentStep - 1].classList.remove('active');
    steps[currentStep - 2].classList.add('active');
    updateProgress(currentStep - 2);
}

function updateProgress(step) {
    const progress = (step / (steps.length - 1)) * 100;
    progressLine.style.width = `${progress}%`;

    progressSteps.forEach((stepEl, idx) => {
        if (idx <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// Real-time validation
steps.forEach(step => {
    const inputs = step.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('error');
        });
    });
});

// Form submission handler
function submitForm(event) {
    event.preventDefault();
    
    if (!validateStep(steps.length)) {
        return;
    }

    const form = document.getElementById('registrationForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    try {
        // Let the form submit naturally to JotForm
        form.submit();
        
        // Show success message and reset form
        setTimeout(() => {
            alert('Registration submitted successfully! We will contact you soon.');
            form.reset();
            steps[steps.length - 1].classList.remove('active');
            steps[0].classList.add('active');
            updateProgress(0);
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Registration';
        }, 1500);
    } catch (error) {
        submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
        setTimeout(() => {
            alert('There was an error submitting your registration. Please try again.');
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Registration';
        }, 1500);
    }
}

// Initialize form
updateProgress(0);

// FAQ Toggle functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggleIcon = element.querySelector('span:last-child');
    
    // Toggle the answer visibility
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        toggleIcon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggleIcon.textContent = '-';
    }
}

// Initialize FAQ answers
document.addEventListener('DOMContentLoaded', () => {
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
        answer.style.maxHeight = null;
    });
});

