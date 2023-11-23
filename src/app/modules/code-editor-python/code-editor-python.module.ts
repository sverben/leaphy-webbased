import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeEditorPythonRoutingModule } from './code-editor-python-routing.module';
import { CodeEditorPythonPage } from './code-editor-python.page';
import { SharedModule } from '../shared/shared.module';
import {AppModule} from "../../app.module";


@NgModule({
    declarations: [CodeEditorPythonPage],
    imports: [
        CommonModule,
        CodeEditorPythonRoutingModule,
        SharedModule,
        AppModule,
    ]
})
export class CodeEditorPythonModule { }
