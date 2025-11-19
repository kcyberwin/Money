export const getMethodName = (e: Error): string => {
  const byLine = e.stack?.split('\n') || ['', 'Undefined Stack'];
  const methodName = byLine[1].trim();
  return methodName.split(' ')[1];
};

export const formatDateForDB = (dateIn: Date): string => {
  const year = dateIn.getFullYear();
  const month = (dateIn.getMonth() + 1).toString().padStart(2, '0');
  const day = dateIn.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
