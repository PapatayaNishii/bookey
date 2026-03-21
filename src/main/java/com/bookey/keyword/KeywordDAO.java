package com.bookey.keyword;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class KeywordDAO {
	private Connection conn;
	private PreparedStatement pstmt;
	private DataSource dataFactory;
	
	public KeywordDAO() {
		try {
			Context envContext = (Context)(new InitialContext()).lookup("java:/comp/env");
			dataFactory = (DataSource) envContext.lookup("jdbc/oracle");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public JSONArray getAllKeyword() {
		JSONArray keywordList = new JSONArray();
		try {
			conn = dataFactory.getConnection();
			String query = ""
          + "SELECT A.*"
          + "  FROM ("
          + "        SELECT RANK() OVER(PARTITION BY 1 ORDER BY CNT DESC, KEYWORD) RECNUM, A.*"
          + "          FROM ("
          + "                SELECT COUNT(KEYWORD) OVER(PARTITION BY KEYWORD ORDER BY KEYWORD) CNT"
          + "                     , RANK() OVER(PARTITION BY KEYWORD ORDER BY ID DESC) PRIORITY"
          + "                     , A.*"
          + "                  FROM TBL_KEYWORD A "
          + "               ) A"
          + "         WHERE 1=1"
          + "           AND PRIORITY = 1"
          + "       ) A"
          + " WHERE 1=1"
          + "   AND RECNUM <= 10"
          + " ORDER BY CNT DESC, KEYWORD"
          ;
			pstmt = conn.prepareStatement(query);
			ResultSet rs = pstmt.executeQuery();
			while(rs.next()) {
				JSONObject keyword = new JSONObject();
				keyword.put("RECNUM", rs.getInt("RECNUM"));
				keyword.put("CNT", rs.getInt("CNT"));
				keyword.put("ID", rs.getInt("ID"));
				keyword.put("KEYWORD", rs.getString("KEYWORD"));
				keyword.put("REMARK", rs.getString("REMARK"));
				keywordList.add(keyword);
			}
			rs.close();
			pstmt.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return keywordList;
	}
	
	public int insertKeyword(JSONArray bookList) {
	  int insertResult = -1;
	  String query = ""
	      + "INSERT INTO TBL_KEYWORD"
	      + "("
	      + "       ID"
	      + "     , BOOKID"
	      + "     , KEYWORD"
	      + "     , CREATED_DATE"
	      + "     , CREATED_USER"
	      + ")"
	      + "SELECT MAX(ID) + 1       AS ID"
	      + "     , ?                 AS BOOKID"
	      + "     , ?                 AS KEYWORD"
	      + "     , SYSDATE           AS CREATED_DATE"
	      + "     , 'SYSTEM'          AS CREATED_USER"
	      + "  FROM TBL_KEYWORD";
	  try {
      conn = dataFactory.getConnection();
      pstmt = conn.prepareStatement(query);
      for(int i = 0; i < bookList.size(); i++) {
        JSONObject book = (JSONObject) bookList.get(i);
        String bookID = book.get("BOOKID").toString();
        String keyword = book.get("BOOKNM").toString();
        pstmt.setString(1, bookID);
        pstmt.setString(2, keyword);
        pstmt.addBatch();
      }
      int[] results = pstmt.executeBatch();
      insertResult = results.length;
      pstmt.close();
      conn.close();
	  }catch (Exception e) {
      // TODO: handle exception
	    e.printStackTrace();
    }
	  return insertResult;
	}
}
