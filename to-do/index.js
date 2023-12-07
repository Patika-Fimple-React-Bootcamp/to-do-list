// localStorage'dan 'todoList' verisini alir, veri yoksa bos dizi doner
function getStoredData() {
  const storedData = localStorage.getItem('todoList');
  return storedData ? JSON.parse(storedData) : [];
}
 // verilen data'yi JSON i cevirir
function saveToLocalStorage(data) {
  localStorage.setItem('todoList', JSON.stringify(data));
}
// 'taskList' elementini alir ve icerigini temizler
function showData(data) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
//her item icin li elementi olusturur
  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item'); 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
// checkbox kontrol
    checkbox.addEventListener('change', function() {
      item.completed = this.checked;
      listItem.classList.toggle('checked', this.checked);
      saveToLocalStorage(data);
    });

    const textSpan = document.createElement('span');
    textSpan.innerText = item.title;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
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

    // Gorev tamamlanmissa, ustunu ciz
    if (item.completed) {
      textSpan.style.textDecoration = 'line-through';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const storedData = getStoredData();
  if (storedData.length === 0) {
    const defaultData = [
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      }
      // Diğer varsayılan görevler buraya eklenebilir
    ];
    saveToLocalStorage(defaultData);
    showData(defaultData);
  } else {
    showData(storedData);
  }
});
document.getElementById('addButton').addEventListener('click', function() {
  const inputValue = document.getElementById('input').value.trim();
  if (inputValue !== '') {
    const storedData = getStoredData();
    const checkbox = document.getElementById('checkbox').checked; // checkbox durumunu al

    const newTask = {
      "userId": 1,
      "id": storedData.length + 1,
      "title": inputValue,
      "completed": checkbox // checkbox durumuna gore completed ozelligini belirle
    };

    storedData.push(newTask);
    saveToLocalStorage(storedData);
    showData(storedData);
    document.getElementById('input').value = '';
  }
});
