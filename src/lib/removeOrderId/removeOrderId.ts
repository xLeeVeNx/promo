export const removeOrderId = (url: string): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.delete('order_id');
  return urlObj.toString();
};
