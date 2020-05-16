document.addEventListener('DOMContentLoaded', () => {


	// form variable is used as a global house
	const form = document.getElementById('registrar');

	// input variable points to the input element on the form
	const input = form.querySelector('input');

	const mainDiv = document.querySelector('.main');
	// ul variable points to the ul element with the #invitedList
	const ul = document.getElementById('invitedList');
	const liChildren = ul.children;

	const div = document.createElement('div');
	const filterLabel = document.createElement('label');
	const filterCheckbox = document.createElement('input');
	const namesInvitees = [];

	filterLabel.textContent = `Hide those who haven't responded`;
	filterCheckbox.type = 'checkbox';
	div.appendChild(filterLabel);
	div.appendChild(filterCheckbox);
	mainDiv.insertBefore(div, ul);

	filterCheckbox.addEventListener('change', (e) => {
		const isChecked = e.target.checked;
		const lis = ul.children;
		if (isChecked) {
			for (let i = 0; i < lis.length; i++) {
				let li = lis[i];
				let label = li.querySelector('label');
				if (li.className === 'responded') {
					li.style.dispaly = '';
					label.style.display = 'none';
				} else {
					li.style.display = 'none';
				}
			}
		} else {
			for (let i = 0; i < lis.length; i++) {
				let li = lis[i];
				let label = li.querySelector('label');
				li.style.display = '';
				label.style.display = '';
			}
		}
	});

	function createLI(text) {
		function createElement(elementName, property, value) {
			const element = document.createElement(elementName);
			// ?
	    	element[property] = value;
	    	if (elementName == 'span') {
	    		element.className = 'invitee-person';
	    	} else if (elementName == 'textarea') {
	    		element.style.display = 'block';
	    		element.style.resize = 'none';
	    		element.readOnly = true;
	    		element.placeholder = 'No notes';
	    	}
	    	return element;
		}

		function appendToLI(elementName, property, value) {
			const element = createElement(elementName, property, value);
	    	li.appendChild(element);
	    	return element;
		}

			// Create li element to house all the nessessary items
		const li = document.createElement('li');
		appendToLI('span', 'textContent', text);

		
			// Create label element with the text 'Confirmed' , so that we
			// we can better visualize who is 'Confirmed' from the party list
		
			// Create input element that we convert to a checkbox, which allows
			// us to check for 'Confirmed' individuals who are coming to the party
	    appendToLI('label', 'textContent', 'Confirm')
	    	.appendChild(createElement('input', 'type', 'checkbox'));
	    
	    appendToLI('h4', 'textContent', 'Notes');

	    appendToLI('textarea', 'textContent', '');

	    // Add Edit Button to every li element
	    appendToLI('button', 'textContent', 'Edit');

	    // Add Remove Button to every li element
	    appendToLI('button', 'textContent', 'Remove');
		
			// Returning the li element which houses all the nessessary
			// items that allow us to 'Confirm' and remove individuals
			// from our guest list
			return li;
	};


	
	// Create Event Listener that allows us to 'submit'/'enter' guest names's
	// into the input element on top of the page. We then get the value of the
	// input element and we pass it to the createLI(text) to create the nessassary
	// functionality to the app
	form.addEventListener('submit', (e) => {
		
			// By default form's are being submitted which causes the page to refresh,
			// in order to prevent the page from refreshing we include the
			// event.preventDefault(), which prevent the default form submit behavior
	    e.preventDefault();

	    const text = input.value;
	    input.value = '';


	    if (namesInvitees.includes(text) || text === '') {
	    	alert(`${text} already in list or name is set to empty.`);
	    } else {
	    	namesInvitees.push(text);

	    	const li = createLI(text);
	    	ul.appendChild(li); 
	    }     
	});

	// Create Event Listener that allows us to add/remove className of the
	// li element that houses all other elements of the invitee (parentNode.parentNode)
	ul.addEventListener('change', (e) => {
			// We set a global house variable that allows us to retrieve values from it
	    const checkbox = e.target;
			
			// We create a variable named checked to check the status of the checkbox
			// we retrieve the status of the input type'checkbox' element from the
			// global house "checkbox"
	    const checked = checkbox.checked;
		
			// in order to give a className to the li element, we need to point the event.target
			// to the li element. We do that by using 'bubbling'.
			// since input type'checkbox' element is housed by the label element which is housed
			// by the li element we need to use parentNode 2 time in order to get to the li element
			// that houses all other invitee's elements
	    const listItem = checkbox.parentNode.parentNode;

	    const label = listItem.querySelector('label');
	    
			// We then use if else condition in order to check if the checkbox has been checked or not
			// and then based on the status of the checkbox, we give the li element the according className
	    if (checked) {
	        listItem.className = 'responded';
	        label.firstChild.nodeValue = 'Confirmed';
	    } else {
	        listItem.className = '';
	        label.firstChild.nodeValue = 'Confirm';
	    }
	});

	// Create a Event Listener to allow us to remove li element from the ul element
	ul.addEventListener('click', (e) => {
		// We are checking to see if the event.target is === to 'BUTTON' and e.target.textContent is === 'Remove'
		if (e.target.tagName === 'BUTTON') {
			const button = e.target;

			// we use 'bubbling' to make our way to both li and ul elements
			const li = e.target.parentNode;
			const ul = li.parentNode;
			const action = button.textContent;
			const textArea = li.querySelector('textarea');

			const nameActions = {
				Remove: () => {
					const span = li.firstElementChild;
					namesInvitees.splice(namesInvitees.indexOf(span.textContent, 1))
					ul.removeChild(li);
			},
				Edit: () => {
					const span = li.firstElementChild;
					const input = document.createElement('input');
					textArea.readOnly = false;
					namesInvitees.splice(namesInvitees.indexOf(span.textContent), 1);
					input.type = 'text';
					input.value = span.textContent;
					li.insertBefore(input, span);
					li.removeChild(span);
					button.textContent = 'Save';
				},
				Save: () => {
					const input = li.querySelector('input');
					const span = document.createElement('span');
					if (namesInvitees.includes(input.value) || input.value === '') {
						alert('Name already in list or name is set to empty.');
					} else {
						textArea.readOnly = true;
						span.textContent = input.value;
						li.insertBefore(span, input);
						li.removeChild(input);
						button.textContent = 'Edit';
						namesInvitees.push(span.textContent);
					}
				}
			};
			// Select and run action in button's name
			nameActions[action]();
		}
	});
});

// Black input added to guest 
// Duplicate names (DONE)
// checked box Confirmed, uncheck Confirm (DONE)
// Hide those who haven't responded, --> hide Confirmed text checkbox (DONE)
// Add notes to each list item (DONE)
// Use local storage to save state of application