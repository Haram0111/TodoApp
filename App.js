import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable, TextInput } from 'react-native';
import { theme } from './color'

export default function App() {

  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

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
        <TextInput returnKeyType="done" placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input}/>
      </View>
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
    marginTop: 20,
    fontSize: 18,
  }
});
