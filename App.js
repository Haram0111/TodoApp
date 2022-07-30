import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable, TextInput, ScrollView } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from './color'

const STORAGE_KEY="@toDos"

export default function App() {

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async(toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };
  const loadToDos = async() => {
    try{
      const s = await AsyncStorage.getItem(STORAGE_KEY)
      setToDos(JSON.parse(s));
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(()=> {
    loadToDos();
  },[])
  const addTodo = async () => {
    if(text === ""){
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()] : {text, working},});
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback
        underlayColor="#DDDDDD" onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TextInput 
        onSubmitEditing={addTodo}
        onChangeText={onChangeText}
        value={text}
        returnKeyType="done" 
        placeholder={working ? "Add a To Do" : "Where do you want to go?"} 
        style={styles.input}/>
      </View>
      <ScrollView>{
        Object.keys(toDos).map((key) =>
          toDos[key].working === working ?(
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText} >{toDos[key].text}</Text>
          </View>) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20, 
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});