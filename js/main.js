// Grab the DOM
const itemInput = document.querySelector('#item-input');
const addBtn = document.querySelector('.btn-primary');
const todoItemsContainer = document.querySelector('.items');

itemInput.focus();

addBtn.addEventListener('click', () => {
	let todoItem = itemInput.value;
	if(todoItem !== '') {
		itemInput.value = '';
		todoItemsContainer.innerHTML += `
			<label for="item-remove" class="item-to-remove">
				<div class="item-container">
					<div class="item-text">
						<input type="checkbox" class="checkbox">
						<div class="item item-remove">${(todoItem.length < 65) ? todoItem : `${todoItem.substring(0, 65)}...`}</div>
					</div>
					<div class="time-text">
						<span>Time: ${new Date().toLocaleTimeString()}</span>
						<span>Date: ${new Date().toLocaleDateString()}</span>
					</div>
				</div>
				<div class="button">
					<div class="btn btn-danger"><span class="fa fa-minus"></span><span>Remove</span></div>
				</div>
			</label>
		`;
	}
});

itemInput.onkeydown = (e) => {
	if(e.key === 'Enter') {
		let todoItem = itemInput.value;
		if(todoItem !== '') {
			itemInput.value = '';
			todoItemsContainer.innerHTML += `
				<label for="item-remove" class="item-to-remove">
					<div class="item-container">
						<div class="item-text">
							<input type="checkbox" class="checkbox">
							<div class="item item-remove">${(todoItem.length < 65) ? todoItem : `${todoItem.substring(0, 65)}...`}</div>
						</div>
						<div class="time-text">
							<span>Time: ${new Date().toLocaleTimeString()}</span>
							<span>Date: ${new Date().toLocaleDateString()}</span>
						</div>
					</div>
					<div class="button">
						<div class="btn btn-danger"><span class="fa fa-minus"></span><span>Remove</span></div>
					</div>
				</label>
			`;
		}
	}
};

window.onclick = updateItemsContainer;

function updateItemsContainer() {
	const checkboxes = document.querySelectorAll('.checkbox');
	const deleteBtns = document.querySelectorAll('.btn-danger');
	const itemRemove = document.querySelectorAll('.item-remove');
	for(let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('click', () => {
			if(checkboxes[i].checked) {
				// checkboxes[i].parentNode.parentNode.childNodes[1].childNodes[3].className = 'item deleted';
				checkboxes[i].parentNode.parentNode.className = 'item-container deleted'
				checkboxes[i].parentNode.parentNode.parentNode.className = 'item-to-remove finished';
			}
			if(!checkboxes[i].checked){
				// checkboxes[i].parentNode.parentNode.childNodes[1].childNodes[3].className = 'item';
				checkboxes[i].parentNode.parentNode.className = 'item-container'
				checkboxes[i].parentNode.parentNode.parentNode.className = 'item-to-remove';
			}
		});
	}

	for (let i = 0; i < deleteBtns.length; i++) {
		deleteBtns[i].addEventListener('click', () => {
			deleteBtns[i].parentNode.parentNode.parentNode.removeChild(deleteBtns[i].parentNode.parentNode);
		});
	}

	for (let i = 0; i < itemRemove.length; i++) {
		itemRemove[i].addEventListener('click', () => {
			if(!itemRemove[i].parentNode.parentNode.parentNode.className.includes('view-more')) {
				if(itemRemove[i].parentNode.parentNode.parentNode.className === 'item-to-remove') {
					itemRemove[i].parentNode.parentNode.parentNode.className = 'item-to-remove view-more';
				}
				if(itemRemove[i].parentNode.parentNode.parentNode.className === 'item-to-remove finished') {
					itemRemove[i].parentNode.parentNode.parentNode.className = 'item-to-remove finished view-more';
				}
			} else if (itemRemove[i].parentNode.parentNode.parentNode.className.includes('view-more')) {
				if(itemRemove[i].parentNode.parentNode.parentNode.className === 'item-to-remove finished view-more') {
					itemRemove[i].parentNode.parentNode.parentNode.className = 'item-to-remove finished';
				}
				if(itemRemove[i].parentNode.parentNode.parentNode.className === 'item-to-remove view-more') {
					itemRemove[i].parentNode.parentNode.parentNode.className = 'item-to-remove';
				}
			}
		});
	}
}