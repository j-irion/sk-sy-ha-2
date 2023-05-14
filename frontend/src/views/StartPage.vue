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
                    <label for="TODOInput" class="form-label">Enter new Todo</label>
                    <input type="text" class="form-control" id="TODOInput" placeholder="your TODO">
                </div>
            </div> <br>
            <button class="btn btn-outline-primary ms-2" style="margin-right: 20px;">Add</button>
            <button type="button" class="btn btn-outline-danger">Cancel</button>
        </div>
        <div class="container">
            <table class="table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th scope="col">Todo</th>
                        <th scope="col">Progress</th>
                        <th scope="col">#</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(todo, index) in todos" :key="index">
                        <td>{{ todo.todo }}</td>
                        <td>{{ todo.progress }}</td>
                        <td> <button class="btn btn-outline-primary ms-2">Edit</button></td>
                        <td> <button class="btn btn-outline-danger" @click="kill(index)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="bg-body-tertiary py-4 fixed-bottom">
            <button @click="$router.push('impressum')" class="btn">Impressum</button>
        </footer>
    </body>
</template>
  
<script>
export default {
    name: 'StartPage',
    todo_desc: '',
    todo_progress: 0,

    data() {
        return {
            todos: [
                {
                    todo: 'make homework',
                    progress: '20%'
                },
                {
                    todo: 'watch tv',
                    progress: '56%'
                }
            ]
        }
    },

    methods: {
        edit: function () {

        },

        kill: function (index) {
            this.todos.splice(index, 1)
        }
    }

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>