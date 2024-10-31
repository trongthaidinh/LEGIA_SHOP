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
    reviewList: '/admin/review-list',
    addReview: '/admin/add-review',
    updateReview: '/admin/update-review/:id',
    // recruitmentList: '/admin/recruitment-list',
    // addRecruitment: '/admin/add-recruitment',
    // updateRecruitment: '/admin/update-recruitment/:id',
    serviceList: '/admin/service-list',
    addService: '/admin/add-service',
    updateService: '/admin/update-service/:id',
    experienceList: '/admin/experience-list',
    addExperience: '/admin/add-experience',
    updateExperience: '/admin/update-experience/:id',
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
    memberList: '/admin/member-list',
    addMember: '/admin/add-member',
    updateMember: '/admin/update-member/:id',
    orderList: '/admin/order-list',

    //Zh Admin
    adminZH: '/zh/admin',
    dashboardZH: '/zh/admin/dashboard',
    navigationListZH: '/zh/admin/navigation-list',
    addNavigationZH: '/zh/admin/add-navigation',
    editNavigationZH: '/zh/admin/edit-navigation/:id',
    productListZH: '/zh/admin/product-list',
    addProductZH: '/zh/admin/add-product',
    editProductZH: '/zh/admin/edit-product/:id',
    newsListZH: '/zh/admin/news-list',
    addNewsZH: '/zh/admin/add-news',
    updateNewsZH: '/zh/admin/update-news/:id',
    reviewListZH: '/zh/admin/review-list',
    addReviewZH: '/zh/admin/add-review',
    updateReviewZH: '/zh/admin/update-review/:id',
    // recruitmentList: '/admin/recruitment-list',
    // addRecruitment: '/admin/add-recruitment',
    // updateRecruitment: '/admin/update-recruitment/:id',
    serviceListZH: '/zh/admin/service-list',
    addServiceZH: '/zh/admin/add-service',
    updateServiceZH: '/zh/admin/update-service/:id',
    experienceListZH: '/zh/admin/experience-list',
    addExperienceZH: '/zh/admin/add-experience',
    updateExperienceZH: '/zh/admin/update-experience/:id',
    partnerListZH: '/zh/admin/partner-list',
    addPartnerZH: '/zh/admin/add-partner',
    updateUserZH: '/zh/admin/update-user/:id',
    changePasswordZH: '/zh/admin/change-password',
    userListZH: '/zh/admin/user-list',
    addUserZH: '/zh/admin/add-user',
    videosListZH: '/zh/admin/videos-list',
    imagesListZH: '/zh/admin/images-list',
    addImageZH: '/zh/admin/add-image',
    addVideoZH: '/zh/admin/add-video',
    messagesListZH: '/zh/admin/messages-list',
    settingsZH: '/zh/admin/settings',
    pageListZH: '/zh/admin/page-list',
    addPageZH: '/zh/admin/add-page',
    updatePageZH: '/zh/admin/update-page',
    categoryListZH: '/zh/admin/category-list',
    addCategoryZH: '/zh/admin/add-category',
    updateCategoryZH: '/zh/admin/update-category/:id',
    memberListZH: '/zh/admin/member-list',
    addMemberZH: '/zh/admin/add-member',
    updateMemberZH: '/zh/admin/update-member/:id',
    orderListZH: '/zh/admin/order-list',
    //User
    home: '/',
    // about: '/gioi-thieu',
    introduction: '/gioi-thieu/:slug',
    products: '/san-pham',
    productCategory: '/san-pham/:slug',
    productDetail: '/san-pham/:category/:id',
    news: '/bai-viet',
    newsDetail: `/bai-viet/:slug/:id`,
    newsCategory: `/bai-viet/:slug`,
    search: '/search',
    projects: '/du-an',
    projectCategory: '/du-an/:slug',
    projectDetail: '/du-an/:category/:id',
    // services: '/dich-vu',
    // serviceDetail: '/dich-vu/:category/:id',
    // servicesCategory: `/dich-vu/:slug`,
    // experiences: '/trai-nghiem',
    // experienceDetail: '/trai-nghiem/:category/:id',
    // experiencesCategory: `/trai-nghiem/:slug`,
    // recruitment: '/tuyen-dung',
    // recruitmentDetail: `/tuyen-dung/:category/:id`,
    // recruitmentCategory: '/tuyen-dung/:slug',
    error404: '/404',
    contact: '/lien-he',
    privacy: '/dieu-khoan-chinh-sach',
    cart: '/gio-hang',
    checkout: '/thanh-toan',
    orderReceived: '/thanh-toan/order-received/:id',
    // buyingGuide: '/huong-dan-mua-hang',
    policyCom: '/:slug',
    // policy: '/chinh-sach/:slug',
    // customerLogin: '/dang-nhap',

    // zh
    homeZH: '/zh',
    loginZH: '/zh/login',
    introductionZH: '/zh/介紹/:slug',
    productsZH: '/zh/产品',
    productCategoryZH: '/zh/产品/:slug',
    productDetailZH: '/zh/产品/:category/:id',
    newsZH: '/zh/文章',
    newsDetailZH: `/zh/文章/:slug/:id`,
    newsCategoryZH: `/zh/文章/:slug`,
    searchZH: '/zh/搜索',
    projectsZH: '/zh/项目',
    projectCategoryZH: '/zh/项目/:slug',
    projectDetailZH: '/zh/项目/:category/:id',
    // services: '/dich-vu',
    // serviceDetail: '/dich-vu/:category/:id',
    // servicesCategory: `/dich-vu/:slug`,
    // experiences: '/trai-nghiem',
    // experienceDetail: '/trai-nghiem/:category/:id',
    // experiencesCategory: `/trai-nghiem/:slug`,
    // recruitment: '/tuyen-dung',
    // recruitmentDetail: `/tuyen-dung/:category/:id`,
    // recruitmentCategory: '/tuyen-dung/:slug',
    contactZH: '/zh/联系我们',
    privacyZH: '/zh/条款和条件',
    cartZH: '/zh/购物车',
    checkoutZH: '/zh/结账',
    orderReceivedZH: '/zh/结账/订单已收到/:id',
    // buyingGuide: '/huong-dan-mua-hang',
    policyZH: '/zh/:slug',
    // policy: '/chinh-sach/:slug',
    // customerLogin: '/dang-nhap',
};

export default routes;
