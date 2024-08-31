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
    recruitmentList: '/admin/recruitment-list',
    addRecruitment: '/admin/add-recruitment',
    updateRecruitment: '/admin/update-recruitment/:id',
    serviceList: '/admin/service-list',
    addService: '/admin/add-service',
    updateService: '/admin/update-service/:id',
    partnerList: '/admin/partner-list',
    addPartner: '/admin/add-partner',
    updateUser: '/admin/update-user/:id',
    changePassword: '/admin/change-password',
    userList: '/admin/user-list',
    addUser: '/admin/add-user',
    videosList: '/admin/videos-list',
    imagesList: '/admin/images-list',
    addImage: '/admin/add-image',
    addVideo: '/admin/add-video',
    messagesList: '/admin/messages-list',
    settings: '/admin/settings',
    pageList: '/admin/page-list',
    addPage: '/admin/add-page',
    updatePage: '/admin/update-page',
    categoryList: '/admin/category-list',
    addCategory: '/admin/add-category',
    updateCategory: '/admin/update-category/:id',
    //User
    home: '/',
    about: '/gioi-thieu',
    introduction: '/gioi-thieu/:slug',
    products: '/san-pham',
    productCategory: '/san-pham/:slug',
    productDetail: '/san-pham/:category/:id',
    news: '/tin-tuc',
    newsDetail: `/tin-tuc/:category/:id`,
    newsCategory: `/tin-tuc/:slug`,
    search: '/search',
    projects: '/du-an',
    projectCategory: '/du-an/:slug',
    projectDetail: '/du-an/:category/:id',
    services: '/dich-vu',
    serviceDetail: '/dich-vu/:category/:id',
    servicesCategory: `/dich-vu/:slug`,
    recruitment: '/tuyen-dung',
    recruitmentDetail: `/tuyen-dung/:category/:id`,
    recruitmentCategory: '/tuyen-dung/:slug',
    error404: '/404',
    contact: '/lien-he',
};

export default routes;
