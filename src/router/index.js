import Vue from "vue";
import VueRouter from "vue-router";
import Launcher from "@/views/Launcher.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: Launcher,
        children: [{
                name: "launcher-hall",
                path: '',
                component: () =>
                    import ( /* webpackChunkName: "hall" */ "@/views/Launcher/Hall")
            },
            {
                name: "launcher-play",
                path: 'launcher-play',
                component: () =>
                    import ( /* webpackChunkName: "play" */ "@/views/Launcher/Play")
            },
            {
                name: "launcher-about",
                path: 'launcher-about',
                component: () =>
                    import ( /* webpackChunkName: "about" */ "@/views/Launcher/About")
            },
            {
                name: "launcher-options",
                path: 'launcher-options',
                component: () =>
                    import ( /* webpackChunkName: "options" */ "@/views/Launcher/Options"),
                children: [{
                        name: 'options-controls',
                        path: '/options-controls',
                        component: () =>
                            import ( /* webpackChunkName: "options-controls" */ "@/views/Launcher/Options/Controls.vue")
                    },
                    {
                        name: 'options-display',
                        path: '/options-display',
                        component: () =>
                            import ( /* webpackChunkName: "options-display" */ "@/views/Launcher/Options/Display.vue")
                    },
                    {
                        name: 'options-language',
                        path: '/options-language',
                        component: () =>
                            import ( /* webpackChunkName: "options-language" */ "@/views/Launcher/Options/Language.vue")
                    },
                    {
                        name: 'options-profile',
                        path: '/options-profile',
                        component: () =>
                            import ( /* webpackChunkName: "options-profile" */ "@/views/Launcher/Options/Profile.vue")
                    },
                ]
            }
        ]
    },
    {
        path: "@/game",
        component: () =>
            import ( /* webpackChunkName: "game" */ "@/views/Game.vue"),
        meta: { protected: true },
        children: [{
                name: 'game-online-remote',
                path: 'game-online-remote',
                component: () =>
                    import ( /* webpackChunkName: "game-online-remote" */ "@/views/Game/OnlineRemote.vue")
            },
            {
                name: 'game-online-local',
                path: 'game-online-local',
                component: () =>
                    import ( /* webpackChunkName: "game-online-local" */ "@/views/Game/OnlineLocal.vue")
            },
            {
                name: 'game-offline-single',
                path: 'game-offline-single',
                component: () =>
                    import ( /* webpackChunkName: "game-offline-single" */ "@/views/Game/OfflineSingle.vue")
            },
            {
                name: 'game-offline-dual',
                path: 'game-offline-dual',
                component: () =>
                    import ( /* webpackChunkName: "game-offline-dual" */ "@/views/Game/OfflineDual.vue")
            },

        ]
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