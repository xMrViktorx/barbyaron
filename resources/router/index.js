import { createWebHistory, createRouter } from "vue-router";
import axios from "axios"

const Home = () => import('../js/components/Home.vue');
const Contact = () => import('../js/components/Contact.vue');
const Portfolio = () => import('../js/components/Portfolio.vue');
const PortfolioImages = () => import('../js/components/PortfolioImages.vue');
const Admin = () => import('../js/components/admin/App.vue');
const Dashboard = () => import('../js/components/admin/Dashboard.vue');
const Album = () => import('../js/components/admin/album/Album.vue');
const CreateAlbum = () => import('../js/components/admin/album/CreateAlbum.vue');
const EditAlbum = () => import('../js/components/admin/album/EditAlbum.vue');
const Images = () => import('../js/components/admin/album/Images.vue');
const Login = () => import('../js/components/admin/authentication/Login.vue');
const Profil = () => import('../js/components/admin/Profil.vue');

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron'
      next();
    }
  },
  {
    path: "/kapcsolat",
    name: "Contact",
    component: Contact,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron | Kapcsolat'
      next();
    }
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron | Portfólió'
      next();
    }
  },
  {
    path: "/portfolio/:path",
    name: "PortfolioImages",
    component: PortfolioImages,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron | Portfólió'
      next();
    }
  },
  {
    path: "/admin",
    name: "admin",
    meta: { authOnly: true },
    component: Admin,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron | Admin'
      if (to.path == '/admin') {
        next('/admin/dashboard');
      } else {
        next();
      }
    },
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      },
      {
        path: "/admin/album",
        name: "Album",
        component: Album,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      },
      {
        path: "/admin/album/create",
        name: "CreateAlbum",
        component: CreateAlbum,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      },
      {
        path: "/admin/album/edit/:id",
        name: "EditAlbum",
        component: EditAlbum,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      },
      {
        path: "/admin/album/:id/images",
        name: "Images",
        component: Images,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      },
      {
        path: "/admin/profil",
        name: "Profil",
        component: Profil,
        beforeEnter: (to, from, next) => {
          window.document.title = 'BarbyAron | Admin'
          next();
        }
      }
    ]
  },
  {
    path: "/admin/login",
    name: "Login",
    meta: { guestOnly: true },
    component: Login,
    beforeEnter: (to, from, next) => {
      window.document.title = 'BarbyAron | Admin'
      next();
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/"
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isLoggedIn() {
  const promise = axios.get("/api/user")

  const dataPromise = promise.then((response) => response.data)

  return dataPromise

}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    isLoggedIn()
      .then(data => {
        if (data == "") {
          next({
            path: "/admin/login"
          })
        } else {
          next()
        }
      })
      .catch(err => console.log(err))
  }
  else if (to.matched.some(record => record.meta.guestOnly)) {
    isLoggedIn()
      .then(data => {
        if (data != "") {
          next({
            path: "/admin"
          })
        } else {
          next()
        }
      })
      .catch(err => console.log(err))
  } else {
    next()
  }
});

export default router;