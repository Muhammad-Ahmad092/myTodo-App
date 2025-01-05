import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AddNoteScreen({ navigation, route }) {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6c5ce7'); // Default color

  const colors = [
    '#FF8A65',
    '#FFB74D',
    '#9575CD',
    '#4DD0E1',
    '#DCE775',
    '#6c5ce7',
  ];

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
        color: selectedColor,
        date: new Date().toLocaleString(),
      };

      // Pass the new note back to the HomeScreen via navigation params
      route.params.addNewNote(newNote);
      navigation.goBack(); // Navigate back to HomeScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titlePrefix}>add</Text>
          Note
        </Text>

      <TextInput
        style={styles.input1}
        placeholder="Note Title"
        value={newNoteTitle}
        onChangeText={setNewNoteTitle}
      />
      <TextInput
        style={styles.input2}
        placeholder="Description of Note"
        value={newNoteContent}
        onChangeText={setNewNoteContent}
      />

      <Text style={styles.colorPickerTitle}>Select Note Color:</Text>
      <View style={styles.colorPicker}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)}
          />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  colorPickerTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
