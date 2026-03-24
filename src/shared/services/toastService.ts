type AddToastCallback = (message: string, color: 'success' | 'danger' | 'warning' | 'info') => void;

class ToastService {
  private addToastCallback: AddToastCallback | null = null;

  setCallbacks(addToast: AddToastCallback) {
    this.addToastCallback = addToast;
  }

  show(message: string, color: 'success' | 'danger' = 'success') {
    if (this.addToastCallback) {
      this.addToastCallback(message, color);
    }
  }
}

export const toastService = new ToastService();