
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GlowDialog } from "@/components/ui/glow-dialog";

interface EmailDialogProps {
  show: boolean;
  onClose: () => void;
  creatorName: string;
}

export const EmailDialog: React.FC<EmailDialogProps> = ({ show, onClose, creatorName }) => {
  return (
    <GlowDialog open={show} onOpenChange={onClose} />
  );
};
