import React from "react";
import ProductScreen from "./screens/productScreen.compnent";
import HomeScreen from "./screens/homeScreen.component";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CartScreen from "./screens/cartScreen.component";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/signinScreen.component";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/registerScreen.component";
import ShippingAddressScreen from "./screens/shippingAddress.component";
import PaymentMethodScreen from "./screens/paymentMethodScreen.component";
import PlaceOrderScreen from "./screens/placeOrderScreen.component";
import OrderScreen from "./screens/orderScreen.component";
import OrderHistoryScreen from "./screens/orderHistoryScreen.component";
import ProfileScreen from "./screens/profileScreen.component";
import PrivateRoute from "./components/privateRoute.component";
import AdminRoute from "./components/adminRoute.component";
import ProductListScreen from "./screens/productListScreen.component";
import ProductEditScreen from "./screens/productEditScreen.component";
import OrderListScreen from "./screens/orderListScreen.component";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length !== 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productList">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderList">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userList">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/product/:id/edit" component={ProductEditScreen} exact />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/productList" component={ProductListScreen} />
          <AdminRoute path="/orderList" component={OrderListScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center ">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
