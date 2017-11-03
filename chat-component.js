var ChatApp = React.createClass({
    getInitialState: function() {
        return {
            messages: [],
            socket: window.io('http://localhost:3000'),
            user: undefined
        }
    },

    componentDidMount: function() {
        var self= this;

        this.state.socket.on('receive_msg', function(msg){
            var messages = self.state.messages;
                messages.push(msg);
            self.setState({
                messages: messages
            });
            console.log(self.state.messages);
        });
    },

    submitMessage: function() {
      var body = document.getElementById("message").value;
      var message  = {
        body: body,
        user: this.state.user || "guest"
      };

      this.state.socket.emit('new_msg', message);
    },

    chooseName: function() {
        var user= document.getElementById('user').value;
        this.setState({user:user});
    },

    render: function() {
        var self = this;

        var messages = self.state.messages.map(function(msg){
            return <li><strong>{msg.user}</strong><span> {msg.body}</span></li>
        });

        return (
            <div>
                <ul>
                    {messages}
                </ul>
                <input type="text" id="message"/>
                    <button onClick={() => self.submitMessage()}>Send</button><br/>

                <input id="user" type="text" placeholder="Choose a Username" />
                    <button onClick={() => self.chooseName()}>Choose Name</button>

            </div>
        )
    }
} );

ReactDOM.render(<ChatApp/>, document.getElementById('chat'));