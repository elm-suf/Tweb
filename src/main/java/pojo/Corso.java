package pojo;

public class Corso {
    private int id;
    private String titolo;

    public Corso(){}

    public Corso(String titolo) {
        this.titolo = titolo;
    }

    public int getId(){
        return id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }
}
