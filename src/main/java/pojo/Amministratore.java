package pojo;

public class Amministratore{
    private int id;
    private String username;
    private String password;
    private String nome;
    private String cognome;

    public Amministratore(){}

    public Amministratore(String username, String password, String nome, String cognome){
        this.username = username;
        this.password = password;
        this.nome = nome;
        this.cognome = cognome;
    }

    public void setUsername(String us) {
        username = us;
    }

    public void setPassword(String pass) {
        password = pass;
    }

    public void setNome(String n){
        nome = n;
    }

    public void setCognome(String c){
        cognome = c;
    }

    public int getId(){
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getNome(){
        return nome;
    }

    public String getCognome(){
        return cognome;
    }

}
