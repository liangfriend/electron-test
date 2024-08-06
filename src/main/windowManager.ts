import { BrowserWindow } from "electron"

const windowMap: Map = new Map()

export function setWindowMap(name, window: BrowserWindow) {
    windowMap.set(name,window)
}
export function getWindowMap(name, window: BrowserWindow) {
    return windowMap.get(name)
}
