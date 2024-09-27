import { Injectable, OnInit } from '@angular/core';
import { CsvService } from '../../csv/csv.service';
import { Papa } from 'ngx-papaparse';
import { DeliveryCountryInterface, OmnivaInterface } from '../../../types/shipping/methods/omniva/omniva';
import { LocalStorageServiceService } from '../../localStorage/local-storage-service.service';
import { resolve } from 'node:path';
@Injectable({
  providedIn: 'root'
})
export class OmnivaLatviaService implements OnInit {
  private path: string = '../../../../assets/csv/shipping/OmnivaLatviaParcelTerminalLocations.csv';
  public csvData: any[] = [];
  public selectedShippingLocation: DeliveryCountryInterface = {
    country_code: 'LV',
    country_name: 'Latvia'
  };

  constructor(
    private csvService: CsvService,
    private localStorage: LocalStorageServiceService,
    private papa: Papa
  ) {

  }

  ngOnInit(): void {
    // this.loadCsv();
  }

  async loadCsv(): Promise<OmnivaInterface[]> {
    return new Promise((resolve) => {
      this.csvService.getCsvDataFromAssests(this.path).subscribe(
        data => {
          this.csvData = this.papa.parse(
            data,
            {
              header: true,
              transformHeader: (header: string) => {
                return header.toLocaleLowerCase();
              }
            }).data;

          resolve(this.csvData);
        },
        error => {
          console.log('Error loading CSV file:', error);
        }
      )
    })
  }

  getCsvData() {
    return this.papa.parse(
      this.path,
      {
        header: true, transformHeader: (header: string) => {
          return header.toLowerCase();
        }
        , delimiter: ''
      }).data;
  }

  parseCsvToJson(csv: string) {
    this.papa.parse(csv, {
      header: true,
      transformHeader: (header: string) => {
        return header.toLowerCase();
      },
      complete: (result: any) => {
        if (result) {
          this.csvData = result.data;
          console.log(result.data);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getShippingPosts() {
    return this.csvData;
  }

  setShippingLocation(location: DeliveryCountryInterface) {
    this.localStorage.set('shippingLocation', JSON.stringify(location));
  }

  getShippingLocation() {
    const currentShippingLocation: DeliveryCountryInterface = JSON.parse(this.localStorage.get('shippingLocation') || '{}');

    if (!!Object.entries(currentShippingLocation).length) {
      return this.selectedShippingLocation = currentShippingLocation;
    }
    
    this.setShippingLocation(this.selectedShippingLocation);
    return this.selectedShippingLocation;
  }
}
