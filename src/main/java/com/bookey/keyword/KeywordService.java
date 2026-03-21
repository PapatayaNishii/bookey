package com.bookey.keyword;

import java.util.Map;

import org.json.simple.JSONArray;

public class KeywordService {

	private KeywordDAO keywordDAO;
	
	public KeywordService() {
		keywordDAO = new KeywordDAO();
	}
	
	public JSONArray getAllKeyword() {
		return keywordDAO.getAllKeyword();
	}
	
	public int accumulateKeyword(JSONArray bookList) {
	  int accumulateKeyword = keywordDAO.insertKeyword(bookList);
	  return accumulateKeyword;
	}
}
