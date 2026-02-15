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


const categoryIcons = {
    student: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M14.2172 3.49965C12.7962 2.83345 11.2037 2.83345 9.78272 3.49965L3.0916 6.63659C2.0156 7.14105 1.73507 8.56352 2.25 9.54666L2.25 14.5C2.25 14.9142 2.58579 15.25 3 15.25C3.41421 15.25 3.75 14.9142 3.75 14.5V10.672L9.78281 13.5003C11.2038 14.1665 12.7963 14.1665 14.2173 13.5003L20.9084 10.3634C22.3639 9.68105 22.3639 7.31899 20.9084 6.63664L14.2172 3.49965Z" fill="#685870"/>
      <path d="M5 12.9147V16.6254C5 17.6334 5.5035 18.5772 6.38533 19.0656C7.8537 19.8787 10.204 21 12 21C13.796 21 16.1463 19.8787 17.6147 19.0656C18.4965 18.5772 19 17.6334 19 16.6254V12.9148L14.854 14.8585C13.0296 15.7138 10.9705 15.7138 9.14607 14.8585L5 12.9147Z" fill="#685870"/>
    </svg>
  `,

    education: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5894 5.03785 10.9159 5.15048 11.2502 5.21397V20.3926C10.9472 20.3258 10.6516 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436ZM5.18208 8.27239C4.78023 8.17193 4.37303 8.41625 4.27257 8.8181C4.17211 9.21994 4.41643 9.62715 4.81828 9.72761L8.81828 10.7276C9.22012 10.8281 9.62732 10.5837 9.72778 10.1819C9.82825 9.78006 9.58393 9.37285 9.18208 9.27239L5.18208 8.27239ZM5.18208 12.2724C4.78023 12.1719 4.37303 12.4163 4.27257 12.8181C4.17211 13.2199 4.41643 13.6271 4.81828 13.7276L8.81828 14.7276C9.22012 14.8281 9.62732 14.5837 9.72778 14.1819C9.82825 13.7801 9.58393 13.3729 9.18208 13.2724L5.18208 12.2724Z" fill="#685870"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7502 20.3925C13.0531 20.3257 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97142 13.0709 5.0953 12.7502 5.17387V20.3925ZM19.1821 9.72761C19.5839 9.62715 19.8282 9.21994 19.7278 8.8181C19.6273 8.41625 19.2201 8.17193 18.8183 8.27239L14.8183 9.27239C14.4164 9.37285 14.1721 9.78006 14.2726 10.1819C14.373 10.5837 14.7802 10.8281 15.1821 10.7276L19.1821 9.72761ZM19.1821 13.7276C19.5839 13.6271 19.8282 13.2199 19.7278 12.8181C19.6273 12.4163 19.2201 12.1719 18.8183 12.2724L14.8183 13.2724C14.4164 13.3729 14.1721 13.7801 14.2726 14.1819C14.373 14.5837 14.7802 14.8281 15.1821 14.7276L19.1821 13.7276Z" fill="#685870"/>
    </svg>
  `
};

const services = [
    {
        categoryKey: "student",
        category: "دانشجویی",
        title: "صدور گواهی اشتغال به تحصیل برای داخل کشور",
        time: "۳ تا ۴ هفته",
        price: "۵۰٬۰۰۰ تومان"
    },
    {
        categoryKey: "education",
        category: "تحصیلی",
        title: "صدور گواهی اشتغال به تحصیل برای خارج کشور",
        time: "۲ هفته",
        price: "۸۰٬۰۰۰ تومان"
    },
    {
        categoryKey: "student",
        category: "دانشجویی",
        title: "ترجمه رسمی مدارک",
        time: "۱ هفته",
        price: "۱۲۰٬۰۰۰ تومان"
    },
    {
        categoryKey: "education",
        category: "تحصیلی",
        title: "صدور گواهی اشتغال به تحصیل برای خارج کشور",
        time: "۲ هفته",
        price: "۸۰٬۰۰۰ تومان"
    },
    {
        categoryKey: "student",
        category: "دانشجویی",
        title: "ترجمه رسمی مدارک",
        time: "۱ هفته",
        price: "۱۲۰٬۰۰۰ تومان"
    }
];

function createServiceCard(service) {
    return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="service-card">

        <div class="service-card-category">
          <span class="category-icon">
            ${categoryIcons[service.categoryKey]}
          </span>

          <span class="category-line"></span>
          <span class="category-title">${service.category}</span>
          <span class="category-line"></span>
        </div>

        <div class="service-card-content">
          <h2 class="service-title">
            ${service.title}
          </h2>

          <div class="service-card-footer">
            <ul class="service-meta">
              <li>
                <span class="meta-label">زمان پردازش:</span>
                <span class="meta-value">${service.time}</span>
              </li>
              <li>
                <span class="meta-label">هزینه خدمت:</span>
                <span class="meta-value">${service.price}</span>
              </li>
            </ul>

            <div class="service-actions">
              <button class="btn-secondary">مشاهده جزئیات</button>
              <button class="btn-primary">ثبت درخواست</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;
}

const row = document.getElementById("services-row");

services.forEach(service => {
    row.innerHTML += createServiceCard(service);
});
