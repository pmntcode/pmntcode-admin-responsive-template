"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var sidebarToggle = document.querySelector('.template-header > .sidebar-toggle');
    sidebarToggle === null || sidebarToggle === void 0 ? void 0 : sidebarToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var templateContentContainer = document.querySelector('.template-content-container');
        if (templateContentContainer) {
            templateContentContainer.classList.toggle('sidebar-active');
        }
    });
});
