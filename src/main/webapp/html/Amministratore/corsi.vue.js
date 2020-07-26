const TabCorsi = Vue.component("app-corsi", {
    template: `

<main class="container-fluid">
<h2>Corsi</h2>
    <table class="table">
      <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Titolo</th>
                <th scope="col"></th>
            </tr>   
      </thead>
      <tbody>
        <tr v-for="x in tabella" >
            <th scope="row">{{tabella.indexOf(x)}}</th>
            <td>{{x.titolo}}</td>
            <td><button class="btn btn-danger" @click="elimina(x)">Elimina</button></td>
        </tr>

      </tbody>
    </table>

         <p> <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add new user</button></p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
               <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Titolo" v-model="adding.titolo">
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
                titolo: ''
            }
        };
    },
    created() {
        //elenco_prenotazioni
        const url = 'http://localhost:8080/controller?action=elenco_corsi';
        axios.get(url)
            .then((data) => {
                console.log(data.data)
                this.tabella = data.data;
            });

    },
    methods: {
        elimina(item) {
            console.log(item);
            const url = 'http://localhost:8080/controller?action=remove_corso'
                .concat('&titolo=', item.titolo,)
            axios.post(url).then(()=>{
                const i = this.tabella.indexOf(item)
                this.tabella.splice(i,1)
            })
        },
        addStudent() {
            const some = {...this.adding}
            const url = 'http://localhost:8080/controller?action=insert_corso'
                .concat('&titolo=', this.adding.titolo,)
            axios.post(url).then(()=> this.tabella.push(some))
        }
    }
});
