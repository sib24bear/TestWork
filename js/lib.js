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
