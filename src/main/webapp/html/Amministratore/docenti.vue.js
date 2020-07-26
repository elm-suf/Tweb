const TabDocenti = Vue.component("app-docenti", {
    template: `

<main class="card">
    <table class="table">
      <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Nome</th>
                <th scope="col">Cognome</th>
                <th scope="col"></th>
            </tr>   
      </thead>
      <tbody>
        <tr v-for="x in tabella" >
            <th scope="row">{{tabella.indexOf(x)}}</th>
            <td>{{x.username}}</td>
            <td>{{x.password}}</td>
            <td>{{x.nome}}</td>
            <td>{{x.cognome}}</td>
            <td><button class="btn btn-danger" @click="elimina(x)">Elimina</button></td>
        </tr>

      </tbody>
    </table>

         <p> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add new user</button></p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
               <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Username" v-model="adding.username">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Password" v-model="adding.password">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Nome" v-model="adding.nome">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Cognome" v-model="adding.cognome">
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
                username: '',
                password: '',
                nome: '',
                cognome: '',
            }
        };
    },
    created() {
        //elenco_prenotazioni
        const url = 'http://localhost:8080/controller?action=elenco_docenti';
        axios.get(url)
            .then((data) => {
                this.tabella = data.data;
            });

    },
    methods: {
        elimina(item) {
            console.log(item);
            const url = 'http://localhost:8080/controller?action=remove_docenti'
                .concat('&username=', item.username, '&nome=', item.nome, '&cognome=', item.cognome,'&password=', item.password)
            axios.post(url).then(()=>{
                const i = this.tabella.indexOf(item)
                this.tabella.splice(i,1)
            })
        },
        addStudent() {
            const some = {...this.adding}
            const url = 'http://localhost:8080/controller?action=insert_docente'
                .concat('&username=', this.adding.username, '&nome=', this.adding.nome, '&cognome=', this.adding.cognome,'&password=', this.adding.password)
            axios.post(url).then(()=> this.tabella.push(some))
        }
    }
});
