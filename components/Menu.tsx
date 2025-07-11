import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

// export const MenuComponent:React.FC<{deleteMemo:deleteMemo:() => void, memoNum:number}> = ({deleteMemo,memoNum}) => {
export const MenuComponent = ({deleteMemo,_index}:{deleteMemo:(memoNum:number) => void, _index:number}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleEdit = () => {
    closeMenu();
    console.log('編集');
  };

  const handleDelete = () => {
    closeMenu();
    console.log('削除');
    deleteMemo(_index);
  };

  return (
    <View>
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Feather name="more-vertical" size={20} color="black" />
      </TouchableOpacity>

      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={closeMenu}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.2}
        style={styles.modal}
      >
        <View style={styles.menuContainer}>
          <Pressable onPress={handleEdit} style={styles.menuItem}>
            <Text>編集</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.menuItem}>
            <Text>削除</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingRight: 16,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 0,
    paddingTop: 60,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    width: 120,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
