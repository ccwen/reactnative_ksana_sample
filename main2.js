var React=require("react-native");
var kde=require("ksana-database");
var kse=require("ksana-search");
var SearchResult=require("./searchresult");
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
		fontSize: 24,
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
		return {db:null,text:"",excerpts:[],tofind:"菩提"}
	}
	,componentDidMount:function() {
		var that=this;
		kde.open("moedict",function(err,db){
			setTimeout(function(){
				if (db) that.setState({db:db});
			},500)
		},this);
	}
	,search:function(tofind) {
		kse.search(this.state.db,tofind,{nohighlight:true,range:{maxhit:10}},function(err,data){
			console.log("result length",Object.keys(data),err)
			this.setState({excerpts:data.excerpt||[],text:""});
		}.bind(this));
	}
	,getText:function(tofind) {
		if (!this.state.db) return "";
		var that=this;
		var sp=tofind.split(".");
		if (sp.length==1) return this.search(tofind);

		var f=parseInt(sp[0]||"0");
		var p=parseInt(sp[1]||"0");
		this.state.db.get(["filecontents",f,p],function(data){
			that.setState({text:data,excerpts:[]});
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
		<SearchResult excerpts={this.state.excerpts}/>

		</View>
	}
})

module.exports=Test;
