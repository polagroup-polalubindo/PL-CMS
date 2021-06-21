import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./context/state";
import PropTypes from "prop-types";

import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Collapse,
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

import TambahProduk from "./components/produk/tambah";
import DaftarProduk from "./components/produk/daftar";

import TambahMember from "./components/member/tambah";
import DaftarMember from "./components/member/daftar";

import Penjualan from "./components/penjualan";

import TransaksiKomisi from "./components/transaksi/komisi";
import TransaksiPenjualan from "./components/transaksi/penjualan";

import Login from "./components/login";

import useStyles from "./styles";

import { CMSContext } from "./context/state";

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [product, setProduct] = React.useState(false);
  const [member, setMember] = React.useState(false);
  const [transaksi, setTransaksi] = React.useState(false);
  const { userData } = useContext(CMSContext);

  const handleClickProduct = () => {
    setProduct(!product);
  };

  const handleClickMember = () => {
    setMember(!member);
  };

  const handleClickTransaksi = () => {
    setTransaksi(!transaksi);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('name_user')
  }

  const menus = [
    {
      value: "Produk",
      sub: [
        {
          value: "Tambah Produk",
          link: "produk/tambah",
          component: <TambahProduk />,
        },
        {
          value: "Daftar Produk",
          link: "produk",
          component: <DaftarProduk />,
        },
      ],
      expand: true,
      icon: "/img/cms/sidebar/product-icon.png",
    },
    {
      value: "Penjualan",
      sub: [],
      link: "penjualan",
      component: <Penjualan />,
      icon: "/img/cms/sidebar/sales-icon.png",
    },
    {
      value: "Member",
      sub: [
        {
          value: "Tambah Member",
          link: "member/tambah",
          component: <TambahMember />,
        },
        {
          value: "Daftar Member",
          link: "member",
          component: <DaftarMember />,
        },
      ],
      expand: true,
      icon: "/img/cms/sidebar/member-icon.png",
    },
    {
      value: "Transaksi",
      sub: [
        {
          value: "Komisi",
          link: "transaksi/komisi",
          component: <TransaksiKomisi />,
        },
        {
          value: "Penjualan",
          link: "transaksi",
          component: <TransaksiPenjualan />,
        },
      ],
      expand: true,
      icon: "/img/cms/sidebar/transaction-icon.png",
    },
    {
      value: "Logout",
      sub: [],
      link: "login",
      icon: "/img/cms/sidebar/logout-icon.png",
    }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {menus.map((menu) => (
          (
            (
              (localStorage.getItem("name_user") && localStorage.getItem("name_user").toLowerCase() === "ss") &&
              (menu.value === "Penjualan" || menu.value === "Logout")
            ) ||
            (
              (localStorage.getItem("name_user") && localStorage.getItem("name_user").toLowerCase() === "sae") &&
              (menu.value === "Transaksi" || menu.value === "Logout")
            ) ||
            (localStorage.getItem("name_user") && (localStorage.getItem("name_user").toLowerCase() !== "ss" && localStorage.getItem("name_user").toLowerCase() !== "sae"))
          ) &&
          <>
            <ListItem
              button
              key={menu.value}
              onClick={
                menu.value === "Produk"
                  ? handleClickProduct
                  : menu.value === "Member"
                    ? handleClickMember
                    : menu.value === "Transaksi"
                      ? handleClickTransaksi
                      : menu.value === "Logout"
                        ? handleLogout
                        : null
              }
              component={menu.expand === true ? null : Link}
              to={menu.expand === true ? null : `/${menu.link}`}
            >
              <ListItemIcon>
                <img src={menu.icon} alt={menu.value} />
              </ListItemIcon>
              <ListItemText primary={<b>{menu.value}</b>} />
              {menu.value === "Produk" ? (
                product ? (
                  <ExpandLess />
                ) : (
                    <ExpandMore />
                  )
              ) : menu.value === "Member" ? (
                member ? (
                  <ExpandLess />
                ) : (
                    <ExpandMore />
                  )
              ) : menu.value === "Transaksi" ? (
                transaksi ? (
                  <ExpandLess />
                ) : (
                    <ExpandMore />
                  )
              ) : null}
            </ListItem>
            <Collapse
              in={
                menu.value === "Produk"
                  ? product
                  : menu.value === "Member"
                    ? member
                    : menu.value === "Transaksi"
                      ? transaksi
                      : null
              }
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menu.sub.map((submenu) => (
                  <ListItem
                    button
                    key={submenu.value}
                    className={classes.nested}
                    component={Link}
                    to={`/${submenu.link}`}
                  >
                    <ListItemText primary={submenu.value} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </div >
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Provider>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          {/* {
            hasAuthentication &&  */}
          <Route path="/">
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={classes.appBar}
                color="inherit"
                elevation={0}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h5" noWrap>
                    {menus.map((menu) => (
                      <Switch>
                        <Route path={`/${menu.link}`}>
                          <b>{menu.value}</b>
                        </Route>
                        {menu.sub.map((submenu) => (
                          <Route path={`/${submenu.link}`}>
                            <b>{submenu.value}</b>
                          </Route>
                        ))}
                      </Switch>
                    ))}
                  </Typography>
                </Toolbar>
              </AppBar>
              <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                  <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true,
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {menus.map((menu) => (
                  <Switch>
                    <Route path={`/${menu.link}`}>{menu.component}</Route>
                    {menu.sub.map((submenu) => (
                      <Route path={`/${submenu.link}`}>
                        {submenu.component}
                      </Route>
                    ))}
                  </Switch>
                ))}
              </main>
            </div>
          </Route>
          {/* }
          {
            !hasAuthentication && <Redirect to='/login' />
          } */}

        </Switch>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  window: PropTypes.func,
};

export default App;
