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
            'Haibun\'',
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
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmvC2Gzy3zrH0V97WubkgHZ7WnILp-l9WrcdeNNKSPP0GZ5Kv0rcHIII5Z_UEmFjkcUPw&usqp=CAU',
            'https://i.pinimg.com/originals/fe/a0/b4/fea0b4eca9a774e2f76952d4d443ba73.jpg',
            'https://static.boredpanda.com/blog/wp-content/uploads/2021/07/CLml70UpO26-png__700.jpg',
            'https://wallpapers-clan.com/wp-content/uploads/2022/08/funny-dog-pfp-1.jpg',
            'https://i.redd.it/k4ckbuiugmfz.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGDbcW5mkzZH9Mb-azwbvYedTer6phmPlXg&usqp=CAU',
            'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Funny-Dog-PFP-profile-300x300.jpg',
            'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVubnklMjBhbmltYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            'https://i.pinimg.com/originals/31/a0/d5/31a0d596f1e215b5825333f419645dcb.jpg',
            'https://static.photocdn.pt/images/apple/71animalfaces/animalfaces25.webp'
          ];
          return urls[Math.floor(Math.random() * urls.length)];
        }
    }