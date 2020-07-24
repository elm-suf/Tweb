package dao;

import connection.DBConnection;
import pojo.Amministratore;
import pojo.Studente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@SuppressWarnings("ALL")
public class AmministratoreDAO {
    public static void insert(Amministratore amm) throws SQLException {
        String insert = "INSERT INTO amministratore VALUES(?,?,?,?)";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(insert);
            st.setString(1, amm.getUsername());
            st.setString(2, amm.getPassword());
            st.setString(3, amm.getNome());
            st.setString(4, amm.getCognome());
            st.executeUpdate();
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
            //todo converrebbe gestire l'eccezione dentro il finally?
        }
    }

    public static void delete(Amministratore amm) throws SQLException {
        String remove = "DELETE FROM amministratore WHERE id = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(remove);
            st.setInt(1, amm.getId());
            st.executeUpdate();
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static String getName(String username) throws SQLException {
        String exists = "SELECT nome FROM amministratore WHERE username = ?";
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
        String exists = "SELECT cognome FROM amministratore WHERE username = ?";
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

    public static Amministratore getOne(String username) throws SQLException {
        String getOne = "SELECT * FROM amministratore WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(getOne);
            st.setString(1, username);
            Amministratore amm = new Amministratore();
            ResultSet rs = st.executeQuery();
            rs.next();
            amm = new Amministratore(rs.getString("username"), rs.getString("password"), rs.getString("nome"), rs.getString("cognome"));
            return amm;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static boolean exists(String username) throws SQLException {
        String exists = "SELECT nome FROM amministratore WHERE username = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(exists);
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            return rs.next();
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static boolean checkPassword(String username, String password) throws SQLException {
        String checkPassword = "SELECT * FROM amministratore WHERE username = ? AND password = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(checkPassword);
            st.setString(1, username);
            st.setString(2, password);
            ResultSet rs = st.executeQuery();
            return rs.next();
        }finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }
}
