import Login from '../../screens/Login';
import UserRegister from '../../screens/User/UserRegister';
import SellerRegister from '../../screens/SellerScreens/SellerRegister'
import ProductItem from '../../screens/ProductItem';
import Seller from '../../screens/Seller';
import AppDrawer from '../AppDrawer'
import SellerLogin from '../../screens/SellerScreens/SellerLogin';
import NewProduct from '../../screens/SellerScreens/NewProduct';
import EditProduct from '../../screens/SellerScreens/EditProduct';

export default [
    {
        name: 'Login',
        component: Login,
    },
    {
        name: 'SellerLogin',
        component: SellerLogin
    },
    {
        name: 'Main',
        component: AppDrawer,
    },
    {
        name: 'UserRegister',
        component: UserRegister,
    },
    {
        name: 'SellerRegister',
        component: SellerRegister,
    },
    {
        name: 'ProductItem',
        component: ProductItem,
    },
    {
        name: 'NewProduct',
        component: NewProduct
    },
    {
        name: 'EditProduct',
        component: EditProduct
    },
    {
        name: 'Seller',
        component: Seller
    }
]