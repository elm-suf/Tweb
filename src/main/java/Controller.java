import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.*;
import pojo.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "Controller", urlPatterns = {"/controller"})
public class Controller extends HttpServlet {

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
//        res.setContentType("text/html;charset=UTF-8");
        String action = req.getParameter("action");
        PrintWriter out = res.getWriter();
        Gson gson = new Gson();
        String username, password, nome, cognome, titolo, docente, data, stato, slot, corso;
        HttpSession s = req.getSession();

        if(!action.equals("login")){
            String tmp = (String) s.getAttribute("username");
            if (tmp == null || tmp.isEmpty()) {
                res.sendError(503, "not logged in");
                return;
            }
        }

        switch (action) {
            case "login":
                s = req.getSession(true);
                username = req.getParameter("username");
                password = req.getParameter("password");
                s.setAttribute("username", req.getParameter("username"));
                s.setAttribute("password", req.getParameter("password"));
                try {
                    if (AmministratoreDAO.exists(username) && AmministratoreDAO.checkPassword(username, password)) {
                        res.sendRedirect("/html/Amministratore/index.html");
                        s.setAttribute("nome", AmministratoreDAO.getName(username));
                        s.setAttribute("cognome", AmministratoreDAO.getSurname(username));
                    }else if (StudenteDAO.exists(username) && StudenteDAO.checkPassword(username, password)) {
                        res.sendRedirect("/html/Studente/index.html");
                        s.setAttribute("nome", StudenteDAO.getName(username));
                        s.setAttribute("cognome", StudenteDAO.getSurname(username));
                    }else
                        res.sendRedirect("/html/login-register.html");
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "elenco_studenti":
                try {
                    res.setContentType("application/json");
                    gson.toJson(StudenteDAO.getAll(), out);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "elenco_docenti":
                try {
                    res.setContentType("application/json");
                    gson.toJson(DocenteDAO.getAll(), out);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "elenco_corsi":
                try {
                    res.setContentType("application/json");
                    gson.toJson(CorsoDAO.getAll(), out);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "elenco_prenotazioni":
                try {
                    res.setContentType("application/json");
                    String s1 = gson.toJson(PrenotazioneDAO.getAll());
                    out.println(s1);
                    System.out.println(s1);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "elenco_insegnamenti":
                try {
                    res.setContentType("application/json");
                    String s1 = gson.toJson(InsegnamentoDAO.getAll());
                    out.println(s1);
                    System.out.println(s1);
                } catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
                break;

            case "insegnamenti":
                try {
                    List<Docente> list = DocenteDAO.getAllInsegnaMateria
                            (req.getParameter("subject"));
                    out.println(gson.toJson(list));
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                break;

            case "insert_student":
                username = req.getParameter("username");
                nome = req.getParameter("nome");
                cognome = req.getParameter("cognome");
                password = req.getParameter("password");

                try {
                    int status = StudenteDAO.insert(new Studente(username, password, nome, cognome));
                    if (status < 1) res.sendError(500, "0 rows affected");
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "insert_docente":
                username = req.getParameter("username");
                nome = req.getParameter("nome");
                cognome = req.getParameter("cognome");
                password = req.getParameter("password");

                try {
                    int status = DocenteDAO.insert(new Docente(username, password, nome, cognome));
                    if (status < 1) res.sendError(500, "0 rows affected");
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "insert_corso":
                titolo = req.getParameter("titolo");

                try {
                    int status = CorsoDAO.insert(new Corso(titolo));
                    if (status < 1) res.sendError(500, "0 rows affected");
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "insert_insegnamento":
                corso = req.getParameter("corso");
                docente = req.getParameter("docente");

                try {
                    int status = InsegnamentoDAO.insert(new Insegnamento(corso, docente));
                    if (status < 1) res.sendError(500, "0 rows affected");
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "prenotazione":
                String studente = (String) s.getAttribute("username");
                if (studente == null || studente.isEmpty()) {
                    System.out.println("studente is null:: non e possibile prenotare");
                    res.sendError(503, "not logged in");
                    return;
                } else {
                    slot = req.getParameter("slot");
                    docente = req.getParameter("docente");
                    corso = req.getParameter("corso");
                    data = req.getParameter("data");
                    stato = req.getParameter("stato");

                    try {
                        int idInsegnamento = InsegnamentoDAO.getIdInsegnamento(corso, docente);
                        Prenotazione p = new Prenotazione(studente, docente, corso, idInsegnamento, slot, stato, data);

//                        out.println(gson.toJson(p));

                        int status = PrenotazioneDAO.insert(p);
                        if (status < 1) res.sendError(500, "0 rows affected");
                    } catch (SQLException e) {
                        e.getMessage();
                    }
                }
                break;

            case "insert_prenotazione":
                studente = req.getParameter("studente");
                slot = req.getParameter("slot");
                docente = req.getParameter("docente");
                corso = req.getParameter("corso");
                data = req.getParameter("data");
                stato = req.getParameter("stato");
                System.out.println("slot: " +slot+ " data: " +data);

                try {
                    int idInsegnamento = InsegnamentoDAO.getIdInsegnamento(corso, docente);
                    int status = PrenotazioneDAO.insert(new Prenotazione(studente, docente, corso, idInsegnamento, slot, stato, data));
                    if (status < 1) res.sendError(500, "0 rows affected");
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "remove_corso":
                titolo = req.getParameter("titolo");

                try {
                    CorsoDAO.delete(new Corso(titolo));
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "remove_studente":
                username = req.getParameter("username");
                password = req.getParameter("password");
                nome = req.getParameter("nome");
                cognome = req.getParameter("cognome");

                try {
                    StudenteDAO.delete(new Studente(username, password, nome, cognome));
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "remove_docente":
                username = req.getParameter("username");
                password = req.getParameter("password");
                nome = req.getParameter("nome");
                cognome = req.getParameter("cognome");

                try {
                    DocenteDAO.delete(new Docente(username, password, nome, cognome));
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "remove_prenotazione":
                stato = req.getParameter("stato");
                studente = req.getParameter("studente");
                docente = req.getParameter("docente");
                corso = req.getParameter("corso");
                slot = req.getParameter("slot");
                data = req.getParameter("data");

                try {
                    PrenotazioneDAO.delete(new Prenotazione(studente, docente, corso, InsegnamentoDAO.getIdInsegnamento(corso, docente), slot, stato, data));
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "remove_insegnamento":
                corso = req.getParameter("corso");
                docente = req.getParameter("docente");

                try {
                    InsegnamentoDAO.delete(new Insegnamento(corso, docente));
                } catch (SQLException e) {
                    e.getMessage();
                }
                break;

            case "disponibilita":
                res.setContentType("application/json"); //todo riguardare
                docente = req.getParameter("docente");
                data = req.getParameter("data");
                List list = PrenotazioneDAO.getSlotDisponibili(docente, data);
                out.println(gson.toJson(list));
                System.out.println(gson.toJson(list));
                break;

            case "lista-prenotazioni":
//                studente = req.getParameter("studente");
//                String sessionUname = s.getAttribute("username").toString();
//                System.out.println("session user name = " + sessionUname);
                //todo prendere dato da sessione utente
                studente = (String) s.getAttribute("username");

                if (studente == null || studente.isEmpty()) {
                    System.out.println("studente is null:: non e possibile prenotare");
                    res.sendError(503, "not logged in");
                    return;
                } else {
                    List result = PrenotazioneDAO.getAllPrenotazioniUtente(studente);
                    res.setContentType("application/json");
                    out.println(gson.toJson(result));
                    System.out.println(gson.toJson(result));
                }
                break;

            case "disdisci":
                int status = 0;
                docente = req.getParameter("docente");
                data = req.getParameter("data");
                slot = req.getParameter("slot");
//                String sessionUname = s.getAttribute("username").toString();
//                System.out.println("session user name = " + sessionUname);
                try {
                    status = PrenotazioneDAO.disdisci(docente, data, slot);
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                System.out.println("action disdisci terminata con status " + status);

                if (status > 0) {
                    res.setStatus(200);
                    out.println("OK");
                } else {
                    //todo redirect to login page
                    out.println("NOT OK");
                    res.setStatus(500);
                    res.sendRedirect("/login-register.html");
                }
                break;

            case "logout":
                s.invalidate();
                System.out.println("session = " + s);
                break;

            case "register":
                System.out.println("registraaaaaaaa");
                username = req.getParameter("username");
                password = req.getParameter("password");
                nome = req.getParameter("nome");
                cognome = req.getParameter("cognome");
                try {
                    if(StudenteDAO.insert(new Studente(username,password,nome,cognome))>0){
                        res.sendRedirect("/index.html");
                    } else {
                        res.sendError(503, "try again");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                break;

            case "profilo":
                res.setContentType("application/json");
                try {
                    String us = (String) s.getAttribute("username");
                    if(StudenteDAO.exists(us))
                        out.println(gson.toJson(StudenteDAO.getOne(us)));
                    else
                        out.println(gson.toJson(AmministratoreDAO.getOne(us)));
                } catch (SQLException e) {
                    System.out.println("Errore catch dati di profilo");
                }
                break;

            case "statistiche":
                res.setContentType("application/json");
                try {
                    ArrayList<Integer> tot = new ArrayList<>();
                    tot.add(StudenteDAO.getN());
                    tot.add(DocenteDAO.getN());
                    tot.add(InsegnamentoDAO.getN());
                    tot.add(CorsoDAO.getN());
                    tot.add(PrenotazioneDAO.getN());
                    out.println(gson.toJson(tot));
                } catch (SQLException e) {
                    System.out.println("Errore catch statistiche");
                }
                break;
        }

    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) {
        try {
            processRequest(req, res);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void doPost(HttpServletRequest req, HttpServletResponse res) {
        try {
            processRequest(req, res);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

}
