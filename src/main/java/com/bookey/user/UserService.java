package com.bookey.user;

import java.util.ArrayList;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UserService {

	private UserDAO userDAO;
	
	public UserService() {
		userDAO = new UserDAO();
	}
	
	public int checkForUserID(String userID) {
		return userDAO.checkForUserID(userID);
	}
	
	public void joinNewUser(UserVO userVO) {
		userDAO.joinNewUser(userVO);
	}
	
	public UserVO loginUser(String userID, String userPW) {
		UserVO userVO = null;
		int resultNum = userDAO.isExistingUser(userID, userPW);
		if(resultNum == 1) {
			// Login process completed Successfully
			userVO = userDAO.findUser(userID, userPW);
		}
		return userVO;
	}
	
	public JSONArray loadAllUsers() {
	  return userDAO.selectAllUser();
	}
	public JSONArray loadAllRanks() {
	  return userDAO.selectAllRank();
	}
	
	@SuppressWarnings("unchecked")
  public int changeRank(ArrayList<Object> rankList) {
	  int resultInt = 0;
	  for(int i = 0; i < rankList.size(); i++) {
	    Map<String, Object> paramMap = (Map<String, Object>)rankList.get(i);
	    resultInt += userDAO.updateRank(paramMap);
	  }
	  return resultInt;
	}
}
