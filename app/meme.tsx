import { useLocalSearchParams } from 'expo-router';
import MemeDetailPage from '../src/components/MemeDetailPage';

const MemeRoute = () => {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <MemeDetailPage id={id ?? ``} />;
};

export default MemeRoute;
