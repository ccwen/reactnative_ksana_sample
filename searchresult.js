var React=require("react-native");

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles=StyleSheet.create({
	 container: {
	    padding: 30,
	    marginTop: 5,
	    alignItems: 'center'
	  },
	text: {
		fontSize: 20,
		margin: 5,
		backgroundColor:'#FFFFFF',
		color: '#656565'
	},
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  highlight:{
  	color:"#FF7F7F"
  }
})

var highlight=function(text,hits){
	var ex=0,out=[];
	for (var i=0;i<hits.length;i++) {
		var now=hits[i][0];
		if (now>ex) {
			out.push(<Text key={ex}>{text.substring(ex,now)}</Text>);
		}
		out.push(<Text key={'h'+ex} style={styles.highlight}>{text.substr(now,hits[i][1])}</Text>);
		ex=now+=hits[i][1];
	}
	out.push(<Text key={ex}>{text.substr(ex)}</Text>);
	return out;
}
var SearchResult=React.createClass({
	getDefaultProps:function() {
		return {excerpts:[]}
	},
	renderItem:function(item) {
		return <Text style={styles.text} children={highlight(item.text,item.realHits)} />
	}
	,render:function() {
		return <ScrollView height={850}>{this.props.excerpts.map(this.renderItem)}</ScrollView>
	}

});
module.exports=SearchResult;