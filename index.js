

function saveToLocal(event) {
	event.preventDefault();
	//difining variable to both the entities of the UI 
	const name = event.target.name.value;
	const des = event.target.des.value;
	const categ=event.target.categ.value;

	//creating object so that we can access it
	const obj = {
		name,
		des,
		categ,
	};


	//checking whether the mail we have entred do not belong to any one else in the list already
	if (localStorage.getItem(obj.des)!==null) {
        removeSameUser(des);
    }


	// Assigning details to local storage
	localStorage.setItem(des, JSON.stringify(obj));

	// Getting details from local storage
	let getItems = JSON.parse(localStorage.getItem(des));
	
	console.log(getItems);


	getUserList(getItems);
	// event.target.name.value='';
	// event.target.des.value='';
	// event.target.categ.value='';
	
	// Need to ask about refresh thing
}
window.addEventListener("DOMContentLoaded", ()=>{
	const lcStObj=localStorage;
	const lcStKey=Object.keys(lcStObj);
	for (let index = 0; index < lcStKey.length; index++) {
		const key=lcStKey[index];
		const string=lcStObj[key];
		const userListObj=JSON.parse(string);
		console.log(userListObj);
		
		getUserList(userListObj);
	}

})



function getUserList(user) {
	document.getElementById('name').value='';
	document.getElementById('des').value='';
	document.getElementById('categ').value='';

    //taking any variable to store or access the ul or li tag and insert all the node we want
	const userList = document.getElementById("userList");

	//taking listArr variable to store all the nodes we have already in the list
	// const listArr = Object.values(user);
	
	//printing all the node we have
	// console.log(`listArr --> ${listArr}`);

	const pntNode=document.getElementById('userList');

	const childNode=`<li id=${user.des}>${user.name}-${user.des}-${user.categ} 
	<button onclick=deleteUser("${user.des}")>DeleteUser</button>
	<button onclick=editUser('${user.name}','${user.des}','${user.categ}')>EditUser</button>
	</li>`;

	pntNode.innerHTML=pntNode.innerHTML+childNode;

	//creating the first node i.e li 
	// const li = document.createElement("li");
	//giving id to it so that we can access it
	// li.id=user.des;
	//adding to the list of li tag with the appendChild function and creating node side by side
	// li.appendChild(document.createTextNode(`${user.name}-${user.des}-${user.categ}`));
    //li.appendChild(document.createTextNode(`<button onclick="deleteUser(${user.email})">Delete User</button>`));
	// li.innerHTML+=`<button onclick=deleteUser("${user.des}")>DeleteUser</button>`;
	// li.innerHTML+=`<button onclick=editUser('${user.name}','${user.des}','${user.categ}')>EditUser</button>`;
	// // const childHTML = `<li>${key}</li>`;
	// pntNode.appendChild(li);
}

function editUser(name,des,categ){
	document.getElementById('name').value=name;
	document.getElementById('des').value=des;
	document.getElementById('categ').value=categ;

	deleteUser(des);
}

function deleteUser(des){
	console.log(des);
	localStorage.removeItem(des);
	removeUserFromScreen(des);
}

function removeSameUser(des){
	console.log(des);
    const parentNode=document.getElementById('userList');
    const childNodeToBeDeleted=document.getElementById(des);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}


function removeUserFromScreen(des){
	const  parentNode=document.getElementById('userList');
	console.log(parentNode);
	const childNodeToBeDeleted=document.getElementById(des);
	console.log(childNodeToBeDeleted);

	parentNode.removeChild(childNodeToBeDeleted);
}