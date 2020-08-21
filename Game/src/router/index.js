import Vue from "vue";
import VueRouter from "vue-router";
import Launcher from "@/views/Launcher";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: Launcher,
        children: [{
                name: "launcher-hall",
                path: '',
                component: () =>
                    import ( /* webpackChunkName: "launcher-hall" */ "@/views/Launcher/LauncherHall")
            },
            {
                name: "launcher-register",
                path: 'launcher-register',
                component: () =>
                    import ( /* webpackChunkName: "launcher-register" */ "@/views/Launcher/LauncherRegister"),
                children: [{
                    name: "register-offline",
                    path: "register-offline/:namespace",
                    component: () =>
                        import ( /* webpackChunkName: "register-offline" */ "@/views/Launcher/Register/RegisterOffline")
                }]
            },
            {
                name: "launcher-options",
                path: 'launcher-options',
                component: () =>
                    import ( /* webpackChunkName: "launcher-options" */ "@/views/Launcher/LauncherOptions"),
                children: [{
                        name: 'options-controls',
                        path: '/options-controls',
                        component: () =>
                            import ( /* webpackChunkName: "options-controls" */ "@/views/Launcher/Options/OptionsControls")
                    },
                    {
                        name: 'options-display',
                        path: '/options-display',
                        component: () =>
                            import ( /* webpackChunkName: "options-display" */ "@/views/Launcher/Options/OptionsDisplay")
                    },
                    {
                        name: 'options-language',
                        path: '/options-language',
                        component: () =>
                            import ( /* webpackChunkName: "options-language" */ "@/views/Launcher/Options/OptionsLanguage")
                    },
                    {
                        name: 'options-profile',
                        path: '/options-profile',
                        component: () =>
                            import ( /* webpackChunkName: "options-profile" */ "@/views/Launcher/Options/OptionsProfile")
                    },
                ]
            }
        ]
    },
    {
        name: "game",
        path: "/game",
        component: () =>
            import ( /* webpackChunkName: "game" */ "@/views/Game"),
        meta: { protected: true },
        children: [{
            name: 'game-offline',
            path: 'game-offline/:namespace',
            component: () =>
                import ( /* webpackChunkName: "game-offline" */ "@/views/Game/GameOffline")
        }]
    }
];

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.protected)) {
//         if (to.name.startsWith("game")) {
//             if (to.params.start) {
//                 next()
//             } else {
//                 next(false)
//             }
//         }
//     } else {
//         next()
//     }
// })

export default router;