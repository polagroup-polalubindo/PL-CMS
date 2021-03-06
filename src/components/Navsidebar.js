import React, { useContext, useEffect } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
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

import useStyles from "../styles";

import { CMSContext, URL_SERVER } from "../context/state";

function Navsidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [product, setProduct] = React.useState(false);
  const [member, setMember] = React.useState(false);
  const [transaksi, setTransaksi] = React.useState(false);
  const [voucher, setVoucher] = React.useState(false);
  const [brand, setBrand] = React.useState(false);
  const [machine, setMachine] = React.useState(false);
  const [menus, setMenus] = React.useState([]);
  const { userData, setUserData } = useContext(CMSContext);

  useEffect(() => {
    async function checkToken() {
      try {
        const access_token = localStorage.getItem("access_token_CMS");

        if (access_token) {
          let data = await fetch(URL_SERVER + "/check-token", {
            method: "GET",
            headers: { access_token, "Content-Type": "application/json" },
          });

          data = await data.json();
          if (data.message === "user not found") {
            throw "error";
          } else {
            await setUserData(data.data);
            if (userData) fetchMenu();
          }
        } else {
          throw "error";
        }
      } catch (err) {
        localStorage.removeItem("access_token_CMS");
        props.history.push("/login");
      }
    }
    checkToken();
  }, []);

  useEffect(() => {
    if (userData) fetchMenu();
  }, [userData]);

  const fetchMenu = () => {
    if (userData.nama.toLowerCase() === "ss") {
      setMenus([
        {
          value: "Pesanan",
          sub: [],
          link: "pesanan",
          icon: "/img/cms/sidebar/sales-icon.png",
        },
        {
          value: "Logout",
          sub: [],
          link: "login",
          icon: "/img/cms/sidebar/logout-icon.png",
        },
      ]);
      props.history.push("/pesanan");
    } else if (userData.nama.toLowerCase() === "sae") {
      props.history.push("/transaksi");
      setMenus([
        {
          value: "Transaksi",
          sub: [
            {
              value: "Komisi",
              link: "transaksi/komisi",
            },
            {
              value: "Penjualan",
              link: "transaksi",
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
        },
      ]);
    } else
      setMenus([
        {
          value: "Produk",
          sub: [
            {
              value: "Edit Produk",
              link: "produk/edit/:id",
            },
            {
              value: "Tambah Produk",
              link: "produk/tambah",
            },
            {
              value: "Daftar Produk",
              link: "produk",
            },
          ],
          expand: true,
          icon: "/img/cms/sidebar/product-icon.png",
        },
        {
          value: "Brand",
          sub: [
            {
              value: "Edit Brand",
              link: "brand/edit/:id",
            },
            {
              value: "Tambah Brand",
              link: "brand/tambah",
            },
            {
              value: "Daftar Brand",
              link: "brand",
            },
          ],
          expand: true,
          icon: "/img/cms/sidebar/brand-icon.png",
        },
        {
          value: "Pesanan",
          sub: [],
          link: "pesanan",
          icon: "/img/cms/sidebar/sales-icon.png",
        },
        {
          value: "Member",
          sub: [
            {
              value: "Tambah Member",
              link: "member/tambah",
            },
            {
              value: "Daftar Member",
              link: "member",
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
            },
            {
              value: "Penjualan",
              link: "transaksi",
            },
          ],
          expand: true,
          icon: "/img/cms/sidebar/transaction-icon.png",
        },
        {
          value: "Voucher",
          sub: [
            {
              value: "Edit Voucher",
              link: "voucher/edit/:id",
            },
            {
              value: "Tambah Voucher",
              link: "voucher/tambah",
            },
            {
              value: "Daftar Voucher",
              link: "voucher",
            },
          ],
          expand: true,
          icon: "/img/cms/sidebar/voucher-icon.png",
        },
        {
          value: "Warranty",
          sub: [],
          link: "warranty",
          icon: "/img/cms/sidebar/waranty-icon.png",
        },
        {
          value: "Machine",
          sub: [
            {
              value: "Edit Machine",
              link: "machine/edit/:id",
            },
            {
              value: "Tambah Machine",
              link: "machine/tambah",
            },
            {
              value: "Daftar Machine",
              link: "machine",
            },
          ],
          expand: true,
          icon: "/img/cms/sidebar/machine-icon.png",
        },
        {
          value: "Logout",
          sub: [],
          link: "login",
          icon: "/img/cms/sidebar/logout-icon.png",
        },
      ]);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {menus.map((menu) => (
          // (
          //   (
          //     (localStorage.getItem("name_user") && localStorage.getItem("name_user").toLowerCase() === "ss") &&
          //     (menu.value === "Penjualan" || menu.value === "Logout")
          //   ) ||
          //   (
          //     (localStorage.getItem("name_user") && localStorage.getItem("name_user").toLowerCase() === "sae") &&
          //     (menu.value === "Transaksi" || menu.value === "Logout")
          //   ) ||
          //   (localStorage.getItem("name_user") && (localStorage.getItem("name_user").toLowerCase() !== "ss" && localStorage.getItem("name_user").toLowerCase() !== "sae"))
          // ) &&
          <>
            <ListItem
              button
              key={menu.value}
              onClick={
                menu.value === "Produk"
                  ? () => setProduct(!product)
                  : menu.value === "Member"
                    ? () => setMember(!member)
                    : menu.value === "Transaksi"
                      ? () => setTransaksi(!transaksi)
                      : menu.value === "Voucher"
                        ? () => setVoucher(!voucher)
                        : menu.value === "Brand"
                          ? () => setBrand(!brand)
                          : menu.value === "Machine"
                            ? () => setMachine(!machine)
                            : menu.value === "Logout"
                              ? () => {
                                localStorage.removeItem("access_token_CMS");
                                props.history.push("/login");
                              }
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
              ) : menu.value === "Voucher" ? (
                voucher ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : menu.value === "Brand" ? (
                brand ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : menu.value === "Machine" ? (
                machine ? (
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
                      : menu.value === "Voucher"
                        ? voucher
                        : menu.value === "Brand"
                          ? brand
                          : menu.value === "Machine"
                            ? machine
                            : null
              }
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menu.sub.map((submenu) => (
                  <>
                    {submenu.value.includes("Edit") ? null : (
                      <ListItem
                        button
                        key={submenu.value}
                        className={classes.nested}
                        component={Link}
                        to={`/${submenu.link}`}
                      >
                        <ListItemText primary={submenu.value} />
                      </ListItem>
                    )}
                  </>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {localStorage.getItem("access_token_CMS") && (
        <>
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
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" noWrap>
                {menus.map((menu) => (
                  <Switch>
                    <Route path={`/${menu.link}`}>
                      <b>{menu.value.includes("Edit") ? null : menu.value}</b>
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
                onClose={() => setMobileOpen(!mobileOpen)}
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
        </>
      )}
    </div>
  );
}

Navsidebar.propTypes = {
  window: PropTypes.func,
};

export default withRouter(Navsidebar);
