import { toast } from 'react-hot-toast';

export const addClipboard = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data);
    toast.success('Copied!');
  } catch (error) {
    toast.error('Something went wrong.');
  }
};
