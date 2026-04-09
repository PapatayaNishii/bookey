<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ include file="/jsp/config/setting.jsp" %>
<%
	request.setCharacterEncoding("utf-8");
%>
<c:set var="userList" value="${applicationScope.userList}"></c:set>
<%-- <c:set var="userVO" value="${sessionScope.userVO}"></c:set>  --%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Bookey</title>
	<link rel="stylesheet" href="${contextPath }/css/common.css" type="text/css">
	<link rel="stylesheet" href="${contextPath }/css/header.css" type="text/css">
	<link rel="stylesheet" href="${contextPath }/css/footer.css" type="text/css">
	<link rel="stylesheet" href="${contextPath }/css/role.css" type="text/css">
	<link rel="icon" href="${contextPath }/favicon.ico" type="image/x-icon">
	<script type="text/javascript" src="${contextPath }/js/jquery/jquery-3.7.1.min.js"></script>
	<script defer src="${contextPath }/js/class/RoundedButton.js"></script>
	<script defer src="${contextPath }/js/class/SquaredButton.js"></script>
	<script defer src="${contextPath }/js/class/ItemI1F4B1.js"></script>
	<script defer src="${contextPath }/js/script/common.js"></script>
	<script defer src="${contextPath }/js/script/header.js"></script>
	<script defer src="${contextPath }/js/script/role.js"></script>
  <script>
  	$(function() {
  		initHeaderEvent();
  		initCommonEvent();
  		initRoleEvent();
  	})
  </script>
</head>
<body>
	<div class="whole">
		<header id="header">
			<jsp:include page="/jsp/common/header.jsp"></jsp:include>
		</header>
		<main id="centre">
			<section id="background">
<!-- 				■ main -->
				<div class="main">
					<div class="cover">
						<div class="center">
							<div class="container">
								<h1 class="title">Role List</h1>
								<form class="frmUnderline frmRole" method="post" name="frmRole" action="${contextPath }/user/.do">
									<input type='hidden' name='userID' value='${userVO.getUserID() }' id="userID"/>
									<ul class="dataList">
<!-- 										supposed to be made with vanilla js in a dynamic way -->
									</ul>
									<div class="buttons">
										<input type="button" value="Reset" class="reset" onclick="event_component_act_reset()"/>
										<input type="button" value="Submit" class="submit" onclick="event_component_act_submit()"/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
		
		<footer id="footer">
			<jsp:include page="/jsp/common/footer.jsp"></jsp:include>
		</footer>
	</div>
</body>
</html>