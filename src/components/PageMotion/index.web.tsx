import { usePageMotion, type PageMotionProps } from './usePageMotion';
import './styles.scss';

const PageMotion = (props: PageMotionProps) => {
  usePageMotion(props);
  return null;
};

export default PageMotion;
