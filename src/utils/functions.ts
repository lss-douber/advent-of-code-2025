export async function readFileFromPath(path: string): Promise<string> {
  const file = Bun.file(path);
  return (await file.text()).trim();
}
