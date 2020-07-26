const routes = [
    {path: "/home", component: AdminHome},
    {path: "/studenti", component: TabStudenti},
    // { path: "/cerca", component: Search },
];

const router = new VueRouter({
    routes,
});

var app = new Vue({
    router,
    el: "#app",
    data: () => ({
        user: null
    }),
    created() {
        router.push('/home')
        const url = 'http://localhost:8080/controller?action=check_login'
        axios.post(url).then(data => {
            this.user = data.data
            console.log(data)
        })
        //.then(router.push('/home'))
    },
    methods: {
        logout() {
            const url = 'http://localhost:8080/controller?action=logout'
            axios.post(url).then(() => {
                window.location.href = "http://localhost:8080/"
                this.user = null
            })

        },

        login() {
            window.location.href = "http://localhost:8080/"
        }
    }
});
