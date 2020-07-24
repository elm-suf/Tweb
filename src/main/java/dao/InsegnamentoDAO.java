package dao;

import connection.DBConnection;
import pojo.Corso;
import pojo.Docente;
import pojo.Insegnamento;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("ALL")
public class InsegnamentoDAO {

    public static ArrayList<Insegnamento> getAll() throws SQLException {
        String getAll = "SELECT * FROM insegnamento";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        try {
            st = conn.prepareStatement(getAll);
            ArrayList<Insegnamento> ins = new ArrayList<>();
            ResultSet rs = st.executeQuery();
            while(rs.next()){
                Insegnamento s = new Insegnamento(rs.getString("corso"), rs.getString("docente"));
                ins.add(s);
            }
            return ins;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static int getN() throws SQLException {
        String getN = "SELECT count(id) FROM insegnamento";
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

    public static int insert(Insegnamento ins) throws SQLException {

        String sql = "INSERT INTO insegnamento(corso, docente) VALUE (?,?);";
        Connection conn = DBConnection.getInstance();
        PreparedStatement st = conn.prepareStatement(sql);
        try {
            st.setString(1, ins.getCorso());
            st.setString(2, ins.getDocente());
            System.out.println("Query : " + st.toString());
            return st.executeUpdate();

        } catch (SQLException e) {
            return -1;
        } finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }
    }

    public static void delete(Insegnamento ins) throws SQLException {
        String sql = "DELETE FROM insegnamento WHERE corso = ? AND docente = ?;";
        Connection conn = DBConnection.getInstance();
        PreparedStatement st = conn.prepareStatement(sql);
        try {
            st.setString(1, ins.getCorso());
            st.setString(2, ins.getDocente());
            st.executeUpdate();
        } finally {
            if (st != null) st.close();
            conn.close();
        }

    }


    /**
     *
     * @param corso il titolo del corso
     * @return la lista di professori che insegnano @param corso
     * @throws SQLException
     */
    public List<Docente> getAllInsegnaMateria(String corso) throws SQLException {
        String sql = "SELECT p.username, nome, cognome, password FROM docente AS p, insegnamento AS i WHERE  i.docente = p.username AND i.corso = ?";
        PreparedStatement st = null;
        Connection conn = DBConnection.getInstance();
        List<Docente> list = new ArrayList<>();


        st = conn.prepareStatement(sql);
        st.setString(1, corso);
        ResultSet rs = st.executeQuery();

        while (rs.next()) {
            list.add(new Docente(rs.getString(1),
                    rs.getString(2),
                    rs.getString(3),
                    rs.getString(4)));

        }
        return list;
    }


    public static int getIdInsegnamento(String corso, String docente) throws SQLException {
        String sql = "SELECT id FROM insegnamento WHERE corso = ? AND docente = ?;";
        Connection conn = DBConnection.getInstance();
        PreparedStatement st = conn.prepareStatement(sql);
        try {
            st.setString(1, corso);
            st.setString(2, docente);

            ResultSet resultSet = st.executeQuery();

            if(resultSet.first()){
                return resultSet.getInt(1);
            }

            return -1;

        } finally {
            if (st != null) st.close();
            conn.close();
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(InsegnamentoDAO.getIdInsegnamento("asa","mariolindo" ));
        } catch (SQLException e) {
            e.getMessage();
        }

    }
}
