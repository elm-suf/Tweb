package connection;

import java.sql.*;

public class DBConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/ripetizioni";
    private static final String USER = "root";
    private static final String PWD = "";

    public static Connection getInstance() {
        Connection conn;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PWD);
        } catch (Exception e) {
            conn = null;
            System.out.println(e.getMessage());
        }
        return conn;
    }
}
