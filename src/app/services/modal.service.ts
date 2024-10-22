import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, ViewContainerRef, TemplateRef, Type, createComponent } from "@angular/core";
import { Options } from "../models/modalOptions";
import { BaseModalComponent } from "../components/common/modal/base-modal/base-modal.component";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newModalComponent!: ComponentRef<BaseModalComponent>;
  options!: Options | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(
    vcrOrComponent: Type<unknown>,
    content: TemplateRef<Element>,
    options?: Options
  ): void;

  open<C>(vcrOrComponent: Type<C>, options?: Options): void;

  open<C>(
    vcrOrComponent: Type<BaseModalComponent>,
    param2?: TemplateRef<Element> | Options,
    options?: Options
  ) {
    
    this.openWithComponent(vcrOrComponent);
    this.options = param2 as Options | undefined;

    if (this.options?.onClose) {
      this.newModalComponent.instance.closeModal.subscribe(() => {
        this.options?.onClose!();
      });
    }

    if (this.options?.onConfirm) {
      this.newModalComponent.instance.confirmModal.subscribe(() => {
        this.options?.onConfirm!();
      });
    }
  }

  private openWithComponent(component: Type<BaseModalComponent>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.newModalComponent = createComponent(component, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }

  
}
