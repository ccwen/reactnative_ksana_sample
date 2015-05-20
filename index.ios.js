/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
//require("./testkdb");
var kfs = require('NativeModules').KsanaFileSystem; 
global.kfs=kfs;

var Test=require("./main2");
var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var reactnative_ksana_sample = React.createClass({

  render: function() {
    return <Test/>
  },

 
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('reactnative_ksana_sample', () => reactnative_ksana_sample);
