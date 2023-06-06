import fs from 'fs'
import path from 'path'
export const logsPath = path.resolve(process.cwd(), 'logs.txt')

const mock = () => 1

export const generateLog = (message: string) => {
  appendLog(
    `[${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}]  [${message}]\n`
  )
}

const appendLog = (log: string) => {
  fs.appendFile(logsPath, log, mock)
}
