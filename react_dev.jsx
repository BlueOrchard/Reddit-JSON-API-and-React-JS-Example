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
    page;
    prev;
    next;

    constructor(props){
        super(props);

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);

        this.prev = null;
        this.next = null;
        this.page = null;

        this.state = {
            list: []
        };
    }

    componentDidMount(){
        this.redditList();
    }
    
    redditList(){
        console.log('https://www.reddit.com/r/pics/.json?limit=25&after=' + this.page);
        return $.getJSON('https://www.reddit.com/r/pics/.json?limit=25&after=' + this.page)
            .then((data) => {
                this.prev = data.data.before,
                this.next = data.data.after,
                this.setState({
                    list : data.data.children
                })
            });
    }

    listEach(data, i){
        var finalData = data.data;
        return(<IndividualPost data={finalData} key={i} index={i} />)
    }

    prevPage(){
        console.log(this.prev);
        if(this.prev){
            this.page = this.prev;
            this.redditList();
        }
    }

    nextPage(){
        if(this.next){
            this.page = this.next;
            this.redditList();
        }
    }

    render(){
        return <div>
                    <button onClick={this.nextPage}>Next</button>
                    {this.state.list.map(this.listEach)}
               </div>;
    }
}

ReactDOM.render(<PostList />, document.getElementById('app'));