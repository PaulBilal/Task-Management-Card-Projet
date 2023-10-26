let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    }

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({id, url, title, type, description}) =>{
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="card-header d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info">
                        <i class="fas fa-pencil-alt"></i>
                    <button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="far fa-trash-alt"></i>
                    <button>  
                </div>
            </div>
            <img src=${url} class="card-img-top" alt="image"/>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end"> OPEN TASK</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("nikhiltasks", JSON.stringify({nikhil: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("nikhiltasks"));
    console.log(localStorageCopy);
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["nikhil"];
    }
    console.log(globalTaskData)
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    console.log(e)
    const targetID = e.target.getAttribute("name");
    console.log(targetID)
    const type = e.target.tagName;
    console.log(type)
    const removedTask = globalTaskData.filter((id) => id!==targetID);
    globalTaskData = removedTask;
}