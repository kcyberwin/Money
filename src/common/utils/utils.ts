

export const getMethodName = (e: Error): string => {
    const byLine = e.stack?.split('\n') || ['', 'Undefined Stack'];
    let methodName = byLine[1].trim()
    return methodName.split(' ')[1];
}