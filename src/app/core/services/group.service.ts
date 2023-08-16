import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, GroupStatus } from 'src/app/features/groups/models/group';

@Injectable({
    providedIn: 'root'
  })
  export class GroupService {

    private id: number = 0;

  constructor() { }

  mockGetGroups(count: number = 10, delay: number = 5000): Observable<Group[]> {
    let response: Group[] = [];

    for (let i = 0; i < count; i++) {
        response.push(this.generateRandomGroupItem());
      }
  
      let observable: Observable<Group[]> = new Observable((subscriber) => {
        setTimeout(() => {
          subscriber.next(response);
          subscriber.complete();
        }, delay);
      });
  
      return observable;
    }

    private generateRandomGroupItem(): Group {
        const group = new Group();
    
        group.id = this.id.toString();
        group.name = this.randomName();
        group.displayPicture = this.randomDisplayPicture();
        group.groupStatus = this.randomGroupStatus();
    
        this.id++;
        
        return group;
    }

    private randomName(): string {
        const names: string[] = [
            'Web Accessibility',
            'Haibun',
            'OCIO Coffee Chat',
            'ESDC Coffee Chat',
            'GCcollab News',
            'GCconnex News',
            'Belly Flop Olympics',
            'Sleeping Beauties'
        ];
        return names[Math.floor(Math.random() * names.length)];
    }

    private randomGroupStatus(): GroupStatus {
        const status: GroupStatus[] = [
            GroupStatus.Open, 
            GroupStatus.Closed
        ];
        return status[Math.floor(Math.random() * status.length)];
    }

    private randomDisplayPicture(): string {
        const urls: string[] = [
            'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
            'https://images.unsplash.com/photo-1593871075120-982e042088d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
            'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80',
            'https://images.unsplash.com/photo-1556997685-309989c1aa82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVubnklMjBhbmltYWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60',
            'https://images.unsplash.com/photo-1522435229388-6f7a422cd95b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1636370395847-e0781efa45e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
            'https://images.unsplash.com/photo-1587920149371-ac728dd20da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1872&q=80',
            'https://images.unsplash.com/photo-1597237154674-1a0d2274cef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            'https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1546807742-e44ac98e1e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          ];
          return urls[Math.floor(Math.random() * urls.length)];
        }
    }