import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'This is Docket note',
      content: '',
      color: '#FF8A65',
      date: new Date().toLocaleString(),
    },
    {
      id: '2',
      title: 'The beginning of screenless design:',
      content: 'UI jobs to be taken over by Solution Architect',
      date: 'May 21, 2020',
      color: '#FFB74D',
    },
  ]);

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity style={[styles.noteCard, { backgroundColor: item.color }]}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      {item.content ? <Text style={styles.noteContent}>{item.content}</Text> : null}
      <View style={styles.noteFooter}>
        {item.date && <Text style={styles.noteDate}>{item.date}</Text>}
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Feather name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerPrefix}>my</Text>
          Todo
        </Text>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('addNote')}
          >
            <Feather name="plus" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Notes Grid */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes</Text>
          <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.notesGrid}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  headerPrefix: {
    color: '#6c5ce7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 60,
    paddingVertical: 20,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notesContainer: {
    flex: 1,
    padding: 20,
  },
  notesTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notesGrid: {
    justifyContent: 'space-between',
  },
  noteCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    minHeight: 150,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  noteContent: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 10,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  noteFooter: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
  noteDate: {
    fontSize: 12,
    opacity: 0.6,
    fontFamily: 'Solitreo-Regular', // Apply Solitreo font
  },
});
