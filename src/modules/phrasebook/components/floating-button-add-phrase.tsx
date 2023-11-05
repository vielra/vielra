import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/core';
import { platformUtils, screenUtils } from '@/modules/app/utilities';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/navigators';
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';

interface Props {
  category?: IPhraseCategory;
}

const FloatingButtonAddPhrase: FC<Props> = ({ category }) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.root}>
      <Button
        rounded
        size='large'
        color='success'
        title='Add New'
        variant='contained'
        iconType='material-icons'
        startIcon='add'
        onPress={() => navigation.navigate('add_phrase_screen', { category })}
        style={styles.overrideBtn}
        textStyle={{ letterSpacing: 1.2, color: '#ffffff', fontSize: 15, fontWeight: 'bold' }}
      />
    </View>
  );
};

const BUTTON_WIDTH = 152;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: platformUtils.isIOS ? 80 : 60,
    left: screenUtils.width / 2 - BUTTON_WIDTH / 2,
  },
  overrideBtn: {
    shadowColor: 'rgba(0,0,0,0.65)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 8,
    width: BUTTON_WIDTH,
  },
});

export default FloatingButtonAddPhrase;
