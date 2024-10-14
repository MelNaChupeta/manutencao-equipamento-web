import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, ViewContainerRef, TemplateRef, Type, createComponent } from "@angular/core";
import { ModalComponent } from "../components/commom/modal/modal.component";
import { Options } from "../models/modalOptions";

@Injectable({
    providedIn: 'root',
  })
  export class ModalService {
    // Create a reference to our modal component
    newModalComponent!: ComponentRef<ModalComponent>;
    // Optional content passed at the creation : animation, size, ... 
    options!: Options | undefined;
  
    constructor(
      private appRef: ApplicationRef,
      private injector: EnvironmentInjector
    ) {}
  
    open(
      vcrOrComponent: ViewContainerRef,
      content: TemplateRef<Element>,
      options?: Options
    ): void;
  
    open<C>(vcrOrComponent: Type<C>, options?: Options): void;
  
    open<C>(
      vcrOrComponent: ViewContainerRef | Type<C>,
      param2?: TemplateRef<Element> | Options,
      options?: Options
    ) {
      if (vcrOrComponent instanceof ViewContainerRef) {
        this.openWithTemplate(vcrOrComponent, param2 as TemplateRef<Element>);
        this.options = options;
      }else {
        this.openWithComponent(vcrOrComponent);
        // Same story here : for the second approach, the second param will be of type Options or undefined, since optional 
        this.options = param2 as Options | undefined;
      }
    }

    
    private openWithComponent(component: Type<unknown>) {
        // create the desired component, the content of the modal box
        const newComponent = createComponent(component, {
          environmentInjector: this.injector,
        });
        // create the modal component and project the instance of the desired component in the ng-content
        this.newModalComponent = createComponent(ModalComponent, {
          environmentInjector: this.injector,
          projectableNodes: [[newComponent.location.nativeElement]],
        });
    
        document.body.appendChild(this.newModalComponent.location.nativeElement);
    
        // Attach views to the changeDetection cycle
        this.appRef.attachView(newComponent.hostView);
        this.appRef.attachView(this.newModalComponent.hostView);
    }


    close() {
        this.newModalComponent.instance.close();
    }
  
    private openWithTemplate(vcr: ViewContainerRef, content: TemplateRef<Element>) {
      vcr.clear();
      const innerContent = vcr.createEmbeddedView(content);
  
      this.newModalComponent = vcr.createComponent(ModalComponent, {
        environmentInjector: this.injector,
        projectableNodes: [innerContent.rootNodes],
      });
    }
}