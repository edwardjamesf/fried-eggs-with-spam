export async function handleError(error: Error): Promise<void> {
  console.log(error);
  alert(error.message);
}