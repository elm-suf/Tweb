package pojo;

public class Insegnamento {
    private int id;
    private String corso;
    private String docente;

    public Insegnamento(){}

    public Insegnamento(String corso, String docente){
        this.corso = corso;
        this.docente = docente;
    }

    public int getId(){
        return id;
    }

    public String getCorso(){
        return corso;
    }

    public String getDocente(){
        return docente;
    }

    public void setCorso(String corso){
        this.corso = corso;
    }

    public void setDocente(String docente){
        this.docente = docente;
    }

}
