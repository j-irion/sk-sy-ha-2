<template>
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
    </head>

    <body>
        <h2>Todo App</h2>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <label for="textInput" class="form-label">Todo</label>
                    <input id="textInput" type="text" v-model="text" class="form-control" placeholder="your TODO">
                    <label for="dateInput" class="form-label">Date</label>
                    <input id="dateInput" type="date" v-model="date" class="form-control">
                    <label for="percentageInput" class="form-label">Percentage Done</label>
                    <input id="percenTageInput" type="number" v-model="percentage" class="form-control">
                </div>
            </div> <br>
            <button class="btn btn-outline-primary ms-2" @click="add()" style="margin-right: 20px;">Add</button>
            <button type="button" class="btn btn-outline-danger" @click="clearTodo()">Cancel</button>
        </div>
        <div class="container">
            <table class="table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Todo</th>
                        <th scope="col">Date</th>
                        <th scope="col">Percentage Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(todo, index) in todos" :key="index">
                        <td><input class="form-check-input" type="checkbox" value="" v-model="todo.done" @change="updateTodoStatus(todo)"></td>
                        <td>{{ todo.text }}</td>
                        <td>{{ todo.date }}</td>
                        <td>{{ todo.percentage }}%</td>
                        <td> <button class="btn btn-outline-primary ms-2" @click="changingTodo = todo" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                        <td> <button class="btn btn-outline-danger" @click="deleteTodo(todo._id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <footer class="bg-body-tertiary py-4 fixed-bottom">
            <button @click="impressumVisible = true" class="btn" data-bs-toggle="modal" data-bs-target="#impressumModal">Impressum</button>
        </footer>

        <div class="modal fade" id="impressumModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Impressum</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Julius Irion</p>
                        <p>Hans Tamar</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" v-model="changingTodo.text">
                        <input type="date" class="form-control" v-model="changingTodo.date">
                        <input type="number" class="form-control" v-model="changingTodo.percentage">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTodo(changingTodo)">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </body>
</template>
  
<script>

export default {
    name: 'StartPage',
    
    data() {
        return {
            text: '',
            date: new Date().toLocaleDateString('en-CA'),
            percentage: 0,
            todos: [],
            doneLoading: false,
            changingTodo: {
                text: '',
                date: '',
                percentage: 0,
                done: false,
            },
        };
    },
    created: function() {
        this.fetchTodo();
    },
    watch: {
        $route: function() {
            let self = this;
            self.doneLoading = false;
            self.fetchData().then(() => self.doneLoading = true);
        }
    },

    methods: {

        fetchTodo() {
            this.$http.get('/').then(response => {
                this.todos = response.data;
            });
        },

        add() {
            if (this.text.length === 0) return;
            if (this.percentage < 0 || this.percentage > 99) return;
            let todo = {
                text: this.text,
                date: this.date,
                percentage: this.percentage,
                done: false,
            };
            console.log(todo);
            this.$http
                .post('/', todo)
                .then(() => {
                    this.clearTodo();
                    this.fetchTodo();
                })
                .catch(error => console.log(error));
        },

        updateTodo(todo) {
            if (todo.text.length === 0) return;
            if (todo.percentage < 0 || todo.percentage > 99) return;
            let id = todo._id;
            this.$http
                .put(`/${id}`, todo)
                .then(response => console.log(response))
                .catch(error => console.log(error));
            this.clearChangingTodo();
        },

        deleteTodo(id) {
            this.$http.delete(`/${id}`).then(() => this.fetchTodo());
        },

        clearTodo() {
            this.text = '';
            this.date = new Date().toLocaleDateString('en-CA');
            this.percentage = 0;
        },

        clearChangingTodo() {
            this.changingTodo = {
                text: '',
                date: '',
                percentage: 0,
                done: false,
            };
        },

        updateTodoStatus(todo) {
            this.$http.put(`/${todo._id}`, todo)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
    }

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>