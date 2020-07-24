package dao;

import connection.DBConnection;
import pojo.Studente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("ALL")
public class StudenteDAO {

    public static List<Studente> getAll() throws SQLException { //todo non capisco perche sta select torna anche gli id
        String getAll = "SELECT username, password, nome, cognome FROM studente";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(getAll);
            ArrayList<Studente> stud = new ArrayList<>();
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                Studente s = new Studente(rs.getString("username"), rs.getString("password"), rs.getString("nome"), rs.getString("cognome"));
                stud.add(s);
            }
            return stud;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static Studente getOne(String username) throws SQLException {
        String getOne = "SELECT * FROM studente WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(getOne);
            st.setString(1, username);
            Studente stud = new Studente();
            ResultSet rs = st.executeQuery();
            rs.next();
            stud = new Studente(rs.getString("username"), rs.getString("password"), rs.getString("nome"), rs.getString("cognome"));
            return stud;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static int getN() throws SQLException {
        String getN = "SELECT count(*) FROM studente";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(getN);
            ResultSet rs = st.executeQuery();
            rs.next();
            return rs.getInt(1);
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static String getName(String username) throws SQLException {
        String exists = "SELECT nome FROM studente WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(exists);
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            rs.next();
            return rs.getString(1);
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static String getSurname(String username) throws SQLException {
        String exists = "SELECT cognome FROM studente WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(exists);
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            rs.next();
            return rs.getString(1);
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static int insert(Studente stud) throws SQLException {
        String insert = "INSERT INTO studente(username, password, nome, cognome)" + "VALUES(?,?,?,?)";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(insert);
            st.setString(1, stud.getUsername());
            st.setString(2, stud.getPassword());
            st.setString(3, stud.getNome());
            st.setString(4, stud.getCognome());

            System.out.println("executing query : " + st.toString());

            return st.executeUpdate();

        }catch (Exception e){
            //catturo l'eccezione che potrebbe essere generata e ritorno immediatamente -1 error.
            return -1;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }


    public static void delete(Studente stud) throws SQLException {
        String remove = "DELETE FROM studente WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(remove);
            st.setString(1, stud.getUsername());
            st.executeUpdate();
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static boolean exists(String username) throws SQLException {
        String exists = "SELECT nome FROM studente WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(exists);
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            return rs.next();
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static boolean checkPassword(String username, String password) throws SQLException {
        String checkPassword = "SELECT * FROM studente WHERE username = ? AND password = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(checkPassword);
            st.setString(1, username);
            st.setString(2, password);
            ResultSet rs = st.executeQuery();
            return rs.next();
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(StudenteDAO.insert(new Studente("qwqwqqweq", "qwertyuiop", "alberto", "feto")));
        } catch (SQLException e) {
            e.printStackTrace();
            e.getMessage();
        }
    }
}