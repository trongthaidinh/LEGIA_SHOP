import config from '~/config';

// Layouts
import { OnlyHeaderLayout, NothingLayout, AdminLayout } from '~/layouts';
import DefaultLayout from '~/layouts/DefaultLayout';

// Pages
import Home from '~/pages/Home';
import About from '~/pages/About';
import News from '~/pages/News';
import Service from '~/pages/Service';
import Search from '~/pages/Search';
import Products from '~/pages/Products';
import Error404 from '~/pages/Error404';
import Contact from '~/pages/Contact';
// import Recruitment from '~/pages/Recruitment';
import IndustryNews from '~/pages/IndustryNews';
import NewsDetail from '~/pages/NewsDetail';
import ProductDetail from '~/pages/ProductDetail';
import Introduction from '~/pages/Introduction';
import Login from '~/pages/Admin/Login';
import Dashboard from '~/pages/Admin/Dashboard';
import AddNavigation from '~/pages/Admin/Navigation/AddNavigation';
import ServiceDetail from '~/pages/ServiceDetail';
import ServiceCategory from '~/pages/ServiceCategory';
import Product from '~/pages/Product';
import NavigationList from '~/pages/Admin/Navigation/NavigationList';
import EditNavigation from '~/pages/Admin/Navigation/EditNavigation';
import ProductList from '~/pages/Admin/Products/ProductList';
import EditProduct from '~/pages/Admin/Products/EditProduct';
import AddProduct from '~/pages/Admin/Products/AddProduct';
import NewsList from '~/pages/Admin/News/NewsList';
import AddNews from '~/pages/Admin/News/AddNews';
import UpdateNews from '~/pages/Admin/News/UpdateNews';
import ServiceList from '~/pages/Admin/Services/ServiceList';
import AddService from '~/pages/Admin/Services/AddService';
import UpdateService from '~/pages/Admin/Services/UpdateService';
import PartnerList from '~/pages/Admin/Partners/ParnerList/PartnerList';
import AddPartner from '~/pages/Admin/Partners/AddPartner';
import UserList from '~/pages/Admin/Users/UserList';
import AddUser from '~/pages/Admin/Users/AddUser';
import UpdateUser from '~/pages/Admin/Users/UpdateUser';
import VideoList from '~/pages/Admin/Library/Videos/VideoList';
import ImageList from '~/pages/Admin/Library/Images/ImageList';
import AddImage from '~/pages/Admin/Library/Images/AddImage';
import AddVideo from '~/pages/Admin/Library/Videos/AddVideo';
import ChangePassword from '~/pages/Admin/Users/ChangePassword';
import MessageList from '~/pages/Admin/Messages/MessageList';
import Settings from '~/pages/Admin/Settings';
import PageInfoList from '~/pages/Admin/PagesAbout/PageList/PageList';
import AddPage from '~/pages/Admin/PagesAbout/AddPage';
import UpdatePage from '~/pages/Admin/PagesAbout/UpdatePage';
import CategoryList from '~/pages/Admin/Category/CategoryList';
import AddCategory from '~/pages/Admin/Category/AddCategory';
// import RecruitmentCategory from '~/pages/RecruitmentCategory';
// import RecruitmentDetail from '~/pages/RecruitmentDetail';
// import RecruitmentList from '~/pages/Admin/Recruitment/RecruitmentList';
// import AddRecruitment from '~/pages/Admin/Recruitment/AddRecruitment';
// import UpdateRecruitment from '~/pages/Admin/Recruitment/UpdateRecruitment';
import UpdateCategory from '~/pages/Admin/Category/UpdateCategory';
import ExperienceDetail from '~/pages/ExperienceDetail';
import ExperienceCategory from '~/pages/ExperienceCategory';
import Experience from '~/pages/Experience';
import ExperienceList from '~/pages/Admin/Experiences/ExperienceList';
import AddExperience from '~/pages/Admin/Experiences/AddExperience';
import UpdateExperience from '~/pages/Admin/Experiences/UpdateExperience';
import MemberList from '~/pages/Admin/Team/MemberList';
import AddMember from '~/pages/Admin/Team/AddMember';
import UpdateMember from '~/pages/Admin/Team/UpdateMember';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';
import OrderSuccess from '~/pages/OrderSuccess';
import BuyingGuide from '~/pages/BuyingGuide';
import Policy from '~/pages/Policy';
import CustomerLogin from '~/pages/CustomerLogin';

// Public Routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.about,
        component: About,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.productCategory,
        component: Products,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.products} categoryType={'san-pham'} />,
    },
    { path: config.routes.products, component: Product, layout: OnlyHeaderLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: OnlyHeaderLayout },
    {
        path: config.routes.introduction,
        component: Introduction,
        layout: OnlyHeaderLayout,
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
        path: config.routes.policyCom,
        component: Policy,
        layout: OnlyHeaderLayout,
    },
    {
        path: config.routes.newsCategory,
        component: IndustryNews,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.news} categoryType={'tin-tuc'} />,
    },
    {
        path: config.routes.newsDetail,
        component: NewsDetail,
        layout: (props) => <OnlyHeaderLayout {...props} baseRoute={config.routes.news} categoryType={'tin-tuc'} />,
    },
    { path: config.routes.news, component: News, layout: OnlyHeaderLayout },
    { path: config.routes.services, component: Service, layout: OnlyHeaderLayout },
    {
        path: config.routes.serviceDetail,
        component: ServiceDetail,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.services} categoryType={'dich-vu'} />,
    },
    {
        path: config.routes.servicesCategory,
        component: ServiceCategory,
        layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.services} categoryType={'dich-vu'} />,
    },
    { path: config.routes.experiences, component: Experience, layout: OnlyHeaderLayout },
    {
        path: config.routes.experienceDetail,
        component: ExperienceDetail,
        layout: (props) => (
            <DefaultLayout {...props} baseRoute={config.routes.experiences} categoryType={'trai-nghiem'} />
        ),
    },
    {
        path: config.routes.experiencesCategory,
        component: ExperienceCategory,
        layout: (props) => (
            <DefaultLayout {...props} baseRoute={config.routes.experiences} categoryType={'trai-nghiem'} />
        ),
    },
    { path: config.routes.search, component: Search, layout: OnlyHeaderLayout },
    { path: config.routes.error404, component: Error404, layout: NothingLayout },
    { path: config.routes.contact, component: Contact, layout: OnlyHeaderLayout },
    { path: config.routes.cart, component: Cart, layout: OnlyHeaderLayout },
    { path: config.routes.checkout, component: Checkout, layout: OnlyHeaderLayout },
    { path: config.routes.orderReceived, component: OrderSuccess, layout: OnlyHeaderLayout },
    { path: config.routes.customerLogin, component: CustomerLogin, layout: OnlyHeaderLayout },
    // {
    //     path: config.routes.recruitment,
    //     component: Recruitment,
    //     layout: OnlyHeaderLayout,
    // },
    // {
    //     path: config.routes.recruitmentCategory,
    //     component: RecruitmentCategory,
    //     layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.recruitment} categoryType={4} />,
    // },
    // {
    //     path: config.routes.recruitmentDetail,
    //     component: RecruitmentDetail,
    //     layout: (props) => <DefaultLayout {...props} baseRoute={config.routes.recruitment} categoryType={4} />,
    // },
];

// Private Routes
const privateRoutes = [
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
    // { path: config.routes.recruitmentList, component: RecruitmentList, layout: AdminLayout },
    // { path: config.routes.addRecruitment, component: AddRecruitment, layout: AdminLayout },
    // { path: config.routes.updateRecruitment, component: UpdateRecruitment, layout: AdminLayout },
    { path: config.routes.serviceList, component: ServiceList, layout: AdminLayout },
    { path: config.routes.addService, component: AddService, layout: AdminLayout },
    { path: config.routes.updateService, component: UpdateService, layout: AdminLayout },
    { path: config.routes.experienceList, component: ExperienceList, layout: AdminLayout },
    { path: config.routes.addExperience, component: AddExperience, layout: AdminLayout },
    { path: config.routes.updateExperience, component: UpdateExperience, layout: AdminLayout },
    { path: config.routes.partnerList, component: PartnerList, layout: AdminLayout },
    { path: config.routes.addPartner, component: AddPartner, layout: AdminLayout },
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
    { path: config.routes.memberList, component: MemberList, layout: AdminLayout },
    { path: config.routes.addMember, component: AddMember, layout: AdminLayout },
    { path: config.routes.updateMember, component: UpdateMember, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
