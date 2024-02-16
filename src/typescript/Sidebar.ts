document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.querySelector<HTMLElement>('.template-header > .sidebar-toggle');
    sidebarToggle?.addEventListener('click', function (event) {
      event.preventDefault();
      const templateContentContainer = document.querySelector<HTMLElement>('.template-content-container');
      if (templateContentContainer) {
          templateContentContainer.classList.toggle('sidebar-active');
      }
    });
});
