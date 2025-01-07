export async function parseResponse<T>(
  response: Response,
): Promise<{ data: T }> {
  return await response.json().then((data) => ({ data: data as T }));
}
