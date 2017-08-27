//import "whatwg-fetch";

const DEV_LOCALLY = true;

const INSTANCE_URL = "https://gs0.salesforce.com";
const BASE_URL = "services/data/v41.0";
const URL = `${INSTANCE_URL}/${BASE_URL}`;

const OBJECT_INFO_ENDPOINT = "ui-api/object-info";

const RECORDS_ENDPOINT = "ui-api/records";
const RECORDS_BATCH_ENDPOINT = "ui-api/records/batch";

const SOQL_ENDPOINT = "query";

const ACCESS_TOKEN = {ADD_BY_YOU};

export class SalesforceClient {
    toQueryString(params) {
        const queryParams = [];
        for (const key in params) {
            queryParams.push(
                encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(params[key]));
        }
        return queryParams.join("&");
    }

    fetchListViewsData(recordType) {
        const url = `${URL}/sobjects/${recordType}/listviews/`;
        return this.fetch(url, {});
    }

    fetchListViewContent(resultsUrl) {
        const url = `${INSTANCE_URL}/${resultsUrl}`;
        return this.fetch(url);
    }

    fetchRecordTypeData(recordType) {
        const params = {q: `SELECT id, name from ${recordType}`};
        const soqlUrl = `${URL}/${SOQL_ENDPOINT}/`;
        return this.fetch(soqlUrl, params);
    }

    fetchObjectInfo(recordType) {
        const objectInfoUrl = `${URL}/${OBJECT_INFO_ENDPOINT}/${recordType}`;
        return this.fetch(objectInfoUrl);
    }

    fetchRecord(recordId) {
        return this.fetchRecords([recordId]);
    }

    fetchRecords(recordIds) {
        const params = {layoutTypes: "Full"};
        const recordsUrl = `${URL}/${RECORDS_BATCH_ENDPOINT}/${recordIds.join(
            ",")}`;
        return this.fetch(recordsUrl, params);
    }

    fetchRelatedInfo(relatedType, attribute, condValue) {
        const params = {
            q: `SELECT id, name from ${relatedType} WHERE ${attribute}=\'${condValue}\'`,
        };
        const soqlUrl = `${URL}/${SOQL_ENDPOINT}/`;
        return this.fetch(soqlUrl, params);
    }

    fetch(baseUrl, params = {}) {
        const queryString = this.toQueryString(params);
        let url = queryString ? baseUrl + "?" + queryString : baseUrl;

        return fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
            },
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        });
    }

    update(recordId, params = {}) {
        const url = `${URL}/${RECORDS_ENDPOINT}/${recordId}`;
        const fields = {};
        fields.fields = params;
        const body = JSON.stringify(fields);
        return fetch(url, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
            },
            body: body,
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        });
    }
}
