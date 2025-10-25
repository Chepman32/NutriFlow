/**
 * Barcode Scanner Service (Stub)
 * Camera integration for barcode scanning
 */

export class BarcodeScannerService {
  async requestPermissions(): Promise<boolean> {
    console.log('Camera: Requesting permissions (stub)');
    return true;
  }

  async scanBarcode(): Promise<string | null> {
    console.log('Camera: Scanning barcode (stub)');
    return null;
  }
}

export const barcodeScannerService = new BarcodeScannerService();
