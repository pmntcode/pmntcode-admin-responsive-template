"use strict";
var subMenuList = document.querySelectorAll('.sidebar-menu .has-submenu > .submenu-toggle');
subMenuList.forEach(function (subMenu) {
    subMenu.addEventListener('click', function (event) {
        var _a;
        event.preventDefault();
        (_a = subMenu.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle('active');
    });
});
