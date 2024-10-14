import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, ViewContainerRef, TemplateRef, Type, createComponent } from "@angular/core";
import { ModalComponent } from "../components/commom/modal/modal.component";
import { Options } from "../models/modalOptions";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newModalComponent!: ComponentRef<ModalComponent>;
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
    } else {
      this.openWithComponent(vcrOrComponent);
      this.options = param2 as Options | undefined;
    }

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

  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.newModalComponent = createComponent(ModalComponent, {
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

  private openWithTemplate(vcr: ViewContainerRef, content: TemplateRef<Element>) {
    vcr.clear();
    const innerContent = vcr.createEmbeddedView(content);

    this.newModalComponent = vcr.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });

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
}
