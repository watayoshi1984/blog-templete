"use client"

import { toast } from 'sonner';

// トースト表示のアクション関数を定義
const dismissToast = () => {
  toast.dismiss();
};

export function useToast() {
  return {
    toast,
    dismiss: dismissToast,
  };
}
