<template>
	<section class="todoapp">
		<header class="header">
			<h1>Todos</h1>
			<input type="text" class="new-todo" placeholder="Add task" v-model="newTodo" @keyup.enter="add()">
		</header>
		<div class="main">
			<input id="toggle-all" type="checkbox" class="toggle-all" v-model='allDone' >
            <label for="toggle-all" >Mark all as complete</label>
			<ul class="todo-list">
				<li v-for="(todo, index) in filteredTodos" :key='index'  :class="{editing: todo == editing, completed: todo.completed}">
					<div class="view">
						<input type="checkbox" v-model="todo.completed" class="toggle">
						<label @dblclick="editTodo(todo)">{{todo.name}}</label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
					</div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.esc="cancelEdit" @keyup.enter="doneEdit" @blur="doneEdit" v-focus='todo === editing'>
				</li>
			</ul>
		</div>
		<footer class="footer" v-if='hasTodo'>
			<span class="todo-count">
				<strong>{{remaining}}</strong>
				task{{remaining>1 ? 's' : ''}} remaining
			</span>
			<ul class="filters" >
				<li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">All</a></li>
				<li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">To Do</a></li>
				<li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Done</a></li>
			</ul>
            <button class="clear-completed" @click='clearAllDone()' v-if="hasCompletedTodos">Clear completed</button>
		</footer>
	</section>
</template>
<script>
export default {
	data(){
		return{
			todos: [],
			newTodo: '',
			filter: 'all',
            editing: null,
            oldTodo: null
		}
	},
	methods: {
		add(){
			this.todos.push({name: this.newTodo, completed: false})
			this.newTodo = ''
		},
        deleteTodo(value){this.todos.splice(this.todos.indexOf(value), 1)},
        clearAllDone(){this.todos = this.todos.filter(todo=>!todo.completed)},
        editTodo(todo){
            this.editing = todo
            this.oldTodo = todo.name
        },
        doneEdit(){this.editing = null},
        cancelEdit(){
            this.editing.name = this.oldTodo
            this.doneEdit()
        }
	},
	computed: {
		allDone: {
			get(){
                return this.remaining === 0
			},
			set(value){
                this.todos.forEach(todo=>
                    todo.completed = value
                )
			}
		},
		remaining(){
			return this.todos.filter(todo => !todo.completed).length
		},
        hasTodo(){
            return this.todos.length > 0
        },
        hasCompletedTodos(){
            return this.todos.filter(todo=>todo.completed).length > 0 
        },
		filteredTodos(){
			if (this.filter == 'all'){
				return this.todos	
			} else if (this.filter == 'todo'){
				return this.todos.filter(todo=>!todo.completed)	
			}
			return this.todos.filter(todo=>todo.completed)	
		}
	},
    directives: {
        focus(el,value) {
            if (value){
                el.focus()
            }
        }
    }
}
</script>
<style src='./todos.css'>
</style>