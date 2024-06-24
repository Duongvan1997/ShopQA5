
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./ClientLayout.css"
import Sale from "./Sale/Sale";
import ProductDetail from "./ProductDetail/ProductDetail";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Order from "./Order/Order";
import GenderFill from "./FillterGender/GenderFill";
import FemaleFilter from "./FillterGender/FemaleFilter";
import AboutShop  from "./AboutShop/AboutShop";
import OrderDetail from "./Order/OrderDetail";
function ClientLayout() {
    return (
        <div className="ClientLayout">
            <Header />
            <div className="Content">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/product" element={<Sale />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/order/:id" element={<OrderDetail/>}/>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/male" element={<GenderFill />} />
                    <Route path="/female" element={<FemaleFilter />} />
                    <Route path="/about-us" element={<AboutShop />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default ClientLayout;