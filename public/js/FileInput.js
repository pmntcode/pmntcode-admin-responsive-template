"use strict";
var CustomFileInput = /** @class */ (function () {
    function CustomFileInput(inputId, namesDivId) {
        var _this = this;
        this.fileInput = document.getElementById(inputId);
        this.fileNamesDiv = document.getElementById(namesDivId);
        this.fileInput.addEventListener('change', function () { return _this.handleFileChange(); });
    }
    CustomFileInput.prototype.handleFileChange = function () {
        var _this = this;
        var files = this.fileInput.files;
        if (files) {
            this.fileNamesDiv.innerHTML = '';
            var _loop_1 = function (i) {
                var fileName = files[i].name;
                var fileDiv = document.createElement('div');
                fileDiv.classList.add('file-item');
                var fileNameSpan = document.createElement('span');
                fileNameSpan.textContent = fileName;
                var removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="pmntcode-icon pmntcode-icon--delete"></i>';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', function () { return _this.removeFile(fileDiv); });
                fileDiv.appendChild(fileNameSpan);
                fileDiv.appendChild(removeButton);
                this_1.fileNamesDiv.appendChild(fileDiv);
            };
            var this_1 = this;
            for (var i = 0; i < files.length; i++) {
                _loop_1(i);
            }
        }
    };
    CustomFileInput.prototype.removeFile = function (fileDiv) {
        fileDiv.remove();
    };
    return CustomFileInput;
}());
