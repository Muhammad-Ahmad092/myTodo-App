import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AddNoteScreen({ navigation, route }) {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6c5ce7'); // Default color

  const colors = ['#FF8A65', '#FFB74D', '#9575CD', '#4DD0E1', '#DCE775', '#6c5ce7'];

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
        color: selectedColor,
        date: new Date().toLocaleString(),
      };

      if (route.params?.addNewNote) {
        route.params.addNewNote(newNote);
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titlePrefix}>add</Text>
          Note
        </Text>
      <TextInput style={styles.input1} placeholder="Title" value={newNoteTitle} onChangeText={setNewNoteTitle} />
      <TextInput style={styles.input2} placeholder="Content" value={newNoteContent} onChangeText={setNewNoteContent} multiline />
      <View style={styles.colorPicker}>
        {colors.map((color) => (
          <TouchableOpacity key={color} style={[styles.colorCircle, { backgroundColor: color }]} onPress={() => setSelectedColor(color)} />
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Feather name="check" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titlePrefix: {
    color: '#6c5ce7',
  },
  input1: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
    marginBottom: 10,
  },
  input2: {
    width: '100%',
    height: 110,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
    marginBottom: 10,
  },
  colorPicker: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  colorCircle: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    margin: 5 },
  addButton: { 
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#6c5ce7',
  justifyContent: 'center',
  alignItems: 'center',
  }
});
