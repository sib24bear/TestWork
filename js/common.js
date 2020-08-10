'use strict';

let inputName = document.getElementById('userName'),
    inputPhone = document.getElementById('userPhone'),
    inputEmail = document.getElementById('userEmail'),
    inputLabels = document.querySelectorAll('.form-field__label'),
    checkbox = document.querySelector('.checkbox'),
    submitBtn = document.querySelector('.submit-btn'),
    signUpForm = document.getElementById('signUpForm'),
    errorMessage;

const checkInput = new FormFieldValidation();

signUpForm.addEventListener( 'submit', function(e){
    e.preventDefault();
    if (successValidation()){
        // signUpForm.action = '';
        // signUpForm.method = 'POST';
        // signUpForm.submit();
        
        inputName.value = '';
        inputPhone.value = '';
        inputEmail.value = '';
        inputName.classList.remove('success');
        inputPhone.classList.remove('success');
        inputEmail.classList.remove('success');

        Array.from(inputLabels).forEach(item => {
            item.classList.remove('reduce')
        });
    } else {
        submitBtn.setAttribute("disabled","disabled");
    }
});

checkbox.addEventListener( 'click', function(e){
    e.target.toggleAttribute('checked');
    checkDisabledState(submitBtn, successValidation());
});

inputName.addEventListener( 'keyup', function(e){
    e.target.parentElement.querySelector('.form-field__label').classList.add('reduce');

    if (e.target.value !== '') {
        e.target.classList.remove('error');
        e.target.classList.add('success');
        removeErrorMessageEl(e.target);

        if (checkInput.validateName(e.target.value)) {
            e.target.classList.remove('error');
            e.target.classList.add('success');
            removeErrorMessageEl(e.target);
            e.target.setAttribute("aria-required", "true");
            checkDisabledState(submitBtn, successValidation());
        } else {
            errorMessage = 'Пожалуйста, проверьте имя';
            e.target.classList.remove('success');
            e.target.classList.add('error');
            createErrorMessageEl(e.target, errorMessage);
            e.target.removeAttribute("aria-required");
        }
    } else {
        errorMessage = 'Это обязательное поле';
        e.target.classList.remove('success');
        e.target.classList.add('error');
        createErrorMessageEl(e.target, errorMessage);
        e.target.removeAttribute( "aria-required");
    }
});

inputPhone.addEventListener( 'keyup', function(e){
    e.target.parentElement.querySelector('.form-field__label').classList.add('reduce');

    if (e.target.value !== '') {
        e.target.classList.remove('error');
        e.target.classList.add('success');
        removeErrorMessageEl(e.target);

        if (checkInput.validatePhone(e.target.value)) {
            e.target.classList.remove('error');
            e.target.classList.add('success');
            removeErrorMessageEl(e.target);
            e.target.setAttribute("aria-required", "true");
            checkDisabledState(submitBtn, successValidation());
        } else {
            errorMessage = 'Пожалуйста, проверьте номер телефона';
            e.target.classList.remove('success');
            e.target.classList.add('error');
            createErrorMessageEl(e.target, errorMessage);
            e.target.removeAttribute("aria-required");
        }
    } else {
        errorMessage = 'Это обязательное поле';
        e.target.classList.remove('success');
        e.target.classList.add('error');
        createErrorMessageEl(e.target, errorMessage);
        e.target.removeAttribute("aria-required");
    }
});

inputEmail.addEventListener( 'keyup', function(e){
    e.target.parentElement.querySelector('.form-field__label').classList.add('reduce');

    if (e.target.value !== '') {
        e.target.classList.remove('error');
        e.target.classList.add('success');
        removeErrorMessageEl(e.target);

        if (checkInput.validateEmail(e.target.value)) {
            e.target.classList.remove('error');
            e.target.classList.add('success');
            removeErrorMessageEl(e.target);
            e.target.setAttribute( "aria-required", "true");
            checkDisabledState(submitBtn, successValidation());
        } else {
            errorMessage = 'Пожалуйста, проверьте Email';
            e.target.classList.remove('success');
            e.target.classList.add('error');
            createErrorMessageEl(e.target, errorMessage);
            e.target.removeAttribute("aria-required");
        }
    } else {
        errorMessage = 'Это обязательное поле';
        e.target.classList.remove('success');
        e.target.classList.add('error');
        createErrorMessageEl(e.target, errorMessage);
        e.target.removeAttribute("aria-required");
    }
});

function successValidation() {
    return inputName.hasAttribute("aria-required") && inputName.classList.contains('success')
    && inputPhone.hasAttribute("aria-required") && inputPhone.classList.contains('success')
    && inputEmail.hasAttribute("aria-required") && inputEmail.classList.contains('success')
    && checkbox.hasAttribute('checked');
}
