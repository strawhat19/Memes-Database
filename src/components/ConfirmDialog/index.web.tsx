import { useEffect, useRef } from 'react';
import { Icon } from '../Icon';

const ConfirmDialog = ({ open, title, description, confirmLabel, pending = false, onCancel, onConfirm }: { open: boolean; title: string; description: string; confirmLabel: string; pending?: boolean; onCancel: () => void; onConfirm: () => void }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open && !dialog.current?.open) dialog.current?.showModal(); if (!open && dialog.current?.open) dialog.current?.close(); }, [open]);
  return <dialog id={`confirmation-dialog`} className={`confirmation-dialog`} ref={dialog} aria-labelledby={`confirmation-title`} aria-describedby={`confirmation-description`} onCancel={event => { event.preventDefault(); if (!pending) onCancel(); }}><div className={`dialog-heading`}><h2 id={`confirmation-title`}>{title}</h2><button id={`confirmation-close`} className={`icon-button`} aria-label={`Close confirmation`} disabled={pending} onClick={onCancel}><Icon name={`close`} /></button></div><p id={`confirmation-description`}>{description}</p><div className={`dialog-actions`}><button id={`confirmation-cancel`} className={`button button-secondary`} disabled={pending} onClick={onCancel}>Keep it</button><button id={`confirmation-confirm`} className={`button button-danger`} disabled={pending} onClick={onConfirm}>{pending ? `Working…` : confirmLabel}</button></div></dialog>;
};

export default ConfirmDialog;
