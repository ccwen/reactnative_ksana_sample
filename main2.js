var kde=require("ksana-database");
var React=require("react-native");
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles=StyleSheet.create({
	 container: {
	    padding: 30,
	    marginTop: 5,
	    alignItems: 'center'
	  },
	title: {
		fontSize: 10,
		margin: 5,
		backgroundColor:'#FFFFFF',
		color: '#656565'
	},
	searchInput: {
		height: 36,
		padding: 10,
		marginRight: 5,
		flex: 3,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#a4a4a4',
		borderRadius: 6,
		color: '#656565'
	},
  	button: {
	    height: 36,
	    flex: 1,
	    flexDirection: 'row',
	    backgroundColor: '#bb5146',
	    borderColor: '#bb5146',
	    borderWidth: 1,
	    borderRadius: 8,
	    marginBottom: 2,
	    alignSelf: 'stretch',
	    justifyContent: 'center'
	},
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
})

var Test=React.createClass({
	getInitialState:function() {
		return {db:null,text:"",tofind:"0.1"}
	}
	,componentDidMount:function() {
		var that=this;
		kde.open("cbeta",function(err,db){
			setTimeout(function(){
				if (db) that.setState({db:db});
			},500)
		},this);
	}
	,getText:function(tofind) {
		if (!this.state.db) return "";
		var that=this;
		var sp=tofind.split(".");
		var f=parseInt(sp[0]||"0");
		var p=parseInt(sp[1]||"0");
		this.state.db.get(["fileContents",f,p],function(data){
			that.setState({text:data});
			setTimeout(function(){
				that.refs.tofind.focus();	
			},10);
			
		})
	}
	,onSearchPressed:function(e){
		this.getText(this.state.tofind);
	}
	,onSearchTextChanged:function(event){
	    this.setState({
	      tofind: event.nativeEvent.text
	    });
	}
	,onSubmit:function(event){
		this.getText(this.state.tofind);
	}
	,render:function() {
		return <View style={styles.container}>

		 <View style={styles.flowRight}>
	      <TextInput
	      	autoFocus={true}
	      	ref="tofind"
            style={styles.searchInput}
            value={this.state.tofind}
            onChange={this.onSearchTextChanged}
          	onEndEditing={this.onSubmit}
            placeholder='input page number' />		
         	<TouchableHighlight
              style={styles.button}
              underlayColor='#a72e21'
              onPress={this.onSearchPressed}>              
            <Text style={styles.buttonText}>fetch</Text>
          </TouchableHighlight>
          </View>

		<Text style={styles.title}>{this.state.text}</Text>

		</View>
	}
})

module.exports=Test;
