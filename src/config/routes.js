const routes = {
    //Admin
    admin: '/admin',
    dashboard: '/admin/dashboard',
    navigationList: '/admin/navigation-list',
    addNavigation: '/admin/add-navigation',
    editNavigation: '/admin/edit-navigation/:id',
    productList: '/admin/product-list',
    addProduct: '/admin/add-product',
    editProduct: '/admin/edit-product/:id',
    newsList: '/admin/news-list',
    addNews: '/admin/add-news',
    updateNews: '/admin/update-news/:id',
    serviceList: '/admin/service-list',
    addService: '/admin/add-service',
    updateService: '/admin/update-service/:id',
    partnerList: '/admin/partner-list',
    addPartner: '/admin/add-partner',
    //User
    home: '/',
    about: '/gioi-thieu',
    introduction: '/gioi-thieu/tong-quan',
    history: '/gioi-thieu/lich-su',
    organizational: '/gioi-thieu/so-do-to-chuc',
    vision: '/gioi-thieu/tam-nhin-su-menh-gia-tri',
    capacityProfile: '/gioi-thieu/ho-so-nang-luc',
    qualityGoals: '/gioi-thieu/muc-tieu-chat-luong',
    products: '/san-pham',
    productCategory: '/san-pham/:slug',
    productDetail: '/san-pham/:category/:id',
    news: '/tin-tuc',
    newsDetail: `/tin-tuc/:category/:id`,
    newsCategory: `/tin-tuc/:slug`,
    search: '/tim-kiem',
    projects: '/du-an-va-nang-luc',
    projectCategory: '/du-an-va-nang-luc/:slug',
    projectDetail: '/du-an-va-nang-luc/:category/:id',
    services: '/dich-vu',
    serviceDetail: '/dich-vu/:category/:id',
    servicesCategory: `/dich-vu/:slug`,
    teams: '/doi-ngu',
    error404: '/404',
    contact: '/lien-he',
};

export default routes;
