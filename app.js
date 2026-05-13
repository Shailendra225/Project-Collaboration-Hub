console.log("APP JS LOADED");


// SIGNUP

function signup(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)

    .then((userCredential)=>{

        const user = userCredential.user;

        db.collection("users").doc(user.uid).set({
            email: email,
            uid: user.uid,
            createdAt: new Date()
        });

        alert("Signup Successful");

        window.location.replace("dashboard.html");

    })

    .catch((error)=>{
        alert(error.message);
        console.log(error);
    });
}


// LOGIN

function login(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email,password)

    .then(()=>{

        alert("Login Successful");

        window.location.replace("dashboard.html");

    })

    .catch((error)=>{
        alert(error.message);
        console.log(error);
    });
}


// LOGOUT

function logout(){

    auth.signOut()

    .then(()=>{

        alert("Logged Out Successfully");

        window.location.replace("login.html");

    })

    .catch((error)=>{
        alert(error.message);
    });
}


// CREATE PROJECT

function createProject(){

    const projectName = document.getElementById('projectName').value;

    if(projectName === ""){
        alert("Please Enter Project Name");
        return;
    }

    db.collection('projects').add({

        name: projectName,
        createdAt: new Date()

    })

    .then(()=>{

        alert("Project Created Successfully");

        document.getElementById('projectName').value = "";

        loadProjectCount();

    })

    .catch((error)=>{
        alert(error.message);
    });
}


// ADD TASK

function addTask(){

    const taskName = document.getElementById('taskName').value;
    const assignedTo = document.getElementById('assignedTo').value;

    if(taskName === "" || assignedTo === ""){
        alert("Please Fill All Fields");
        return;
    }

    db.collection('tasks').add({

        taskName: taskName,
        assignedTo: assignedTo,
        status: 'Pending',
        createdAt: new Date()

    })

    .then(()=>{

        alert("Task Added Successfully");

        document.getElementById('taskName').value = "";
        document.getElementById('assignedTo').value = "";

    })

    .catch((error)=>{
        alert(error.message);
    });
}


// LOAD TASKS

function loadTasks(){

    const taskList = document.getElementById('taskList');

    if(!taskList) return;

    db.collection('tasks').onSnapshot((snapshot)=>{

        taskList.innerHTML = "";

        let completed = 0;

        document.getElementById('taskCount').innerText = snapshot.size;

        snapshot.forEach((doc)=>{

            const task = doc.data();

            if(task.status === 'Completed'){
                completed++;
            }

            taskList.innerHTML += `

                <div class="task-card">

                    <h4>${task.taskName}</h4>

                    <p><strong>Assigned To:</strong> ${task.assignedTo}</p>

                    <p><strong>Status:</strong> ${task.status}</p>

                    <button onclick="markCompleted('${doc.id}')">
                        Mark Completed
                    </button>

                </div>
            `;
        });

        document.getElementById('completedCount').innerText = completed;

    });
}


// MARK COMPLETE

function markCompleted(id){

    db.collection('tasks').doc(id).update({
        status: 'Completed'
    });
}


// PROJECT COUNT

function loadProjectCount(){

    db.collection('projects').get()

    .then((snapshot)=>{

        document.getElementById('projectCount').innerText = snapshot.size;

    });
}


// AUTH PROTECTION

firebase.auth().onAuthStateChanged((user)=>{

    if(!user && window.location.pathname.includes('dashboard.html')){

        window.location.replace('login.html');
    }
});


// AUTO LOAD

window.onload = function(){

    loadTasks();

    loadProjectCount();
}


// GLOBAL FUNCTIONS

window.signup = signup;
window.login = login;
window.logout = logout;
window.createProject = createProject;
window.addTask = addTask;
window.markCompleted = markCompleted;
