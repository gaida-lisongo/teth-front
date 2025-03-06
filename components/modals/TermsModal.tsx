import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { CustomButton } from '@/components/buttons';
import * as Animatable from 'react-native-animatable';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

export const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animatable.View 
          animation="fadeInUp"
          duration={300}
          style={styles.modalContent}
        >
          <Text style={styles.title}>Conditions d'utilisation</Text>
          
          <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>1. Admissibilité</Text>
            <Text style={styles.text}>
              • Vous devez avoir au moins 18 ans pour utiliser Teth{'\n'}
              • Une seule inscription par personne est autorisée
            </Text>

            <Text style={styles.sectionTitle}>2. Règles du jeu</Text>
            <Text style={styles.text}>
              • Chaque partie coûte 1 pièce{'\n'}
              • Une partie comprend 3 questions{'\n'}
              • Vous avez 20 secondes par question{'\n'}
              • Toute réponse incorrecte met fin à la partie
            </Text>

            <Text style={styles.sectionTitle}>3. Gains et Retraits</Text>
            <Text style={styles.text}>
              • Une partie gagnée rapporte 3000 Fc{'\n'}
              • Le retrait minimum est de 5000 Fc{'\n'}
              • Les gains sont crédités instantanément
            </Text>

            <Text style={styles.sectionTitle}>4. Responsabilités</Text>
            <Text style={styles.text}>
              • Vous êtes responsable de la sécurité de votre compte{'\n'}
              • Toute tentative de triche entraînera la suspension du compte{'\n'}
              • Les décisions de l'équipe Teth sont définitives
            </Text>
            
            <Text style={styles.sectionTitle}>5. Confidentialité</Text>
            <Text style={styles.text}>
              • Vos données personnelles sont protégées{'\n'}
              • Nous ne partageons pas vos informations avec des tiers{'\n'}
              • Vous pouvez demander la suppression de vos données
            </Text>
          </ScrollView>

          <CustomButton
            title="J'accepte"
            onPress={onClose}
            variant="primary"
            size="medium"
            style={styles.button}
          />
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    height: height * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041cd7',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#de8015',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});