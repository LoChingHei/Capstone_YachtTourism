import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-yacht',
  standalone: true,
  imports: [],
  templateUrl: './add-yacht.component.html',
  styleUrl: './add-yacht.component.css'
})
export class AddYachtComponent {
  shipid: number = 3;
  location: string = '';
  LogBook: string = '';
  owner: string = '';
  IPFS: string = '';
  yachtName: string = '';
  model: string = '';
  capacity: string = '';
  description: string = '';
  skipper: string = '';
  length: string = '';
  width: string = '';
  bedrooms: string = '';
  amenities: string = '';
  crewDetails: string = '';
  safetyFeatures: string = '';

  constructor(private http: HttpClient) { 
    this.shipid++;
  }

  addYacht(): void {
    const yachtData = {
      ShipId: this.shipid,
      Location: this.location,
      LogBook: 'logs',
      Owner: this.owner,
      IPFS: 'photo.png',
      Name: this.yachtName,
      Model: this.model,
      Capacity: this.capacity,
      Description: this.description,
      Length: this.length,
      Width: this.width,
      Amenities: this.amenities,
      CrewDetails: this.crewDetails,
      SafetyFeatures: this.safetyFeatures
    };

    this.http.post<any>('http://localhost:8080/add_yacht', yachtData)
      .subscribe(
        response => {
          console.log('Yacht added successfully:', response);
          // Handle success response
        },
        error => {
          console.error('Error adding yacht:', error);
          // Handle error response
        }
      );
  }
}
