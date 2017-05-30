class IndividualPost extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
                    <p>{this.props.data.title}</p>
               </div>;
    }
}

class PostList extends React.Component{
    constructor(props){
        super(props);

        this.checkState = this.checkState.bind(this);

        this.state = {
            page: null,
            prev: null;
            next: null,
            list: []
        };
    }

    componentDidMount(){
        this.redditList();
    }
    
    redditList(){
        return $.getJSON('https://www.reddit.com/r/pics/.json?limit=25&after=' + this.state.page)
            .then((data) => {
                this.setState({list : data.data.children})
            });
    }

    checkState(){
        console.log(this.state.list);
    }

    listEach(data, i){
        var finalData = data.data;
        return(<IndividualPost data={finalData} key={i} index={i} />)
    }

    prev(){

    }

    next(){

    }

    render(){
        return <div>
                    <button onClick={this.prev}>Previous</button>
                    <button onClick={this.next}>Next</button>
                    {this.state.list.map(this.listEach)}
               </div>;
    }
}

ReactDOM.render(<PostList />, document.getElementById('app'));