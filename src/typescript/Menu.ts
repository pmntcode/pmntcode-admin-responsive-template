const subMenuList: NodeList = document.querySelectorAll('.sidebar-menu .has-submenu > .submenu-toggle');
subMenuList.forEach(subMenu => {
    subMenu.addEventListener('click', (event) => {
        event.preventDefault();
        (subMenu as HTMLElement).parentElement?.classList.toggle('active');
    });
});
