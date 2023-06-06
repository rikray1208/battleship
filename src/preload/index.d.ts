import { ElectronAPI } from '@electron-toolkit/preload'
import { gameAPI } from './Services/Games'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      generateLog: (message: string) => void
    }
  }
}
