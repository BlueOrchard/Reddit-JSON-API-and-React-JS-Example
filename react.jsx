
class Comment extends React.Component{

    constructor(props){
    super(props);

    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);

    this.state = {
        editing : false
    }
    }

    edit(){
        this.setState({
        editing : true
        })
    }

    save(){
        var val = this.refs.newText.value;
        this.props.updateCommentText(val, this.props.index);
        this.setState({
        editing : false
        })
    }

    remove(){
        this.props.deleteFromBoard(this.props.index);
    }

    renderNormal(){
    return (<div>
                <p>{this.props.children}</p>
                <button onClick={this.edit}>Edit</button>
                <button onClick={this.remove}>Remove</button>
            </div>);
    }

    renderForm(){
    return (<div>
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button onClick={this.save}>Save</button>
            </div>);
    }

    render(){
        if(this.state.editing){
        return this.renderForm();
        } else {
        return this.renderNormal();
        }
    }
}

class Board extends React.Component{
    constructor(props){
    super(props);

    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.eachComment = this.eachComment.bind(this);
    this.add = this.add.bind(this, "Default text");

    this.state = {
        comments : [
        'Testing',
        'Testing2',
        'Testing3'
        ]
    }
    }

    add(text){
    var arr = this.state.comments;
    arr.push(text);
    this.setState({comments: arr});
    }

    updateComment(newText, i){
    console.log('Updating Comment');
    var arr = this.state.comments;
    arr[i] = newText;
    this.setState({comments: arr});
    }

    removeComment(i){
    console.log('Removing Comment: ' + i);
    var arr = this.state.comments;
    arr.splice(i, 1);
    this.setState({comments: arr});
    }

    eachComment(text, i){
        return (<Comment deleteFromBoard={this.removeComment} updateCommentText={this.updateComment} key={i} index={i} >
                {text}
                </Comment>);
    }

    render(){
    return (<div>
                <button onClick={this.add}>Add New</button>
                <div className="board">
                {this.state.comments.map(this.eachComment)}
                </div>
            </div>);
    }
}
ReactDOM.render(<Board /> , document.getElementById('example'));