const AdminHome = Vue.component("app-profile", {
    template: `
<main class="container">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Docente</th>
          <th scope="col">Corso</th>
          <th scope="col">Data</th>
          <th scope="col">Slot</th>
          <th scope="col">Stato</th>
          <th scope="col"></th>

        </tr>
      </thead>
      <tbody>
       
       
        <tr v-for="item in prenotazioni" >
            <td>{{ item.id }}</td> 
            <td>{{ item.docente }}</td>
            <td>{{ item.corso }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.slot }}</td>
            <td>{{ item.stato }}</td>      
            <td><button class="btn btn-danger" @click="disdisci(item)">Disdisci</button></td>
        </tr>
      </tbody>
    </table>
</main>
    `,
    data() {
        return {
            prenotazioni: []
        };
    },
    created() {
        //elenco_prenotazioni
        const url = 'http://localhost:8080/controller?action=elenco_prenotazioni';
        axios.get(url)
            .then((data) => {
                this.prenotazioni = data.data;
            });

    },
    methods:{
        disdisci(item){
            console.log(item);
            const url = 'http://localhost:8080/controller?action=disdisci'
                .concat('&docente=', item.docente, '&data=', item.data, '&slot=', item.slot)
            console.log(url)
            axios.post(url).then(item.stato='disdetta')
        }
    }
});
