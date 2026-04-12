import { create } from 'zustand';

interface EnquiryState {
  isOpen: boolean;
  defaultServiceName: string; // Used to auto-fill the "Service Needed" or "Product Inquiry" field
  openEnquiryModal: (productOrServiceName?: string) => void;
  closeEnquiryModal: () => void;
}

export const useEnquiryStore = create<EnquiryState>((set) => ({
  isOpen: false,
  defaultServiceName: 'Other',
  openEnquiryModal: (productOrServiceName = 'Other') => 
    set({ isOpen: true, defaultServiceName: productOrServiceName }),
  closeEnquiryModal: () => set({ isOpen: false }),
}));
