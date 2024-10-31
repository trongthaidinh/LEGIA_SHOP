import config from '~/config';

// Layouts
import {
    OnlyHeaderLayout,
    NothingLayout,
    AdminLayout,
    ZhOnlyHeaderLayout,
    ZhDefaultLayout,
    ZhAdminLayout,
} from '~/layouts';
import DefaultLayout from '~/layouts/DefaultLayout';

// Pages
import HomeVI from '~/pages/Home';
import HomeZH from '~/pages/zh/Home';
import News from '~/pages/News';
import NewsZH from '~/pages/zh/News';
import Search from '~/pages/Search';
import SearchZH from '~/pages/zh/Search';
import Error404 from '~/pages/Error404';
import Contact from '~/pages/Contact';
import ContactZH from '~/pages/zh/Contact';
import IndustryNews from '~/pages/IndustryNews';
import IndustryNewsZH from '~/pages/zh/IndustryNews';
import NewsDetail from '~/pages/NewsDetail';
import NewsDetailZH from '~/pages/zh/NewsDetail';
import ProductDetail from '~/pages/ProductDetail';
import ProductDetailZH from '~/pages/zh/ProductDetail';
import Introduction from '~/pages/Introduction';
import IntroductionZH from '~/pages/zh/Introduction';
import Login from '~/pages/Admin/Login';
import LoginZH from '~/pages/zh/Admin/Login';
import Dashboard from '~/pages/Admin/Dashboard';
import DashboardZH from '~/pages/zh/Admin/Dashboard';
import AddNavigation from '~/pages/Admin/Navigation/AddNavigation';
import AddNavigationZH from '~/pages/zh/Admin/Navigation/AddNavigation';
import Product from '~/pages/Product';
import ProductZH from '~/pages/zh/Product';
import NavigationList from '~/pages/Admin/Navigation/NavigationList';
import NavigationListZH from '~/pages/zh/Admin/Navigation/NavigationList';
import EditNavigation from '~/pages/Admin/Navigation/EditNavigation';
import EditNavigationZH from '~/pages/zh/Admin/Navigation/EditNavigation';
import ProductList from '~/pages/Admin/Products/ProductList';
import ProductListZH from '~/pages/zh/Admin/Products/ProductList';
import EditProduct from '~/pages/Admin/Products/EditProduct';
import EditProductZH from '~/pages/zh/Admin/Products/EditProduct';
import AddProduct from '~/pages/Admin/Products/AddProduct';
import AddProductZH from '~/pages/zh/Admin/Products/AddProduct';
import NewsList from '~/pages/Admin/News/NewsList';
import NewsListZH from '~/pages/zh/Admin/News/NewsList';
import AddNews from '~/pages/Admin/News/AddNews';
import AddNewsZH from '~/pages/zh/Admin/News/AddNews';
import UpdateNews from '~/pages/Admin/News/UpdateNews';
import UpdateNewsZH from '~/pages/zh/Admin/News/UpdateNews';
import UserList from '~/pages/Admin/Users/UserList';
import UserListZH from '~/pages/zh/Admin/Users/UserList';
import AddUser from '~/pages/Admin/Users/AddUser';
import AddUserZH from '~/pages/zh/Admin/Users/AddUser';
import UpdateUser from '~/pages/Admin/Users/UpdateUser';
import UpdateUserZH from '~/pages/zh/Admin/Users/UpdateUser';
import VideoList from '~/pages/Admin/Library/Videos/VideoList';
import VideoListZH from '~/pages/zh/Admin/Library/Videos/VideoList';
import ImageList from '~/pages/Admin/Library/Images/ImageList';
import ImageListZH from '~/pages/zh/Admin/Library/Images/ImageList';
import AddImage from '~/pages/Admin/Library/Images/AddImage';
import AddImageZH from '~/pages/zh/Admin/Library/Images/AddImage';
import AddVideo from '~/pages/Admin/Library/Videos/AddVideo';
import AddVideoZH from '~/pages/zh/Admin/Library/Videos/AddVideo';
import ChangePassword from '~/pages/Admin/Users/ChangePassword';
import ChangePasswordZH from '~/pages/zh/Admin/Users/ChangePassword';
import MessageList from '~/pages/Admin/Messages/MessageList';
import MessageListZH from '~/pages/zh/Admin/Messages/MessageList';
import Settings from '~/pages/Admin/Settings';
import SettingsZH from '~/pages/zh/Admin/Settings';
import PageInfoList from '~/pages/Admin/PagesAbout/PageList/PageList';
import PageInfoListZH from '~/pages/zh/Admin/PagesAbout/PageList/PageList';
import AddPage from '~/pages/Admin/PagesAbout/AddPage';
import AddPageZH from '~/pages/zh/Admin/PagesAbout/AddPage';
import UpdatePage from '~/pages/Admin/PagesAbout/UpdatePage';
import UpdatePageZH from '~/pages/zh/Admin/PagesAbout/UpdatePage';
import CategoryList from '~/pages/Admin/Category/CategoryList';
import CategoryListZH from '~/pages/zh/Admin/Category/CategoryList';
import AddCategory from '~/pages/Admin/Category/AddCategory';
import AddCategoryZH from '~/pages/zh/Admin/Category/AddCategory';
import UpdateCategory from '~/pages/Admin/Category/UpdateCategory';
import UpdateCategoryZH from '~/pages/zh/Admin/Category/UpdateCategory';
import Cart from '~/pages/Cart';
import CartZH from '~/pages/zh/Cart';
import Checkout from '~/pages/Checkout';
import CheckoutZH from '~/pages/zh/Checkout';
import OrderSuccess from '~/pages/OrderSuccess';
import OrderSuccessZH from '~/pages/zh/OrderSuccess';
import BuyingGuide from '~/pages/BuyingGuide';
import Policy from '~/pages/Policy';
import PolicyZH from '~/pages/zh/Policy';
import OrderList from '~/pages/Admin/Orders/OrderList';
import OrderListZH from '~/pages/zh/Admin/Orders/OrderList';
import ReviewList from '~/pages/Admin/Reviews/ReviewList';
import ReviewListZH from '~/pages/zh/Admin/Reviews/ReviewList';
import AddReview from '~/pages/Admin/Reviews/AddReview';
import AddReviewZH from '~/pages/zh/Admin/Reviews/AddReview';
import UpdateReview from '~/pages/Admin/Reviews/UpdateReview';
import UpdateReviewZH from '~/pages/zh/Admin/Reviews/UpdateReview';
// Public Routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: HomeVI,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.homeZH,
        component: HomeZH,
        layout: ZhOnlyHeaderLayout,
    },
    {
        path: config.routes.about,
        component: Policy,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.productCategory,
        component: Product,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.productCategoryZH,
        component: ProductZH,
        layout: ZhOnlyHeaderLayout,
    },
    { path: config.routes.products, component: Product, layout: OnlyHeaderLayout },
    { path: config.routes.productsZH, component: ProductZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: OnlyHeaderLayout },
    { path: config.routes.productDetailZH, component: ProductDetailZH, layout: ZhOnlyHeaderLayout },
    {
        path: config.routes.introduction,
        component: Introduction,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.introductionZH,
        component: IntroductionZH,
        layout: ZhOnlyHeaderLayout,
    },
    {
        path: config.routes.buyingGuide,
        component: BuyingGuide,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.policy,
        component: Policy,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.policyZH,
        component: PolicyZH,
        layout: ZhOnlyHeaderLayout,
    },
    {
        path: config.routes.policyCom,
        component: Policy,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.newsCategory,
        component: IndustryNews,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.news} categoryType={'bai-viet'} />,
    },
    {
        path: config.routes.newsCategoryZH,
        component: IndustryNewsZH,
        layout: (props) => <ZhDefaultLayout {...props} baseRoute={config.routes.newsZH} categoryType={'文章'} />,
    },
    {
        path: config.routes.newsDetail,
        component: NewsDetail,
        layout: (props) => <OnlyHeaderLayout {...props} baseRoute={config.routes.news} categoryType={'tin-tuc'} />,
    },
    {
        path: config.routes.newsDetailZH,
        component: NewsDetailZH,
        layout: (props) => <ZhOnlyHeaderLayout {...props} baseRoute={config.routes.newsZH} categoryType={'文章'} />,
    },
    { path: config.routes.news, component: News, layout: OnlyHeaderLayout },
    { path: config.routes.newsZH, component: NewsZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.search, component: Search, layout: OnlyHeaderLayout },
    { path: config.routes.searchZH, component: SearchZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.error404, component: Error404, layout: NothingLayout },
    { path: config.routes.contact, component: Contact, layout: OnlyHeaderLayout },
    { path: config.routes.contactZH, component: ContactZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.cart, component: Cart, layout: OnlyHeaderLayout },
    { path: config.routes.cartZH, component: CartZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.checkout, component: Checkout, layout: OnlyHeaderLayout },
    { path: config.routes.checkoutZH, component: CheckoutZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.orderReceived, component: OrderSuccess, layout: OnlyHeaderLayout },
    { path: config.routes.orderReceivedZH, component: OrderSuccessZH, layout: ZhOnlyHeaderLayout },
    { path: config.routes.loginZH, component: LoginZH, layout: ZhOnlyHeaderLayout },
];

// Private Routes
const privateRoutes = [
    //vi
    { path: config.routes.admin, component: Dashboard, layout: AdminLayout },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.login, component: Login, layout: NothingLayout },
    { path: config.routes.navigationList, component: NavigationList, layout: AdminLayout },
    { path: config.routes.addNavigation, component: AddNavigation, layout: AdminLayout },
    { path: config.routes.editNavigation, component: EditNavigation, layout: AdminLayout },
    { path: config.routes.productList, component: ProductList, layout: AdminLayout },
    { path: config.routes.editProduct, component: EditProduct, layout: AdminLayout },
    { path: config.routes.addProduct, component: AddProduct, layout: AdminLayout },
    { path: config.routes.newsList, component: NewsList, layout: AdminLayout },
    { path: config.routes.addNews, component: AddNews, layout: AdminLayout },
    { path: config.routes.updateNews, component: UpdateNews, layout: AdminLayout },
    { path: config.routes.reviewList, component: ReviewList, layout: AdminLayout },
    { path: config.routes.addReview, component: AddReview, layout: AdminLayout },
    { path: config.routes.updateReview, component: UpdateReview, layout: AdminLayout },
    { path: config.routes.updateUser, component: UpdateUser, layout: AdminLayout },
    { path: config.routes.userList, component: UserList, layout: AdminLayout },
    { path: config.routes.videosList, component: VideoList, layout: AdminLayout },
    { path: config.routes.imagesList, component: ImageList, layout: AdminLayout },
    { path: config.routes.addImage, component: AddImage, layout: AdminLayout },
    { path: config.routes.addVideo, component: AddVideo, layout: AdminLayout },
    { path: config.routes.addUser, component: AddUser, layout: AdminLayout },
    { path: config.routes.changePassword, component: ChangePassword, layout: AdminLayout },
    { path: config.routes.messagesList, component: MessageList, layout: AdminLayout },
    { path: config.routes.settings, component: Settings, layout: AdminLayout },
    { path: config.routes.pageList, component: PageInfoList, layout: AdminLayout },
    { path: config.routes.addPage, component: AddPage, layout: AdminLayout },
    { path: config.routes.updatePage, component: UpdatePage, layout: AdminLayout },
    { path: config.routes.categoryList, component: CategoryList, layout: AdminLayout },
    { path: config.routes.addCategory, component: AddCategory, layout: AdminLayout },
    { path: config.routes.updateCategory, component: UpdateCategory, layout: AdminLayout },
    { path: config.routes.orderList, component: OrderList, layout: AdminLayout },

    //zh
    { path: config.routes.adminZH, component: DashboardZH, layout: ZhAdminLayout },
    { path: config.routes.dashboardZH, component: DashboardZH, layout: ZhAdminLayout },

    { path: config.routes.navigationListZH, component: NavigationListZH, layout: ZhAdminLayout },
    { path: config.routes.addNavigationZH, component: AddNavigationZH, layout: ZhAdminLayout },
    { path: config.routes.editNavigationZH, component: EditNavigationZH, layout: ZhAdminLayout },
    { path: config.routes.productListZH, component: ProductListZH, layout: ZhAdminLayout },
    { path: config.routes.editProductZH, component: EditProductZH, layout: ZhAdminLayout },
    { path: config.routes.addProductZH, component: AddProductZH, layout: ZhAdminLayout },
    { path: config.routes.newsListZH, component: NewsListZH, layout: ZhAdminLayout },
    { path: config.routes.addNewsZH, component: AddNewsZH, layout: ZhAdminLayout },
    { path: config.routes.updateNewsZH, component: UpdateNewsZH, layout: ZhAdminLayout },
    { path: config.routes.reviewListZH, component: ReviewListZH, layout: ZhAdminLayout },
    { path: config.routes.addReviewZH, component: AddReviewZH, layout: ZhAdminLayout },
    { path: config.routes.updateReviewZH, component: UpdateReviewZH, layout: ZhAdminLayout },
    { path: config.routes.updateUserZH, component: UpdateUserZH, layout: ZhAdminLayout },
    { path: config.routes.userListZH, component: UserListZH, layout: ZhAdminLayout },
    { path: config.routes.videosListZH, component: VideoListZH, layout: ZhAdminLayout },
    { path: config.routes.imagesListZH, component: ImageListZH, layout: ZhAdminLayout },
    { path: config.routes.addImageZH, component: AddImageZH, layout: ZhAdminLayout },
    { path: config.routes.addVideoZH, component: AddVideoZH, layout: ZhAdminLayout },
    { path: config.routes.addUserZH, component: AddUserZH, layout: ZhAdminLayout },
    { path: config.routes.changePasswordZH, component: ChangePasswordZH, layout: ZhAdminLayout },
    { path: config.routes.messagesListZH, component: MessageListZH, layout: ZhAdminLayout },
    { path: config.routes.settingsZH, component: SettingsZH, layout: ZhAdminLayout },
    { path: config.routes.pageListZH, component: PageInfoListZH, layout: ZhAdminLayout },
    { path: config.routes.addPageZH, component: AddPageZH, layout: ZhAdminLayout },
    { path: config.routes.updatePageZH, component: UpdatePageZH, layout: ZhAdminLayout },
    { path: config.routes.categoryListZH, component: CategoryListZH, layout: ZhAdminLayout },
    { path: config.routes.addCategoryZH, component: AddCategoryZH, layout: ZhAdminLayout },
    { path: config.routes.updateCategoryZH, component: UpdateCategoryZH, layout: ZhAdminLayout },
    { path: config.routes.orderListZH, component: OrderListZH, layout: ZhAdminLayout },
];

export { publicRoutes, privateRoutes };
