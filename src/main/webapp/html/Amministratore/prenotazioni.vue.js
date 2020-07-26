const TabPrenotazioni = Vue.component("app-prenotazioni", {
    template: `
<main class="container-fluid">
<h2>Prenotazioni</h2>
    <table class="table">
      <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Docente</th>
                <th scope="col">Studente</th>
                <th scope="col">Corso</th>
                <th scope="col">Slot</th>
                <th scope="col">Data</th>
                <th scope="col">Stato</th>
                <th scope="col"></th>
            </tr>   
      </thead>
      <tbody>
        <tr v-for="x in tabella" >
            <th scope="row">{{tabella.indexOf(x)}}</th>
            <td v-if="x.docente"> {{x.docente}}</td>
            <td v-else> ELIMINATO</td>            
            <td v-if="x.studente"> {{x.studente}}</td>
            <td v-else> ELIMINATO</td>
            <td>{{x.corso}}</td>
            <td>{{x.slot}}</td>
            <td>{{x.data}}</td>
            <td>{{x.stato}}</td>
            <td><button class="btn btn-danger" @click="elimina(x)">Elimina</button></td>
        </tr>
      </tbody>
    </table>
         <p> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add new user</button></p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
               <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="studente" v-model="adding.studente">
            </div> 
             <div class="col">
              <input type="text" class="form-control" placeholder="slot" v-model="adding.slot">
            </div> 
            <div class="col">
              <input type="text" class="form-control" placeholder="docente" v-model="adding.docente">
            </div> 
            <div class="col">
              <input type="text" class="form-control" placeholder="corso" v-model="adding.corso">
            </div> 
            <div class="col">
              <input type="text" class="form-control" placeholder="data" v-model="adding.data">
            </div> 
            <div class="col">
              <input type="text" class="form-control" placeholder="stato" v-model="adding.stato">
            </div> 
            <div class="col">
                <button class="btn" @click="addStudent()">Submit</button>            
            </div>
            
         </div>
          </div>
        </div>
</main>
    `,
    data() {
        return {
            tabella: [],
            adding: {
                studente: '',
                slot: '',
                docente: '',
                corso: '',
                data: '',
                stato: '',
            }
        };
    },
    created() {
        //elenco_prenotazioni
        const url = 'http://localhost:8080/controller?action=elenco_prenotazioni';
        axios.get(url)
            .then((data) => {
                console.log(data.data)
                this.tabella = data.data;
            });

    },
    methods: {
        elimina(item) {
            '&stato=', item.stato,
                console.log(item);
            const url = 'http://localhost:8080/controller?action=remove_prenotazione'
                .concat('&corso=', item.corso, '&studente=', item.studente, '&slot=', item.slot, '&stato=', item.stato, '&docente=', item.docente, '&data=', item.data)
            axios.post(url).then(() => {
                const i = this.tabella.indexOf(item)
                this.tabella.splice(i, 1)
            })
        },
        addStudent() {
            const some = {...this.adding}
            const url = 'http://localhost:8080/controller?action=insert_prenotazione'
                .concat(
                    '&studente=', this.adding.studente,
                    '&slot=', this.adding.slot,
                    '&docente=', this.adding.docente,
                    '&corso=', this.adding.corso,
                    '&data=', this.adding.data,
                    '&stato=', this.adding.stato

                )
            axios.post(url).then(() => this.tabella.push(some))
        }
    }
});
