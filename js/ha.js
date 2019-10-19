class HaAPI {

  /**
   * Create a new connection.
   * @param {string} instance URL to the HA instance.
   * @param {string} token    Access token.
   */
  constructor({instance, token}) {
    this.instance = instance;
    this.token = token;
  }

  /**
   * Get state of an entity.
   * @param  {string}  entity entity_id
   * @return {Promise}
   */
  async getState(entity) {
    // Create headers for authentication
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    const url = `${this.instance}/api/states/${entity}`;

    const response = await fetch(url, { headers });

    return await response.json();
  }
}
