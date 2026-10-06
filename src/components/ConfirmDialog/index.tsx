import { useEffect } from 'react';
import { Alert } from 'react-native';

const ConfirmDialog = ({ open, title, description, confirmLabel, pending = false, onCancel, onConfirm }: { open: boolean; title: string; description: string; confirmLabel: string; pending?: boolean; onCancel: () => void; onConfirm: () => void }) => {
  useEffect(() => { if (open && !pending) Alert.alert(title, description, [{ text: `Keep it`, style: `cancel`, onPress: onCancel }, { text: confirmLabel, style: `destructive`, onPress: onConfirm }], { onDismiss: onCancel }); }, [open]);
  return null;
};
export default ConfirmDialog;
