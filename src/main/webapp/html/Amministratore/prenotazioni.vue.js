const TabPrenotazioni = Vue.component("app-prenotazioni", {
    template: `

<main class="card">
    <table class="table">
      <thead class="thead-dark">
            <tr>
            
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Corso</th>
                <th scope="col">IDinsegnamento</th>
                <th scope="col">Slot</th>
                <th scope="col">Stato</th>
                <th scope="col">Data</th>
                <th scope="col"></th>
            </tr>   
      </thead>
      <tbody>
        <tr v-for="x in tabella" >
            <th scope="row">{{tabella.indexOf(x)}}</th>
            <td>{{x.id}}</td>
            <td>{{x.corso}}</td>
            <td>{{x.idInsegnamento}}</td>
            <td>{{x.slot}}</td>
            <td>{{x.stato}}</td>
            <td>{{x.data}}</td>
            <td><button class="btn btn-danger" @click="elimina(x)">Elimina</button></td>
        </tr>
{{tabella}}
      </tbody>
    </table>
         <p> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add new user</button></p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
               <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="id" v-model="adding.id">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="corso" v-model="adding.corso">
            </div> <div class="col">
              <input type="text" class="form-control" placeholder="idInsegnamento" v-model="adding.idInsegnamento">
            </div> <div class="col">
              <input type="text" class="form-control" placeholder="slot" v-model="adding.slot">
            </div> <div class="col">
              <input type="text" class="form-control" placeholder="stato" v-model="adding.stato">
            </div> <div class="col">
              <input type="text" class="form-control" placeholder="data" v-model="adding.data">
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
                id: '',
                corso: '',
                idinsegnamento: '',
                slot: '',
                stato: '',
                data: ''
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
                .concat( '&corso=', item.corso, '&studente=', item.studente, '&slot=', item.slot, '&stato=', item.stato, '&docente=', item.docente, '&data=', item.data )
            axios.post(url).then(()=>{
                const i = this.tabella.indexOf(item)
                this.tabella.splice(i,1)
            })
        },
        addStudent() {
            const some = {...this.adding}
            const url = 'http://localhost:8080/controller?action=insert_prenotazioni'
                .concat('&id=', this.adding.id, '&corso=', this.adding.corso, '&idInsegnamento=', this.adding.idinsegnamento, '&slot=', this.adding.slot , '&stato=', this.adding.stato)
            axios.post(url).then(()=> this.tabella.push(some))
        }
    }
});
