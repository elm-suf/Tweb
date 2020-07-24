package pojo;

public class Prenotazione {
    private int id;
    private String studente;
    private String docente;
    private String corso;
    private int idInsegnamento;
    private String slot;
    private String stato;
    private String data;

    public Prenotazione(){}

    public Prenotazione(String studente, String docente, String corso, int idInsegnamento, String slot, String stato, String data){
        this.studente = studente;
        this.docente = docente;
        this.corso = corso;
        this.idInsegnamento = idInsegnamento;
        this.slot = slot;
        this.stato = stato;
        this.data = data;
    }

    public String getStudente(){
        return studente;
    }

    public String getDocente(){
        return docente;
    }

    public String getCorso(){
        return corso;
    }

    public int getIdInsegnamento(){
        return idInsegnamento;
    }

    public String getSlot(){
        return slot;
    }

    public String getStato(){
        return stato;
    }

    public String getData(){
        return data;
    }

    public void setStudente(Studente s){
        studente = s.getUsername();
    }

    public void setDocente(Docente d){
        docente = d.getUsername();
    }

    public void setCorso(String c){
        corso = c;
    }

    public void setIdInsegnamento(int i){
        idInsegnamento = i;
    }

    public void setSlot(String s){
        slot = s;
    }

    public void setStato(String s){
        stato = s;
    }

    public void setData(String d){
        data = d;
    }

}
