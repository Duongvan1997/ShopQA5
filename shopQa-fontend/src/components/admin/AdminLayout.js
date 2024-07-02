import UserManager from "./User-Manager/UserManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Layout, Menu, Space, Typography } from "antd";
import PaymentMethod from "./Order/PaymentMethod";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TableOutlined,
  UserAddOutlined,
  TeamOutlined,
  BuildOutlined,
  PlusOutlined,
  BarsOutlined,
  FileTextOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./AdminLayout.css";
import ProductManager from "./Product-Manager/ProductManager";
import AddProduct from "./Add-Product/AddProduct";
import AddProductDetail from "./ProductDetailManager/AddProductDetail";
import ProductDetailManagerById from "./ProductDetailManager/ProductDetailManagerById";
import ProductDetailManager from "./ProductDetailManager/ProductDetailManager";
import ProductTypeManager from "./ProductTypeManager/ProductTypeManager";
import { useEffect, useState } from "react";
import UpdateProduct from "./Product-Manager/UpdateProduct";
import UpdateProductDetail from "./ProductDetailManager/UpdateProductDetailById";
import MangerOrder from "./Order/ManagerOrder";
import CheckOrder from "./Order/CheckOrder";
import OrderComfirmation from "../admin/Order/OrderComfirmation";
import AddSales from "./Sales-Manager/AddSales";
import SalesManager from "./Sales-Manager/SalesManager";
import UpdateSales from "./Sales-Manager/UpdateSales";
import FeedbackManagement from "./FeedbackManagement/FeedbackManagetment";
import ReportChart from "./ReportChart/ReportChart";
import UpdateAdminEmployee from "./Update-admin-employee/UpdateAdminEmployee";
const { Sider, Content } = Layout;

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role === "ADMIN" || userData?.role === "EMPLOYEE") {
      setAdminData(userData);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {adminData && (
        <Layout className="AdminLayout">
          <Sider width={280} theme="dark" style={{ padding: 10 }}>
            <Flex justify="space-between" align="center">
              <h1 className="AdminLayout_title">SHOES SHOP</h1>
              <Button type="text" style={{ color: "white" }}>
                <Link to="/">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </Link>
              </Button>
            </Flex>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="reports">Báo cáo thống kê</Link>
              </Menu.Item>
              <Menu.SubMenu key="UM" icon={<UserOutlined />} title="Người dùng">
                <Menu.Item key="users" icon={<BarsOutlined />}>
                  <Link to="users">Quản lý người dùng</Link>
                </Menu.Item>

                <Menu.Item key="feedback-management" icon={<BarsOutlined />}>
                  <Link to="feedback-management">Quản lý feedback</Link>
                </Menu.Item>
                <Menu.Item key="users/add" icon={<PlusOutlined />}>
                  <Link to="users/add">Thêm mới nhân sự</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="UM2"
                icon={<FileTextOutlined />}
                title="Đơn hàng"
              >
                <Menu.Item key="orders" icon={<BarsOutlined />}>
                  <Link to="orders">Quản lý đơn hàng</Link>
                </Menu.Item>
                <Menu.Item key="payment" icon={<BarsOutlined />}>
                  <Link to="payment">Kiểu thanh toán</Link>
                </Menu.Item>
                <Menu.Item key="orders_comfirm" icon={<PlusOutlined />}>
                  <Link to="orders-comfirm">Xác nhận đơn hàng</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="PM" icon={<BuildOutlined />} title="Sản phẩm">
                <Menu.Item key="products/add_product" icon={<PlusOutlined />}>
                  <Link to="products/add-product">Thêm sản phẩm</Link>
                </Menu.Item>
                <Menu.Item key="products" icon={<BarsOutlined />}>
                  <Link to="products">Quản lý sản phẩm</Link>
                </Menu.Item>
                <Menu.Item key="product_type" icon={<BarsOutlined />}>
                  <Link to="products-type">Loại sản phẩm</Link>
                </Menu.Item>
                <Menu.Item key="product_detail" icon={<BarsOutlined />}>
                  <Link to="products-detail">Chi tiết sản phẩm</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="sale"
                icon={<PercentageOutlined />}
                title="Khuyến mãi"
              >
                <Menu.Item key="sales/create" icon={<PlusOutlined />}>
                  <Link to="sales/create">Thêm khuyến mãi</Link>
                </Menu.Item>
                <Menu.Item key="sales" icon={<BarsOutlined />}>
                  <Link to="sales">Quản lý khuyến mãi</Link>
                </Menu.Item>
              </Menu.SubMenu>
              
            </Menu>
          </Sider>
          <Layout>
            <Content className="AdminContent">
              <Routes>
                <Route path="/report" element={<ReportChart />} />
                <Route path="/users" element={<UserManager />} />
                <Route path="/reports" element={<ReportChart />} />
                <Route path="/products" element={<ProductManager />} />
                <Route
                  path="/products-detail"
                  element={<ProductDetailManager />}
                />
                <Route
                  path="/products-detail/:id"
                  element={<ProductDetailManagerById />}
                />
                <Route path="/products-type" element={<ProductTypeManager />} />
                <Route path="/products/add-product" element={<AddProduct />} />
                <Route
                  path="/products-detail/:id/add-product-detail"
                  element={<AddProductDetail />}
                />
                <Route
                  path="/products/update/:id"
                  element={<UpdateProduct />}
                />
                <Route
                  path="/productdetails/update/:id"
                  element={<UpdateProductDetail />}
                />
                <Route path="/orders" element={<MangerOrder />}></Route>
                <Route path="/orders-comfirm" element={<OrderComfirmation />} />
                <Route path="/payment" element={<PaymentMethod />} />
                <Route
                  path="/feedback-management"
                  element={<FeedbackManagement />}
                />
                <Route path="users/add" element={<UpdateAdminEmployee />} />

                <Route
                  path="/orders/checkOrder/:id"
                  element={<CheckOrder />}
                ></Route>
                <Route path="/sales/create" element={<AddSales />}></Route>
                <Route path="/sales/" element={<SalesManager />}></Route>
                <Route path="/sales/:id" element={<UpdateSales />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default AdminLayout;
