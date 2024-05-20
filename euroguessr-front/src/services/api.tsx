export class API {
  private static instance: API; // The singleton instance

  /**
   * The constructor is private to prevent the creation of multiple instances
   */
  private constructor() {}

  /**
   * The getInstance method returns the singleton instance of the API class
   * @returns The singleton instance of the API class
   */
  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   * The get method sends a GET request to the API
   * @param path  The path of the API endpoint
   * @returns The response of the API
   */
  async get(path: string, accountId: string | undefined): Promise<unknown> {
    const response = await fetch(`/api/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accountId: accountId ?? "",
      },
    });
    return await response.json();
  }

  /**
   * The post method sends a POST request to the API
   * @param path The path of the API endpoint
   * @param body The body of the request
   * @returns The response of the API
   */
  async post(
    path: string,
    body: string,
    accountId: string | undefined
  ): Promise<unknown> {
    const response = await fetch(`/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accountId: accountId ?? "",
      },
      body: body,
    });
    return await response.json();
  }

  /**
   * The put method sends a PUT request to the API
   * @param path The path of the API endpoint
   * @param body The body of the request
   * @returns The response of the API
   */
  async put(path: string, body: string): Promise<unknown> {
    const response = await fetch(`/api/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    return await response.json();
  }

  /**
   * The delete method sends a DELETE request to the API
   * @param path The path of the API endpoint
   * @returns The response of the API
   */
  async delete(path: string): Promise<unknown> {
    const response = await fetch(`/api/${path}`, {
      method: "DELETE",
    });
    return await response.json();
  }
}
