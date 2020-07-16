const validator = () => {
    document.addEventListener('input', (event) => {
        const target = event.target,
            inputText = target.closest('input[name="user_name"], input[name="user_message"]'),
            inputPhone = target.closest('input[name="user_phone"]');

        if(inputText) {
            inputText.value = inputText.value.replace(/[^а-яё\s]/gi, '');
        }

        if(inputPhone) {
            inputPhone.value = inputPhone.value.replace(/^[^+\d]*(\+|\d)|\D/g, '$1');
        }
    });
};

export default validator;