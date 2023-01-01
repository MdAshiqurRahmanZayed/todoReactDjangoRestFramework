import './App.css';
import React, { Component } from 'react'

export default class App extends Component {

  constructor(props){
    super(props);
      this.state  = {
        todoList:[],
        activeItem:{
          id:null,
          title:'',
          completed:false,
        },
        editing:false,
      }
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.startEdit = this.startEdit.bind(this)
      this.deleteEdit = this.deleteEdit.bind(this)
      this.strikeUnstrike = this.strikeUnstrike.bind(this)


  };


    getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }


  componentWillMount(){
    this.fetchTasks()
  }
  fetchTasks(){
    console.log("fetching");
    fetch('http://127.0.0.1:8000/api/todo-list/')
    .then(response =>response.json())
    .then(data =>
        this.setState({
          todoList:data
        })
      )
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log('Name',name);
    console.log('value', value);

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log("ITEM" ,this.state.activeItem);
    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/todo-create/'
    
    if (this.state.editing === true) {

      url = `http://127.0.0.1:8000/api/todo-update/${this.state.activeItem.id}`
      this.setState({
        editing:false
      })
      
    }

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(this.state.activeItem)
      })
      .then((response) => {
        console.log(response);
        this.fetchTasks()
        this.setState({
          activeItem: {
            id: null,
            title: '',
            completed: false,
          }
        })
      })

      .catch(function (error) {
        console.log('ERROR:', error)
      })

  }

  startEdit(todo) {
    this.setState({
      activeItem: todo,
      editing: true,
    })
  }
  deleteEdit(todo){
    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/todo-delete/${todo.id}`



    fetch(url,{
     method:"DELETE",
     headers:{
      'Content-type':"application/json",
      'X-CSRFToken':csrftoken,
     },

    })
    .then((response) =>{
      this.fetchTasks()
    })

  }

  strikeUnstrike(todo){

    todo.completed = !todo.completed
    var url = `http://127.0.0.1:8000/api/todo-update/${todo.id}`

    var csrftoken = this.getCookie('csrftoken')


      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'completed': todo.completed, 'title':todo.title})
      })
      .then(() => {
        this.fetchTasks()
      })

    console.log('TASK:', todo.completed)
    console.log(todo.completed);
    
  }




  render() {
    var task = this.state.todoList
    var self = this
    return (
      <div>
          <div className="container">
            <div id="task-container">
                <div id="form-wrapper">
                  <form onSubmit={this.handleSubmit} id="form">
                    <div className="flex-wrapper">
                      <div style={{flex: 6}}>
                        {/* <input id="title" className="form-control" type="text" name="title" placeholder="Add task"> */}
                        <input id="title" onChange={this.handleChange} className="form-control" value={this.state.activeItem.title} type="text" name="title" placeholder="Add task" />
                      </div>
                      <div style={{flex: 1}}>
                        <input style={{marginLeft:10}} id="submit" className="ml-3 btn rounded" type="submit" value={"Submit"} />
                      </div>
                    </div>
                  </form>
                </div>

                <div id="list-wrapper">
                  {task.map(function name(todo,index) {
                    return (
                      <div key={index} className="task-wrapper flex-wrapper">
                          <div onClick={() => self.strikeUnstrike(todo)}  style={{flex:7}} className="">
                            {todo.completed === false ? (
                              <span>{todo.title}</span>
                              
                              ):(
                              <strike>{todo.title}</strike>

                            )}
                          </div>
                         <div style={{flex:1}}>
                                <button onClick={() => self.startEdit(todo)} className="btn btn-sm btn-outline-info">Edit</button>
                          </div>
                         <div style={{flex:1}}>
                                <button onClick={() => self.deleteEdit(todo)} className="btn btn-sm btn-outline-danger">Delete</button>
                          </div>
                          
                      </div>
                    )
                  })}
        
                 </div>	
            </div>
          </div>
        


      </div>
    )
  }
}



