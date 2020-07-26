const HomepageComponent = Vue.component("home-page", {
    template:
        `
<div>
    <section class="container" :key="updater">
        <div class="jumbotron p-4" v-for="corso in courses">
            <h2 class="display-6" @click="select(corso)" style="cursor:pointer">{{corso.titolo}}</h2>

            <section v-if="selezionato[corso.titolo]">

                <div v-for="docente in docenti" class="card" :key="docente.username">
                    <div class="col-md-12 bg-light card-body" @click="toggle(docente.username)" style="cursor:pointer">
                        <div class="row my-3">
                            <img class="rounded-circle d-sm-none d-md-block ml-3 mt-3"
                                 src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sammilanimahavidyalaya.org%2Fwp-content%2Fuploads%2F2016%2F01%2Fstudent-icon.png&f=1"
                                 alt="Generic placeholder image" width="140" height="140">
                            <h2 class="my-auto mx-auto ml-6">{{docente.username}}</h2>
                        </div>
                    </div>
                    <div class="card" v-if="mostra[docente.username]">
                        <div class="card-header">
                            <input class="form-control text-center" type="date" v-model="selectedDate"
                                @change="getSlots(docente.username)">
                        </div>

                        <div class=" card-body d-flex justify-content-between">
                            <button v-for="item in slots" @click="effettuaPrenotazione(item, docente.username, slots)"
                                    type="button" class="btn btn-success col-sm-5 col-md-2 m-2">
                                {{item}}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </section>
</div>
`,
    data() {
        return {
            courses: [],
            selectedCourse: null,
            docenti: [],
            mostra: {},
            selezionato: {},
            updater: 0,
            selectedDate: new Date(),
            slots: []
        };
    },
    created() {
        axios
            .get("http://localhost:8080/controller?action=elenco_corsi")
            .then((data) => {
                this.courses = data.data;
            });
    },
    methods: {
        select(item) {
            if (this.selezionato[item.titolo])
                this.selezionato[item.titolo] = !this.selezionato[item.titolo]
            else
                this.selezionato[item.titolo] = true
            this.updater++;

            this.selectedCourse = item.titolo;
            axios
                .get(
                    "http://localhost:8080/controller?action=insegnamenti&subject=".concat(
                        item.titolo
                    )
                )
                .then((data) => {
                    this.docenti = data.data;
                });
        },

        selectDocente(item) {
            console.log(item);
        },

        toggle(id) {
            if (this.mostra[id])
                this.mostra[id] = !this.mostra[id]
            else
                this.mostra[id] = true
            this.updater++;
        },

        getSlots(docente) {

            const url = 'http://localhost:8080/controller?action=disponibilita'
                .concat('&docente=', docente, '&data=', this.selectedDate)
            console.log(url)
            axios.get(url).then(data => this.slots = data.data)
        },
        effettuaPrenotazione(slot, docente, slots) {
            const params = {
                'action': 'prenotazione',
                slot,
                docente,
                'corso': this.selectedCourse,
                'data': this.selectedDate,
                'stato': 'attiva'
            }
            console.log(params)
            axios.post('http://localhost:8080/controller', null, {
                params: {
                    'action': 'prenotazione',
                    slot,
                    docente,
                    'corso': this.selectedCourse,
                    'data': this.selectedDate,
                    'stato': 'attiva'
                }
            }).then(data => {
                console.log(data);
                const i = slots.indexOf(slot);
                slots.splice(i, 1);
            }).catch(err => {
                window.location.href = "http://localhost:8080/"
            })
        }
    },
});
