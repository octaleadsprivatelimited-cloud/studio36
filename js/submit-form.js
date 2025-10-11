$(function () {
    'use strict';

    // Cache DOM elements for better performance
    const forms = $('.needs-validation');

    forms.each(function () {
        const form = $(this);
        const submitForm = form.find('.submit_form');
        const subscribeButton = form.find('.btn_submit-subscribe');
        const successMsg = $('.success_msg');
        const errorMsg = $('.error_msg');
        const actionInput = form.find("input[name='action']");
        const successMsgSubscribe = $('.success_msg_subscribe');

        form.on('submit', function (event) {
            if (!form[0].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.addClass('was-validated');
                return; // Exit early if the form is not valid
            }

            // For Formspree forms, allow default submission
            const formAction = form.attr('action');
            if (formAction && formAction.includes('formspree.io')) {
                submitForm.html('Sending...');
                subscribeButton.html('Sending...');
                // Let the form submit naturally to Formspree
                return true;
            }

            // For other forms (PHP), use AJAX
            event.preventDefault();
            event.stopPropagation();

            submitForm.html('Sending...');
            subscribeButton.html('Sending...');

            const toast = new bootstrap.Toast(successMsg[0]);
            const errtoast = new bootstrap.Toast(errorMsg[0]);

            const formData = form.serialize();

            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
                            subscribeButton.html('SUBSCRIBE');
                            const toastSubscribe = new bootstrap.Toast(successMsgSubscribe[0]);
                            toastSubscribe.show();
                        } else {
                            toast.show();
                            submitForm.html('Send Message');
                        }
                    } else {
                        errtoast.show();
                        submitForm.html('Send Message');
                        subscribeButton.html('SUBSCRIBE');
                    }
                }
            });

            form.addClass('was-validated');
        });
    });
});

