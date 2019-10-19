/**
 * Home Assistant API connection class.
 *
 * @class
 * @author Wouter Bulten
 * @see {@link https://github.com/wouterbulten/home-assistant-js}
 * @version Version: 0.1.0
 * @copyright Copyright 2019 Wouter Bulten
 * @license MIT License
 * @preserve
 */
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
   * @param  {string}  entity       Entity id of the entity.
   * @param  {boolean} [full=false] Whether to return the full state object. Default = false.
   * @return {Promise}
   */
  async getState(entity, full = false) {
    // Create headers for authentication
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    const url = `${this.instance}/api/states/${entity}`;

    const response = await fetch(url, { headers });
    const state = await response.json();

    return full ? state : state['state'];
  }

  /**
   * Get attribute of an entity.
   * @param {string} entity     Entity id of the entity.
   * @param {string} attribute  Name of the attribute.
   * @return {Promise}
   */
  async getAttribute(entity, attribute) {

    const state = await this.getState(entity, true);

    if(!(attribute in state['attributes'])) {
      throw `Attribute ${attribute} does not exist for entity ${entity}.`;
    }

    return state['attributes'][attribute];
  }

  /**
   * Set state of an entity.
   *
   * Returns the new state on success.
   * @param  {string} entity Entity id of the entity.
   * @param  {string} state  New value of the entity.
   * @return {Promise}
   */
  async setState(entity, state) {
    // Create headers for authentication
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    };

    const url = `${this.instance}/api/states/${entity}`
    const body = JSON.stringify({ state });

    const response = await fetch(url, { method: 'POST', headers, body });
    const newState = await response.json();

    return newState['state'];
  }
}
