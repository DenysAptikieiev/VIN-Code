export default class VinService {
    constructor() {
        this._apiBase = 'https://vpic.nhtsa.dot.gov/api';
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) throw new Error(`Couldn't fetch ${this._apiBase}${url} status: ${res.status}`);
        return await res.json();
    }

    vehicleCharacteristics(vin) {
        return this.getResource(`/vehicles/decodevin/${vin}?format=json`)
    }

    getVehicleVariablesList(vin) {
        return this.getResource(`/vehicles/getvehiclevariablelist/${vin}?format=json`)
    }
}