import {SafeAreaView} from 'react-native';
import Section from '../components/Section';
import {TaskScreenNavigationProp} from '../navigation/types';

const TaskScreen = ({navigation, route}: TaskScreenNavigationProp) => {
  const {name: taskName} = route.params;

  return (
    <SafeAreaView>
      <Section title={taskName}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac tempor
        felis, nec consectetur orci. Phasellus eu magna turpis. Duis at magna
        neque. Ut volutpat nunc velit, vel euismod urna finibus volutpat. Aenean
        nisl lectus, auctor vitae pharetra at, tempus vel nisi. Curabitur id
        aliquam mauris, sed consequat lectus. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Etiam nec est ac
        justo iaculis porttitor. Aenean at eros velit. Etiam laoreet pretium
        bibendum. Phasellus euismod nisi lorem, ut vulputate sapien tempus
        vitae. Aenean vestibulum diam augue, quis malesuada metus vehicula sit
        amet. Donec dictum nibh nunc, a suscipit nisl pellentesque eget. Sed in
        risus aliquet, consectetur felis vel, consequat nisl.
      </Section>
    </SafeAreaView>
  );
};

export default TaskScreen;
