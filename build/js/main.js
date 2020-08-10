'use strict';
function FormFieldValidation(value) {
    const NAME_REGEXP = /^[a-zа-яё\s]+$/iu;
    const PHONE_REGEXP = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/iu;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    
    this.validateName = function(value) {
        return NAME_REGEXP.test(value);
    }

    this.validatePhone = function(value) {
        return PHONE_REGEXP.test(value);
    }

    this.validateEmail = function(value) {
        return EMAIL_REGEXP.test(value);
    }
}

function createErrorMessageEl(targetEl, message) {
    if (targetEl.parentElement.getElementsByClassName('error-message').length < 1) {
        let el = document.createElement('span');
        
        el.classList.add('error-message');
        el.insertAdjacentText('afterbegin', message);

        targetEl.parentElement.appendChild(el);
    }
}

function removeErrorMessageEl(targetEl) {
    if (targetEl.parentElement.getElementsByClassName('error-message').length !== 0) {
        targetEl.parentElement.querySelector('.error-message').remove();
    }
}

function enableSubmitBtn(btn, bool) {
    if (bool) {
        btn.removeAttribute('disabled');
    }
}

function checkDisabledState(btn, valid){
    valid ? btn.removeAttribute("disabled") : btn.setAttribute("disabled","disabled");
}

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
