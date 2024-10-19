import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentPathService {
  private currentPath = new BehaviorSubject<string>('');

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildPath(this.route.root))
    ).subscribe(path => this.currentPath.next(path));
  }

  private buildPath(route: ActivatedRoute, path: string = ''): string {
    const child = route.firstChild;
    if (child) {
      const routePath = child.snapshot.url.map(segment => segment.path).join('/');
      path = `${path}/${routePath}`;
      return this.buildPath(child, path);
    }
    return path;
  }

  getCurrentPath() {
    return this.currentPath.asObservable();
  }
}
