// function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return []; // Return an empty array if there's an error
  }
}

// function to display fetched data in the list
async function displayData() {
  const taskList = document.getElementById('taskList');
  const data = await fetchData();

  if (data) {
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('task-item');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;

      const textSpan = document.createElement('span');
      textSpan.innerText = item.title;

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash');

      checkbox.addEventListener('change', function() {
        item.completed = this.checked;
        textSpan.style.textDecoration = this.checked ? 'line-through' : 'none';
        saveToLocalStorage(data);
      });

      deleteIcon.addEventListener('click', function() {
        const index = data.indexOf(item);
        if (index > -1) {
          data.splice(index, 1);
          saveToLocalStorage(data);
          showData(data);
        }
      });

      listItem.appendChild(checkbox);
      listItem.appendChild(textSpan);
      listItem.appendChild(deleteIcon);
      taskList.appendChild(listItem);

      if (item.completed) {
        textSpan.style.textDecoration = 'line-through';
      }
    });
  }
}

// function to add new item to list
function saveFunction() {
  const inputText = document.getElementById('input').value.trim();
  const checkbox = document.getElementById('checkbox').checked;
  const taskList = document.getElementById('taskList');

  if (inputText !== '') {
    const newItem = {
      title: inputText,
      completed: checkbox,
    };

    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.checked = newItem.completed;

    const newTextSpan = document.createElement('span');
    newTextSpan.innerText = newItem.title;

    const newDeleteIcon = document.createElement('i');
    newDeleteIcon.classList.add('fas', 'fa-trash');

    newCheckbox.addEventListener('change', function() {
      newItem.completed = this.checked;
      newTextSpan.style.textDecoration = this.checked ? 'line-through' : 'none';
      saveToLocalStorage(data);
    });

    newDeleteIcon.addEventListener('click', function() {
      const index = data.indexOf(newItem);
      if (index > -1) {
        data.splice(index, 1);
        saveToLocalStorage(data);
        showData(data);
      }
    });

    listItem.appendChild(newCheckbox);
    listItem.appendChild(newTextSpan);
    listItem.appendChild(newDeleteIcon);
    taskList.appendChild(listItem);

    if (newItem.completed) {
      newTextSpan.style.textDecoration = 'line-through';
    }
  }

// clear input field and checkbox after submit
  document.getElementById('input').value = '';
  document.getElementById('checkbox').checked = false;
}

window.onload = function() {
  displayData();
};
