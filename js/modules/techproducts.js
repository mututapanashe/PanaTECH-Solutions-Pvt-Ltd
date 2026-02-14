// techproducts.js – waitlist form handling

document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('waitlistEmail').value;

            // Here you would normally send the email to your backend.
            // For now we just show a success message.
            await Swal.fire({
                icon: 'success',
                title: 'You\'re on the list!',
                text: `We'll notify ${email} as soon as we launch.`,
                confirmButtonColor: '#C9A227',
                background: '#111',
                color: '#fff'
            });

            waitlistForm.reset();
        });
    }
});