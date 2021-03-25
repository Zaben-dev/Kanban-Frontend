import { toast } from 'react-toastify';

const newNotification = (message: string): void => {
  toast.info(message, {
    style: { background: '#008cba' },
    position: 'top-center',
    autoClose: 6000,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};

export default newNotification;
