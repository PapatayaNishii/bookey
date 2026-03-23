function initRoleEvent() {
	init_component_fillData();
//	event_component_act_checkout();
}

function init_component_fillData() {
	search_data();
}

function event_component_act_checkout() {
	// dynamically setting event listener
	$(document).on('click', '.bookItem .button', function(event) {
		let userID = event.target.getAttribute("data-userID");
		let bookID = event.target.getAttribute("data-bookID");
		$.ajax({
			type: "post",
			async: true,
			data: {'userID': userID, 'bookID': bookID},
			url:`${rootURL}/book/returnBook.do`,
			success: function(data, status) {
				if(status == "success") {
					alert("The book return has been completed successfully.")
					search_data();
				}
			}
		});
	});
}


function search_data() {
	const _formData = Object.fromEntries(getFormData('frmRole'));
	const _jsonData = JSON.stringify(_formData);
		
	// Load checkout data
	$.ajax({
		type: "post",
		async: true,
		data: {'frmData': _jsonData},
		url:`${rootURL}/user/loadAllUsers.do`,
		success: function(data, status) {
			let userList = JSON.parse(data).userList;
			let dataList = document.querySelector(".frmRole .dataList")
			dataList.innerHTML = "";
			if(userList.length == 0) {
				dataList.innerHTML = "<h3 style='text-align:center;'>Honestly, There are no users.</h3>";
			}
			
			// set books through userList
			for(let i = 0; i < userList.length; i++) {
				const li = document.createElement("li");
				li.classList.add("dataItem");
				li.innerText = userList[i].NAME;
//				const bookItem = document.createElement("bky-item-i1f4b1");
//				bookItem.setAttribute("rentalID", userList[i].RENTALID);
//				bookItem.setAttribute("bookID", userList[i].BOOKID);
//				bookItem.setAttribute("userID", userList[i].USERID);
//				bookItem.setAttribute("rentalID", userList[i].RENTAL_DATE);
//				bookItem.setAttribute("dueDate", userList[i].DUE_DATE);
//				bookItem.setAttribute("rentalCode", userList[i].RENTAL_CODE);
//				bookItem.setAttribute("rentalValue", userList[i].RENTAL_VALUE);
//				bookItem.setAttribute("bookNM", userList[i].BOOKNM);
//				bookItem.setAttribute("src", `${rootURL}/image/book/${userList[i].IMAGE_FILE_NAME}`);
//				bookItem.setAttribute("buttonValue", "Return")
//				
//				li.appendChild(bookItem);
				dataList.appendChild(li);
			}
		}
	})
}
