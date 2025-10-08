import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import i18n from "../i18n";
import { locales } from "../i18n";
import { getBrowserLocale, getLocalStorageLocale } from "../utils/locale";

// Lazy load route component
const Home = () => import("@/views/Home.vue");
const Projects = () => import("@/views/Projects.vue");
const ProjectDetails = () => import("@/views/ProjectDetails.vue");
const Services = () => import("@/views/Services.vue")
const About = () => import("@/views/About.vue");
const Contact = () => import("@/views/Contact.vue");
const NotFound = () => import("@/views/NotFound.vue")

// Defines all routes
const routes = [
    {
        path: '/',
        redirect: () => {
            const locale = getLocalStorageLocale();
            return `/${locale}/`;
        }
    },
    {
        path: `/:locale/`,
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
            },
            {
                path: 'projects/',
                name: 'Projects',
                component: Projects,
            },
            {
                path: 'projects/:slug/',
                name: 'ProjectDetail',
                component: ProjectDetails,
                props: true,
            },
            {
                path: 'services/',
                name: 'Services',
                component: Services,
            },
            {
                path: 'about/',
                name: 'About',
                component: About,
            },
            {
                path: 'contact/',
                name: 'Contact',
                component: Contact,
            },
            {
                path: ':pathMatch(.*)*',
                name: 'NotFound',
                component: NotFound,
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundGlobal',
        component: NotFound,
    }
]

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    let locale = to.params.locale;

    // Ensure trailing slash in locale path
    if (locale && !to.fullPath.endsWith('/')) {
        return next({
            path: `${to.fullPath}/`,
            query: to.query,
            replace: true
        });
    }

    // Redirect if the locale does not exist
    if (locale && !locales.includes(locale)) {
        const newLocale = getLocalStorageLocale();
        const correctedPath = to.fullPath.replace(/^\/[^/]+/, `/${newLocale}`);
        return next({ path: correctedPath });
    }

    // Sync i18n locale with route locale
    if (i18n.global.locale.value !== locale) {
        i18n.global.locale.value = locale;
        localStorage.setItem('locale', locale);
    }

    // Continue navigation
    next();
})

export default router