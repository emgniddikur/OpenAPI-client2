/* tslint:disable */
/* eslint-disable */
/**
 * Swagger Petstore
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Pet,
    PetFromJSON,
    PetToJSON,
} from '../models';

export interface ListPetsRequest {
    limit?: number;
}

export interface ShowPetByIdRequest {
    petId: string;
}

/**
 * PetsApi - interface
 * 
 * @export
 * @interface PetsApiInterface
 */
export interface PetsApiInterface {
    /**
     * 
     * @summary Create a pet
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PetsApiInterface
     */
    createPetsRaw(): Promise<runtime.ApiResponse<void>>;

    /**
     * Create a pet
     */
    createPets(): Promise<void>;

    /**
     * 
     * @summary List all pets
     * @param {number} [limit] How many items to return at one time (max 100)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PetsApiInterface
     */
    listPetsRaw(requestParameters: ListPetsRequest): Promise<runtime.ApiResponse<Array<Pet>>>;

    /**
     * List all pets
     */
    listPets(requestParameters: ListPetsRequest): Promise<Array<Pet>>;

    /**
     * 
     * @summary Info for a specific pet
     * @param {string} petId The id of the pet to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PetsApiInterface
     */
    showPetByIdRaw(requestParameters: ShowPetByIdRequest): Promise<runtime.ApiResponse<Pet>>;

    /**
     * Info for a specific pet
     */
    showPetById(requestParameters: ShowPetByIdRequest): Promise<Pet>;

}

/**
 * 
 */
export class PetsApi extends runtime.BaseAPI implements PetsApiInterface {

    /**
     * Create a pet
     */
    async createPetsRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pets`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a pet
     */
    async createPets(): Promise<void> {
        await this.createPetsRaw();
    }

    /**
     * List all pets
     */
    async listPetsRaw(requestParameters: ListPetsRequest): Promise<runtime.ApiResponse<Array<Pet>>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pets`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PetFromJSON));
    }

    /**
     * List all pets
     */
    async listPets(requestParameters: ListPetsRequest): Promise<Array<Pet>> {
        const response = await this.listPetsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Info for a specific pet
     */
    async showPetByIdRaw(requestParameters: ShowPetByIdRequest): Promise<runtime.ApiResponse<Pet>> {
        if (requestParameters.petId === null || requestParameters.petId === undefined) {
            throw new runtime.RequiredError('petId','Required parameter requestParameters.petId was null or undefined when calling showPetById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pets/{petId}`.replace(`{${"petId"}}`, encodeURIComponent(String(requestParameters.petId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PetFromJSON(jsonValue));
    }

    /**
     * Info for a specific pet
     */
    async showPetById(requestParameters: ShowPetByIdRequest): Promise<Pet> {
        const response = await this.showPetByIdRaw(requestParameters);
        return await response.value();
    }

}
