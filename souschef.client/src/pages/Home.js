import {SafeAreaView, StatusBar, Button} from 'react-native';
import {Section} from '../components';

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <Section>
        <Button
          title="Task #1"
          onPress={() => navigation.navigate('Task', {name: 'Task #1'})}
        />
      </Section>
    </SafeAreaView>
  );
};

export default Home;
