import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Cargando...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url;
    //url = "https://rupinwhitehatjr.github.io/dictionary/searchKeyword.json"
    //url = "https://rupinwhitehatjr.github.io/dictionary/"+ +".json"
    //url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //url = "https://rupinwhitehatjr.github.io/dictionary/"+word+".json"

    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{

        var responseObject = response
        if(responseObject)
        {
          var wordData = responseObject.definitions[0]

          var definition=wordData.description
          var lexicalCategory=wordData.wordtype

          this.setState({
            "palabra" : this.state.text, 
            "definición" :definition,
            "CategoriaLexica": lexicalCategory     
            
          })
        }
        else
        {
          this.setState({
            "palabra" : this.state.text, 
            "definición" :"No encontrado",
            
          })

        }
    
    })
  }

  render(){
    return(
      <View style={{flex:1, borderWidth:2}}>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Diccionadio de bolsillo',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <View style={styles.inputBoxContainer}>
      
        <Text 
           onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Cargando...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
           }}
        />
  
     {/*   <input 
           onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Cargando...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
           }}
        /> 
        */}
      {/*
      <TouchableOpacity 
           onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Cargando...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
           }}
        /> 
      */}
      {/*
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Cargando...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
            }}
            value={this.state.text}
          />
  ``````*/}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Cargando..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Cargando..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  }
});
