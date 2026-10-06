import { NativeMemeCard } from '../NativePage';
import type { MemeRecord } from '../../shared/models/Meme';

const MemeCard = ({ meme }: { meme: MemeRecord; active?: boolean; carousel?: boolean }) => <NativeMemeCard meme={meme} />;
export default MemeCard;
