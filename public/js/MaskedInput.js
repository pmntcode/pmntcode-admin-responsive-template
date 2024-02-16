"use strict";
var MaskedInput = /** @class */ (function () {
    function MaskedInput(inputElement, maskPattern) {
        this.inputElement = inputElement;
        this.maskPattern = maskPattern;
        this.setupListeners();
    }
    MaskedInput.prototype.setupListeners = function () {
        this.inputElement.addEventListener('input', this.handleInput.bind(this));
        this.inputElement.addEventListener('keydown', this.handleKeyDown.bind(this));
    };
    MaskedInput.prototype.handleKeyDown = function (event) {
        if (event.key === 'Backspace') {
            this.inputElement.value = this.inputElement.value.slice(0, -1);
            event.preventDefault();
        }
    };
    MaskedInput.prototype.handleInput = function () {
        var unmaskedValue = this.inputElement.value.replace(/[^\d]/g, '');
        var maskedValue = '';
        var unmaskedIndex = 0;
        for (var i = 0; i < this.maskPattern.length; i++) {
            var patternChar = this.maskPattern[i];
            if (patternChar === '#') {
                if (unmaskedIndex < unmaskedValue.length) {
                    maskedValue += unmaskedValue[unmaskedIndex++];
                }
                else {
                    break;
                }
            }
            else {
                maskedValue += patternChar;
            }
        }
        this.inputElement.value = maskedValue;
    };
    return MaskedInput;
}());
