function initRoleEvent() {
	init_component_fillData();
	event_component_act_change();
}

function init_component_fillData() {
	loadAllRank();
	loadAllUsers();
}

let updatedRowsMap = new Map();
function event_component_act_change() {
	const dataList = document.querySelector(".frmRole .dataList");
	const currentId = document.querySelector(".frmRole #userID").value;
	console.log('currentId : '+currentId);
	dataList.addEventListener('change', function(event){
		const target = event.target;
		if(target.tagName === 'SELECT'){
			const updatedRow = target.closest('li');
			const userId = updatedRow.dataset.userId;
			const newRank = target.value;
			const roleRowIdx = updatedRow.dataset.roleRowIdx;
			updatedRowsMap.set(roleRowIdx, {
				'userId':userId,
				'newRank':newRank,
				'currentId':currentId
			})
			updatedRow.classList.add("updated");
//			console.log(updatedRowsMap)
		}
	})
}
function event_component_act_reset() {
	loadAllUsers();
	updatedRowsMap.clear();
}
function event_component_act_submit() {
	const _formData = Array.from(updatedRowsMap.values());
	const _jsonData = JSON.stringify(_formData);
	
	if(updatedRowsMap.size == 0) {
		alert("There is no change on RoleList");
		return;
	}
	
	hasSession();
	
	$.ajax({
		type: "post",
		async: true,
		data: {'frmData': _jsonData},
		url:`${rootURL}/user/changeRole.do`,
		success: function(data, status) {
			if(data>0) alert("success to update ranks")
			init_component_fillData();
		}
	})
}


let rankList = null;
function loadAllRank() {
	$.ajax({
		type: "post",
		async: false,
		url:`${rootURL}/user/loadAllRanks.do`,
		success: function(data, status) {
			rankList = JSON.parse(data).rankList;
		}
	})
}


function loadAllUsers() {
		
	// Load checkout data
	$.ajax({
		type: "post",
		async: false,
		url:`${rootURL}/user/loadAllUsers.do`,
		success: function(data, status) {
			let userList = JSON.parse(data).userList;
			let dataList = document.querySelector(".frmRole .dataList")
			dataList.innerHTML = "";
			if(userList.length == 0) {
				dataList.innerHTML = "<h3 style='text-align:center;'>Honestly, There are no users.</h3>";
				return;
			}
			
			// set users through userList
			for(let i = 0; i < userList.length; i++) {
				const li = document.createElement("li");
				li.classList.add("row")
				li.classList.add("dataItem");
				// data-role-id
				li.dataset.roleRowIdx = i;
				li.dataset.userId = userList[i].USERID;
				const userImage = document.createElement("img");
				if(userList[i].GENDER == 1) {
					userImage.setAttribute("src", `${rootURL}/image/user/boy01.svg`);
				}else {
					userImage.setAttribute("src", `${rootURL}/image/user/girl01.svg`);
				}
				const userName = document.createElement("div");
				const userEmail = document.createElement("div");
				const userBirthday = document.createElement("div");
				const userRank = document.createElement("div");
				userName.innerText = userList[i].NAME;
				userEmail.innerText = userList[i].EMAIL;
				userBirthday.innerText = userList[i].BIRTHDAY;
				const selRank = document.createElement("select");
				for(let j = 0; j < rankList.length; j++) {
					let opt = document.createElement("option");
					opt.value = rankList[j].CODE; 
			    opt.textContent = rankList[j].VALUE;
					opt.selected = false;
					if(rankList[j].CODE == userList[i].RANK) {
						opt.selected = true;
					}
					selRank.appendChild(opt);
				}
				if(userList[i].RANK == 'A') {
					selRank.disabled = true;
				}
				userRank.appendChild(selRank)
				userImage.classList.add("userImage");
				userName.classList.add("userName");
				userEmail.classList.add("userEmail");
				userBirthday.classList.add("userBirthday");
				userRank.classList.add("userRank");
				li.appendChild(userImage);
				li.appendChild(userName);
				li.appendChild(userEmail);
				li.appendChild(userEmail);
				li.appendChild(userBirthday);
				li.appendChild(userRank);
				dataList.appendChild(li);
			}
		}
	})
}

