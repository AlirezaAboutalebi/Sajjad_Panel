document.addEventListener('click', (e) => {
    const item = e.target.closest('.cartable-dropdown-menu .dropdown-item');
    if (!item) return;

    const dropdown = item.closest('.cartable-dropdown');
    dropdown.querySelector('.dropdown-text').textContent =
        item.textContent.trim();

    dropdown.querySelector('input[type="hidden"]').value =
        item.dataset.value;
});



/* =======================================================
   Cartable Filter – Horizontal Scroll with Mouse Wheel
   ======================================================= */

const filterList = document.querySelector('.cartable-filter-list');

if (filterList) {
    filterList.addEventListener('wheel', (e) => {
        // اگر واقعاً اسکرول افقی لازم نیست، کاری نکن
        if (filterList.scrollWidth <= filterList.clientWidth) return;

        // Wheel عمودی → اسکرول افقی
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            filterList.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}

