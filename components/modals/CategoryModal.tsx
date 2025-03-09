import React, { useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { MOCK_CATEGORIES } from '@/constants/data';

const { width, height } = Dimensions.get('window');

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
}) => {
  useEffect(() => {
    console.log('CategoryModal mounted');
    return () => {
      console.log('CategoryModal unmounted');
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animatable.View 
          animation="slideInUp"
          duration={300}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Choisissez une catégorie</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome5 name="times" size={20} color="#041cd7" />
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            {MOCK_CATEGORIES.map((category) => (
              <Animatable.View
                key={category.id}
                animation="fadeIn"
                delay={300}
              >
                <TouchableOpacity
                  style={[styles.categoryCard, { backgroundColor: category.color }]}
                  onPress={() => onSelectCategory(category.id)}
                >
                  <FontAwesome5 name={category.icon} size={32} color="#fff" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: height * 0.7,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041cd7',
  },
  closeButton: {
    padding: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  categoryCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.9,
  },
});