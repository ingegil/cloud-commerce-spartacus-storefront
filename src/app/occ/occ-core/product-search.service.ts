import { Injectable } from '@angular/core';
import { BaseService } from './base.service';


@Injectable()
export class ProductSearchService extends BaseService {

    private createTextSearchEndpoint(textquery: string, sort?: string): string {
        let url = this.getProductSearchEndpoint();
        url += '?query=' + textquery;

        if (sort) {
            url += ':' + sort;
        }
        url += '&pageSize=10';
        return url;
    }


    private createCategorySearchEndpoint(categoryCode: string, brandCode: string, sort?: string): string {
        let url = this.getProductSearchEndpoint();
        url += '?query=';
        if (sort) {
            url += ':' + sort;
        }
        if (categoryCode) {
            url += ':category:' + categoryCode;
        }
        if (brandCode) {
            url += ':brand:' + brandCode;
        }
        url += '&pageSize=10';
        return url;
     }


    /**
     * @description 
     * Search products by...
     * 
     * @param {string} query
     * @returns
     * 
     * @memberOf OccProductSearchService
     */
    incrementalSearch(query: string, pageSize = 3) {
        
        let url = this.createTextSearchEndpoint(query);
        url += '&fields=products(code,name,images(DEFAULT)),pagination';
        
        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                const searchResult = data.json();
                resolve(searchResult.products);
            },
            err => this.logError(err));
        });
    }

    freeTextSearch(textquery: string, sort: string) {

        let url = this.createTextSearchEndpoint(textquery, sort);
        url += '&pageSize=20&fields=products(code,name,summary,price,images(DEFAULT)),facets,pagination(DEFAULT)';

        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                const searchResult = data.json();
                resolve(searchResult);
            },
            err => this.logError(err));
        });

    }

    searchByCategory(categoryCode: string, brandCode: string, sort: string) {
        let url = this.createCategorySearchEndpoint(categoryCode, brandCode, sort);
        url += '&fields=products(code,name,summary,price,images(DEFAULT)),facets,pagination(DEFAULT)';
        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                const searchResult = data.json();
                resolve(searchResult);
            },
            err => this.logError(err));
        });
    }

    private logError(error) {
        console.log('error', error)
    }

}